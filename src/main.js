import opentype from 'opentype.js';
import './style.css';

// ======================= MISE À JOUR UI (FIX) =======================
// Le code original dépend de certains IDs/DOM qui n'existent pas forcément.
// On applique un plan minimum pour restaurer les comportements attendus.

// Compat: ensure getElementById ne retourne pas null pour le module.


// ======================= ICONS =======================
const ICONS = {
  pencil: '<path d="M4 20l1-4L15 6l3 3L8 19l-4 1z"/><path d="M13 7l3 3"/>',
  eraser: '<path d="M7 21l-4.3-4.3a2 2 0 0 1 0-2.8l9.6-9.6a2 2 0 0 1 2.8 0l5.6 5.6a2 2 0 0 1 0 2.8L13 21"/><path d="M22 21H7"/><path d="M5 11l9 9"/>',
  'paint-bucket': '<path d="M2 13l8.6-8.6a2 2 0 0 1 2.8 0l6.2 6.2a2 2 0 0 1 0 2.8L11 22a2 2 0 0 1-2.8 0L2 15.8a2 2 0 0 1 0-2.8z"/><path d="M2 13h17.6"/><circle cx="20" cy="20" r="1.6" fill="currentColor" stroke="none"/>',
  slash: '<line x1="19" y1="5" x2="5" y2="19"/>',
  square: '<rect x="4" y="4" width="16" height="16" rx="1.5"/>',
  'flip-horizontal': '<path d="M12 3v18"/><path d="M16 7l4 5-4 5"/><path d="M8 7l-4 5 4 5"/>',
  'flip-vertical': '<path d="M3 12h18"/><path d="M7 16l5 4 5-4"/><path d="M7 8l5-4 5 4"/>',
  'arrow-left': '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="11 6 5 12 11 18"/>',
  'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/>',
  'arrow-up': '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="6 11 12 5 18 11"/>',
  'arrow-down': '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="6 13 12 19 18 13"/>',
  contrast: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/>',
  'trash-2': '<polyline points="4 7 20 7"/><path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/><path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',
  'undo-2': '<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-1"/>',
  'redo-2': '<path d="M15 14l5-5-5-5"/><path d="M20 9H9a5 5 0 0 0 0 10h1"/>',
  'file-plus': '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="14 3 14 9 20 9"/><line x1="12" y1="12" x2="12" y2="18"/><line x1="9" y1="15" x2="15" y2="15"/>',
  'folder-open': '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v1H5z"/><path d="M3 8l1.4 9.7A2 2 0 0 0 6.4 19.5h11.2a2 2 0 0 0 2-1.8L21 10H4.6"/>',
  'file-json': '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="14 3 14 9 20 9"/>',
  save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
  'image-down': '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5-3.5 3.5"/><path d="M12 21v-6"/><polyline points="9.5 17 12 19.5 14.5 17"/>',
  download: '<path d="M12 3v12"/><polyline points="7 10 12 15 17 10"/><path d="M5 21h14"/>',
  'file-type': '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="14 3 14 9 20 9"/><path d="M9.5 13h5"/><path d="M12 13v5"/>',
  'file-type-2': '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="14 3 14 9 20 9"/><circle cx="12" cy="15.5" r="2.3"/>',
  search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  'pen-tool': '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.5 7.5"/><circle cx="11" cy="11" r="2"/>',
  'zoom-in': '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>',
  'grid-3x3': '<rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>'
};

function renderIcons(){
  document.querySelectorAll('[data-lucide]').forEach(el=>{
    const name = el.getAttribute('data-lucide');
    const inner = ICONS[name];
    if(!inner) return;
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 24 24');
    svg.setAttribute('fill','none');
    svg.setAttribute('stroke','currentColor');
    svg.setAttribute('stroke-width','1.8');
    svg.setAttribute('stroke-linecap','round');
    svg.setAttribute('stroke-linejoin','round');
    svg.classList.add('lucide');
    svg.innerHTML = inner;
    el.replaceWith(svg);
  });
}

// ======================= STATE =======================
const state = {
  loadedFont: null,
  fontName: "Nouvelle police",
  gridW: 16,
  gridH: 16,
  baselineRow: 13,
  glyphs: {},
  order: [],
  currentKey: null,
  tool: 'pencil',
  zoom: 20,

  dragging: false,
  dragStart: null,
  dragPreviewBitmap: null,
  undoStack: {},
  redoStack: {}
};

// ======================= DOM =======================
const $ = id => document.getElementById(id);
const glyphGrid = $('glyphGrid');
const glyphCountEl = $('glyphCount');
const pixelCanvas = $('pixelCanvas');
const pctx = pixelCanvas.getContext('2d');
const previewCanvas = $('previewCanvas');
const prevCtx = previewCanvas.getContext('2d');
const glyphMeta = $('glyphMeta');
const fontInfo = $('fontInfo');
const toastEl = $('toast');

function toast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(()=> toastEl.classList.remove('show'), 2200);
}

function blankBitmap(){ return new Uint8Array(state.gridW * state.gridH); }
function charFromCodepoint(cp){ try{ return String.fromCodePoint(cp); }catch(e){ return '?'; } }

function ensureGlyph(cp, charStr){
  const key = String(cp);
  if(!state.glyphs[key]){
    state.glyphs[key] = { bitmap: blankBitmap(), advance: state.gridW, char: charStr || charFromCodepoint(cp), edited:false, sourceRasterized:false };
    state.order.push(key);
    state.undoStack[key] = [];
    state.redoStack[key] = [];
  }
  return state.glyphs[key];
}



// ======================= FONT IMPORT ENGINE =======================

// 1. DÉTECTION MAGIQUE : Trouve la taille de pixel exacte (ex: 13)
function detectNativeFontSize(font) {
  let minWidth = Infinity;
  // On analyse les lettres avec des traits droits pour trouver l'épaisseur de 1 pixel vectoriel
  const chars = ['.', 'i', 'l', '1', ':', '|', 'A', 'T', 'H'];
  
  chars.forEach(char => {
    const glyph = font.charToGlyph(char);
    if (glyph && glyph.path && glyph.path.commands) {
      let xs = [], ys = [];
      glyph.path.commands.forEach(c => {
        if (c.x !== undefined) xs.push(c.x);
        if (c.y !== undefined) ys.push(c.y);
      });
      // Différences en X
      if (xs.length > 1) {
        xs = [...new Set(xs)].sort((a,b)=>a-b);
        for (let i = 1; i < xs.length; i++) {
          let diff = Math.abs(xs[i] - xs[i-1]);
          if (diff > 1 && diff < minWidth) minWidth = diff; // >1 evite le bruit flottant
        }
      }
      // Différences en Y
      if (ys.length > 1) {
        ys = [...new Set(ys)].sort((a,b)=>a-b);
        for (let i = 1; i < ys.length; i++) {
          let diff = Math.abs(ys[i] - ys[i-1]);
          if (diff > 1 && diff < minWidth) minWidth = diff;
        }
      }
    }
  });

  if (minWidth === Infinity) return 16; // Sécurité si c'est pas une police pixel
  
  // Ex: si UPM=1000 et epaisseur pixel vectoriel = 77 -> taille native = 1000/77 = 12.98 => 13
  const nativeSize = Math.round(font.unitsPerEm / minWidth);
  return nativeSize > 128 ? 16 : nativeSize; // Cap de sécurité
}

// 2. RENDU PIXEL-PERFECT À LA TAILLE NATIVE
function rasterizeGlyph(font, glyph, W, H, nativeFontSize) {
  const off = document.createElement('canvas');
  const canvasSize = nativeFontSize * 4; // Un carré large pour être sûr que tout rentre
  off.width = canvasSize;
  off.height = canvasSize;
  const octx = off.getContext('2d', { willReadFrequently: true });
  octx.imageSmoothingEnabled = false;

  const scale = nativeFontSize / font.unitsPerEm;
  const pixelAscender = Math.round((font.ascender || font.unitsPerEm * 0.8) * scale);

  // On dessine de manière très safe au milieu du canvas offscreen
  const drawX = nativeFontSize;
  const drawY = nativeFontSize + pixelAscender;

  octx.fillStyle = '#fff';
  octx.fillRect(0, 0, canvasSize, canvasSize);
  
  try {
    const path = glyph.getPath(drawX, drawY, nativeFontSize);
    path.fill = '#000';
    path.draw(octx);
  } catch(e) {}

  const imgData = octx.getImageData(0, 0, canvasSize, canvasSize).data;
  const bitmap = new Uint8Array(W * H);

  // Aligner avec la grille de l'utilisateur
  const gridStartX = 1; // 1px de padding à gauche
  const gridBaseline = state.baselineRow;

  for (let gy = 0; gy < H; gy++) {
    for (let gx = 0; gx < W; gx++) {
      const cy = drawY + (gy - gridBaseline);
      const cx = drawX + (gx - gridStartX);

      if (cx >= 0 && cx < canvasSize && cy >= 0 && cy < canvasSize) {
        const idx = ((cy * canvasSize) + cx) * 4;
        if (imgData[idx] < 128) { // Strict: pixel noir
          bitmap[gy * W + gx] = 1;
        }
      }
    }
  }

  const advancePx = Math.round((glyph.advanceWidth || font.unitsPerEm) * scale);
  const advance = Math.min(W, Math.max(1, gridStartX + advancePx));

  return { bitmap, advance };
}

function loadFontIntoProject(font, familyName){
  // ON DETECTE LA TAILLE NATIVE !
  const nativeSize = detectNativeFontSize(font);
  console.log(`Taille native détectée : ${nativeSize}px`);

  // ON ADAPTE VOTRE GRILLE
  state.gridH = Math.max(16, nativeSize + 4); 
  state.gridW = state.gridH; // Grille carrée souvent suffisante
  
  // Calcul de la ligne de base proportionnelle
  const scale = nativeSize / (font.unitsPerEm || 1000);
  const pixelAscender = Math.round((font.ascender || 800) * scale);
  state.baselineRow = pixelAscender + 2;

  // Mise à jour de l'UI
  $('gridW').value = state.gridW;
  $('gridH').value = state.gridH;

  state.loadedFont = font;
  state.fontName = familyName || (font.names && font.names.fontFamily && font.names.fontFamily.en) || "Police importée";
  state.glyphs = {};
  state.order = [];
  state.undoStack = {};
  state.redoStack = {};

  let map = null;
  try{ map = font.tables.cmap.glyphIndexMap; }catch(e){ map = null; }

  if(map){
    const codepoints = Object.keys(map).map(k=>parseInt(k,10)).sort((a,b)=>a-b);
    codepoints.forEach(cp=>{
      if(cp < 32) return; 
      const gi = map[cp];
      const glyph = font.glyphs.get(gi);
      
      // On rasterise avec la taille NATIVE
      const {bitmap, advance} = rasterizeGlyph(font, glyph, state.gridW, state.gridH, nativeSize);
      
      const key = String(cp);
      state.glyphs[key] = { bitmap, advance, char: charFromCodepoint(cp), edited:false, sourceRasterized:true };
      state.order.push(key);
      state.undoStack[key] = [];
      state.redoStack[key] = [];
    });
  }

  renderGlyphList();
  renderFontInfo();
  if(state.order.length){
    selectGlyph(state.order[0]);
  }
  toast(`Importé ! Adapté à la taille native : ${nativeSize}px`);
}

function newBlankProject(){
  state.loadedFont = null;
  state.fontName = "Nouvelle police";
  state.glyphs = {};
  state.order = [];
  state.undoStack = {};
  state.redoStack = {};
  state.baselineRow = Math.round(state.gridH*0.82);
  const defaults = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(const ch of defaults){
    ensureGlyph(ch.codePointAt(0), ch);
  }
  renderGlyphList();
  renderFontInfo();
  selectGlyph(state.order[0]);
  toast("Nouveau projet vierge créé.");
}

// ======================= UI: GLYPH LIST =======================
function miniPreview(canvas, bitmap, W, H){
  canvas.width = W; canvas.height = H;
  const c = canvas.getContext('2d');
  c.clearRect(0,0,W,H);
  c.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#FFFFFF';
  for(let y=0;y<H;y++){
    for(let x=0;x<W;x++){
      if(bitmap[y*W+x]) c.fillRect(x,y,1,1);
    }
  }
}

function renderGlyphList(){
  glyphGrid.innerHTML = '';
  glyphCountEl.textContent = state.order.length;
  if(state.order.length===0) return;
  const filter = ($('glyphSearch').value||'').trim().toLowerCase();
  state.order.forEach(key=>{
    const g = state.glyphs[key];
    if(filter){
      const cpHex = 'u+' + parseInt(key,10).toString(16);
      if(!g.char.toLowerCase().includes(filter) && !cpHex.includes(filter)) return;
    }
    const tile = document.createElement('div');
    tile.className = 'glyph-tile' + (key===state.currentKey?' selected':'') + (g.edited?' edited':'');
    const cv = document.createElement('canvas');
    miniPreview(cv, g.bitmap, state.gridW, state.gridH);
    tile.appendChild(cv);
    const lbl = document.createElement('div');
    lbl.className = 'lbl';
    lbl.textContent = g.char===' ' ? '␣' : g.char;
    tile.appendChild(lbl);
    tile.addEventListener('click', ()=> selectGlyph(key));
    glyphGrid.appendChild(tile);
  });
}

function renderFontInfo(){
  const n = state.order.length;
  fontInfo.innerHTML = "<b>" + escapeHtml(state.fontName) + "</b><br>" +
    n + " glyphes<br>Grille : " + state.gridW + " × " + state.gridH + " px<br>Ligne de base : " + state.baselineRow;
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ======================= EDITOR CANVAS =======================
function currentGlyph(){ return state.currentKey ? state.glyphs[state.currentKey] : null; }

function selectGlyph(key){
  state.currentKey = key;
  renderGlyphList();
  renderEditor();
  renderGlyphMeta();
}

function renderEditor(){
  const g = currentGlyph();
  const W = state.gridW, H = state.gridH, z = state.zoom;
  pixelCanvas.width = W*z;
  pixelCanvas.height = H*z;
  pctx.imageSmoothingEnabled = false;
  pctx.fillStyle = '#050505';
  pctx.fillRect(0,0,pixelCanvas.width, pixelCanvas.height);

  const bitmap = state.dragPreviewBitmap || (g ? g.bitmap : blankBitmap());

  pctx.fillStyle = '#FFFFFF';
  for(let y=0;y<H;y++){
    for(let x=0;x<W;x++){
      if(bitmap[y*W+x]) pctx.fillRect(x*z, y*z, z, z);
    }
  }

  pctx.strokeStyle = 'rgba(255,255,255,0.32)';
  pctx.beginPath(); pctx.moveTo(0, state.baselineRow*z+0.5); pctx.lineTo(W*z, state.baselineRow*z+0.5); pctx.stroke();

  if(g){
    pctx.setLineDash([4,3]);
    pctx.strokeStyle = 'rgba(255,255,255,0.55)';
    pctx.beginPath(); pctx.moveTo(g.advance*z+0.5, 0); pctx.lineTo(g.advance*z+0.5, H*z); pctx.stroke();
    pctx.setLineDash([]);
  }

  pctx.strokeStyle = 'rgba(255,255,255,0.07)';
  for(let x=0;x<=W;x++){ pctx.beginPath(); pctx.moveTo(x*z+0.5,0); pctx.lineTo(x*z+0.5,H*z); pctx.stroke(); }
  for(let y=0;y<=H;y++){ pctx.beginPath(); pctx.moveTo(0,y*z+0.5); pctx.lineTo(W*z,y*z+0.5); pctx.stroke(); }
}

function renderGlyphMeta(){
  const g = currentGlyph();
  if(!g){ glyphMeta.innerHTML = "<span>Aucun glyphe sélectionné</span>"; return; }
  const cp = parseInt(state.currentKey,10);
  glyphMeta.innerHTML = `<b>${escapeHtml(g.char===' '?'␣':g.char)}</b><span>U+${cp.toString(16).toUpperCase().padStart(4,'0')}</span><span class='advance-row'>Largeur d'avance : <span id='advVal'>${g.advance}</span>px&nbsp;<input type='range' id='advRange' min='1' max='${state.gridW}' value='${g.advance}'></span>`;
  $('advRange').addEventListener('input', e=>{
    g.advance = parseInt(e.target.value,10);
    $('advVal').textContent = g.advance;
    renderEditor(); // renderPreview(); -> commenter si non implémenté
  });
}

// ======================= TOOLS & EVENTS =======================
function pushUndo(){
  const key = state.currentKey; if(!key) return;
  state.undoStack[key].push(currentGlyph().bitmap.slice());
  if(state.undoStack[key].length>50) state.undoStack[key].shift();
  state.redoStack[key] = [];
}

function doUndo(){
  const key = state.currentKey;
  if(!key) return;
  const u = state.undoStack[key];
  const r = state.redoStack[key];
  if(!u || u.length===0) return;
  const g = currentGlyph();
  if(!g) return;

  const prev = u.pop();
  r.push(g.bitmap.slice());
  g.bitmap.set(prev);
  commitEdited();
}

function doRedo(){
  const key = state.currentKey;
  if(!key) return;
  const u = state.undoStack[key];
  const r = state.redoStack[key];
  if(!r || r.length===0) return;
  const g = currentGlyph();
  if(!g) return;

  const next = r.pop();
  u.push(g.bitmap.slice());
  g.bitmap.set(next);
  commitEdited();
}

function bindUndoRedo(){
  document.addEventListener('keydown', e=>{
    const isMac = navigator.platform && navigator.platform.toLowerCase().includes('mac');
    const mod = isMac ? e.metaKey : e.ctrlKey;
    if(!mod) return;

    if(e.key === 'z' || e.key === 'Z'){
      e.preventDefault();
      // Ctrl+Shift+Z => redo
      if(e.shiftKey) doRedo(); else doUndo();
    }
    if(e.key === 'y' || e.key === 'Y'){
      e.preventDefault();
      doRedo();
    }
  });

  const undoBtn = $('btnUndo');
  const redoBtn = $('btnRedo');
  if(undoBtn) undoBtn.addEventListener('click', doUndo);
  if(redoBtn) redoBtn.addEventListener('click', doRedo);
}

function setPixel(bitmap, x,y,W,H,val){ if(x>=0&&y>=0&&x<W&&y<H) bitmap[y*W+x] = val; }
function cellFromEvent(evt){
  const rect = pixelCanvas.getBoundingClientRect();
  const scaleX = pixelCanvas.width/rect.width, scaleY = pixelCanvas.height/rect.height;
  return { x: Math.floor(((evt.clientX-rect.left)*scaleX)/state.zoom), y: Math.floor(((evt.clientY-rect.top)*scaleY)/state.zoom) };
}

function commitEdited(){
  const g = currentGlyph();
  if(!g) return;
  g.edited = true;
  renderEditor();
  renderGlyphList();
}

function floodFill(bitmap, x, y, W, H, targetVal, replacementVal){
  if(targetVal === replacementVal) return;
  const qx = new Int32Array(W*H);
  const qy = new Int32Array(W*H);
  let qh = 0, qt = 0;
  qx[qt] = x; qy[qt] = y; qt++;
  while(qh < qt){
    const cx = qx[qh];
    const cy = qy[qh];
    qh++;
    const idx = cy*W + cx;
    if(bitmap[idx] !== targetVal) continue;
    bitmap[idx] = replacementVal;

    if(cx>0) { const nidx=(cy*W+(cx-1)); if(bitmap[nidx]===targetVal){ qx[qt]=cx-1; qy[qt]=cy; qt++; } }
    if(cx<W-1){ const nidx=(cy*W+(cx+1)); if(bitmap[nidx]===targetVal){ qx[qt]=cx+1; qy[qt]=cy; qt++; } }
    if(cy>0) { const nidx=((cy-1)*W+cx); if(bitmap[nidx]===targetVal){ qx[qt]=cx; qy[qt]=cy-1; qt++; } }
    if(cy<H-1){ const nidx=((cy+1)*W+cx); if(bitmap[nidx]===targetVal){ qx[qt]=cx; qy[qt]=cy+1; qt++; } }
  }
}

function drawLine(bitmap, x0, y0, x1, y1, W, H, val){
  let dx = Math.abs(x1 - x0);
  let sx = x0 < x1 ? 1 : -1;
  let dy = -Math.abs(y1 - y0);
  let sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  while(true){
    setPixel(bitmap, x0, y0, W, H, val);
    if(x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if(e2 >= dy){ err += dy; x0 += sx; }
    if(e2 <= dx){ err += dx; y0 += sy; }
  }
}

function drawRect(bitmap, x0, y0, x1, y1, W, H, val){
  const left = Math.min(x0,x1);
  const right = Math.max(x0,x1);
  const top = Math.min(y0,y1);
  const bottom = Math.max(y0,y1);
  // contour uniquement
  for(let x=left;x<=right;x++){ setPixel(bitmap,x,top,W,H,val); setPixel(bitmap,x,bottom,W,H,val); }
  for(let y=top;y<=bottom;y++){ setPixel(bitmap,left,y,W,H,val); setPixel(bitmap,right,y,W,H,val); }
}

pixelCanvas.addEventListener('pointerdown', e=>{
  const g = currentGlyph(); if(!g) return;
  const { x, y } = cellFromEvent(e);
  pixelCanvas.setPointerCapture(e.pointerId);

  const isRightClick = e.button===2;
  const eraseMode = isRightClick || state.tool==='eraser';
  const drawVal = eraseMode ? 0 : 1;

  // Pencil/Eraser: modifie directement
  if(state.tool==='pencil' || state.tool==='eraser'){
    pushUndo();
    setPixel(g.bitmap, x, y, state.gridW, state.gridH, drawVal);
    state.dragging = true;
    state.dragMode = drawVal;
    commitEdited();
    state.dragStart = {x,y};
    return;
  }

  // Bucket: rempli instantanément
  if(state.tool==='bucket'){
    pushUndo();
    const targetVal = g.bitmap[y*state.gridW + x];
    floodFill(g.bitmap, x, y, state.gridW, state.gridH, targetVal, drawVal);
    commitEdited();
    return;
  }

  // Line/Rect: prévisualisation pendant le drag
  if(state.tool==='line' || state.tool==='rect'){
    pushUndo();
    state.dragging = true;
    state.dragStart = {x,y};
    state.dragMode = drawVal;
    // crée un snapshot bitmap pour overlay
    state.dragPreviewBitmap = new Uint8Array(g.bitmap);
    renderEditor();
    return;
  }
});

pixelCanvas.addEventListener('pointermove', e=>{
  if(!state.dragging) return;
  const g = currentGlyph(); if(!g) return;
  const { x, y } = cellFromEvent(e);

  if(state.tool==='pencil' || state.tool==='eraser'){
    setPixel(g.bitmap, x, y, state.gridW, state.gridH, state.dragMode);
    renderEditor();
    return;
  }

  if(state.tool==='line' || state.tool==='rect'){
    if(!state.dragStart) return;
    // preview: on part du snapshot et on applique la forme
    const preview = state.dragPreviewBitmap ? new Uint8Array(state.dragPreviewBitmap) : new Uint8Array(g.bitmap);
    if(state.tool==='line') drawLine(preview, state.dragStart.x, state.dragStart.y, x, y, state.gridW, state.gridH, state.dragMode);
    if(state.tool==='rect') drawRect(preview, state.dragStart.x, state.dragStart.y, x, y, state.gridW, state.gridH, state.dragMode);
    state.dragPreviewBitmap = preview;
    renderEditor();
  }
});

window.addEventListener('pointerup', ()=>{
  if(!state.dragging) return;

  const g = currentGlyph();
  state.dragging = false;

  // Commit final pour line/rect
  if((state.tool==='line' || state.tool==='rect') && state.dragPreviewBitmap){
    g.bitmap.set(state.dragPreviewBitmap);
    state.dragPreviewBitmap = null;
  }

  commitEdited();
  renderEditor();
  state.dragStart = null;
});


document.querySelectorAll('.tool-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tool-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    state.tool = btn.dataset.tool;
  });
});

// ======================= ZOOM =======================
const zoomRangeEl = $('zoomRange');
if(zoomRangeEl){
  zoomRangeEl.value = state.zoom;
  zoomRangeEl.addEventListener('input', e=>{
    state.zoom = parseInt(e.target.value,10) || state.zoom;
    renderEditor();
  });
}


$('fontFile').addEventListener('change', e=>{
  const file = e.target.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = ev=>{
    try{
      const font = opentype.parse(ev.target.result);
      loadFontIntoProject(font, file.name.replace(/\.[^.]+$/,''));
    }catch(err){ toast("Impossible de lire ce fichier de police."); }
  };
  reader.readAsArrayBuffer(file); e.target.value = '';
});

function initUI() {
    renderIcons();
    newBlankProject();
    bindUndoRedo();
    
    const menus = Array.from(document.querySelectorAll('.menu'));

    function closeAllMenus(){ menus.forEach(m=> m.classList.remove('open')); }
    menus.forEach(menu=>{
      const trigger = menu.querySelector('.menu-trigger');
      trigger.addEventListener('click', e=>{
        e.stopPropagation();
        const wasOpen = menu.classList.contains('open');
        closeAllMenus();
        if(!wasOpen) menu.classList.add('open');
      });
      menu.querySelectorAll('.menu-item').forEach(item=> item.addEventListener('click', closeAllMenus));
    });
    document.addEventListener('click', closeAllMenus);
}

document.addEventListener('DOMContentLoaded', initUI);

// NOTE: Le projet est un bundler Vite/ESM. Les fix UI ci-dessus supposent que tous les IDs existent.

