import opentype from 'opentype.js';

export class FontImporter {
  constructor(editorGrid) {
    this.editorGrid = editorGrid;
    
    // Création d'un canvas invisible dédié à l'extraction sans anti-aliasing
    this.offscreenCanvas = document.createElement('canvas');
    this.ctx = this.offscreenCanvas.getContext('2d', { willReadFrequently: true });
  }

  async loadFont(file, targetPixelSize) {
    const buffer = await file.arrayBuffer();
    const font = opentype.parse(buffer);

    // 1. Calcul du ratio exact (UPM vs Pixels)
    const scale = targetPixelSize / font.unitsPerEm;

    return { font, scale };
  }

  importGlyph(font, char, scale) {
    const glyph = font.charToGlyph(char);

    // 2. Calculer la taille exacte de la Bounding Box du glyphe
    const pixelWidth = Math.ceil((glyph.xMax - glyph.xMin) * scale);
    const pixelHeight = Math.ceil((glyph.yMax - glyph.yMin) * scale);

    // Ajuster le canvas temporaire à cette taille exacte
    this.offscreenCanvas.width = pixelWidth || 1;
    this.offscreenCanvas.height = pixelHeight || targetPixelSize;

    // 3. DESACTIVER LE LISSAGE (Anti-aliasing)
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.clearRect(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);

    // Dessiner le chemin vectoriel avec Opentype.js
    const path = glyph.getPath(0, pixelHeight, targetPixelSize); 
    path.fill = 'black';
    path.draw(this.ctx);

    // 4. Extraire les pixels bruts
    const imageData = this.ctx.getImageData(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);
    
    // Envoyer les données binaires à votre grille d'éditeur
    this.editorGrid.loadPixels(imageData);
  }
}