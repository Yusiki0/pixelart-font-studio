# 👾 PixelArt Font Studio

**PixelArt Font Studio** is a beginner-friendly bitmap font editor.

Draw your own fonts **pixel by pixel**, edit existing fonts, and export them into multiple formats.

---

# ✨ Features

- 🖊️ Draw glyphs pixel by pixel
- 📂 Import existing fonts (`.ttf`, `.otf`, `.woff`)
- 🔤 Edit every character individually
- 👀 Live text preview
- ↩️ Undo / Redo
- 🪞 Mirror, Shift and Invert tools
- 🎨 Bucket, Line and Rectangle tools
- 📦 Export as:
  - Project (`.json`)
  - Font atlas (`.png`)
  - Individual glyph (`.png`)
  - TrueType font (`.ttf`)

---

# 📥 Installation

## Requirements

- Node.js (latest LTS recommended)

You can download it here:

https://nodejs.org/

---

## Clone the repository

```bash
git clone https://github.com/Yusiki0/pixelart-font-studio.git
```

Go inside the project:

```bash
cd pixelart-font-studio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser at

```
http://localhost:5173
```

---

# 🚀 Getting Started

When you launch the application you can either:

- Create a brand new bitmap font
- Import an existing font
- Open a previously saved project

Everything happens directly inside the editor.

---

# 🖱️ Editing Glyphs

Each character (called a **glyph**) is stored as a bitmap.

Select any glyph from the left panel to edit it.

The center editor is your drawing area.

White pixels are part of the character.

Dark pixels are empty.

---

# ❓ Explanation of specific settings


# 📏 Baseline

The **baseline** is the invisible line where characters sit.

For example:

```
HELLO
_____
```

Letters like **A**, **E** or **H** stand on the baseline.

Letters like **g**, **p**, **q** extend below it.

Keeping a consistent baseline makes your font look natural.

---

# ↔ Advance Width

Advance Width controls the spacing after each character.

Small value:

```
HELLO
```

Large value:

```
H E L L O
```

Each glyph can have its own width.

---

# 👀 Live Preview

The preview panel lets you test your font while editing.

You can customize:

- Preview text
- Zoom
- Text color
- Background color
- Character spacing

---

# 📂 Import Fonts

Supported formats:

- `.ttf`
- `.otf`
- `.woff`

The editor automatically rasterizes imported fonts into editable pixel glyphs.

> Best results are obtained with bitmap or pixel fonts.

---

# 💾 Export

## Project (.json)

Saves everything:

- glyphs
- advance widths
- grid size
- baseline

Use this format to continue editing later.

---

## Font Atlas (.png)

Exports every glyph into a single image.

Useful for game engines and sprite sheets.

---

## Glyph (.png)

Exports only the currently selected glyph.

---

## TrueType (.ttf)

Generates a TrueType font from your bitmap glyphs.

The exported font can be installed on your operating system and used in compatible software.

---

# 💡 Tips

- Pixel fonts usually work best at **8×8**, **16×16** or **32×32**.
- Keep a consistent baseline across all letters.
- Adjust Advance Width for better spacing.
- Frequently save your project as JSON while working.

---

# ⚠️ Notes

Imported vector fonts are converted into bitmap glyphs.

Complex fonts with curves may not produce perfect pixel results.

For the cleanest output, start from a pixel font or create your own from scratch.

---

# ❤️ Contributing

Contributions, bug reports and feature requests are always welcome!

