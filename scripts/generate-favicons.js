const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bg" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#be123c"/>
      <stop offset="45%" stop-color="#881337"/>
      <stop offset="100%" stop-color="#4c0519"/>
    </radialGradient>
    <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </linearGradient>
    <linearGradient id="goldText" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#fef08a"/>
      <stop offset="70%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
  </defs>
  <!-- Main Circular Badge -->
  <circle cx="256" cy="256" r="252" fill="url(#bg)"/>
  <!-- Elegant Golden Border Rings -->
  <circle cx="256" cy="256" r="236" fill="none" stroke="url(#goldRing)" stroke-width="8" opacity="0.95"/>
  <circle cx="256" cy="256" r="226" fill="none" stroke="url(#goldRing)" stroke-width="2" opacity="0.6"/>
  <!-- Central Auspicious 'श्री' -->
  <text x="256" y="345" font-family="'Nirmala UI', 'Mangal', 'Noto Sans Devanagari', 'Yashomudra', 'Arial', sans-serif" font-size="250" font-weight="bold" fill="url(#goldText)" text-anchor="middle" filter="url(#shadow)">श्री</text>
</svg>`;

async function buildFavicons() {
  console.log('Generating favicons...');

  // Save SVG files
  const rootDir = path.resolve(__dirname, '..');
  fs.writeFileSync(path.join(rootDir, 'app', 'icon.svg'), svgContent.trim());
  fs.writeFileSync(path.join(rootDir, 'public', 'icon.svg'), svgContent.trim());
  console.log('Saved app/icon.svg and public/icon.svg');

  const svgBuffer = Buffer.from(svgContent);

  // Generate PNG sizes
  const sizes = [16, 32, 48, 64, 96, 128, 180, 192, 256, 512];
  const pngBuffers = {};

  for (const s of sizes) {
    const buf = await sharp(svgBuffer).resize(s, s).png().toBuffer();
    pngBuffers[s] = buf;
  }

  // 1. Write public/icon/favicon.png (192x192) - replaces the old 64x64 blue icon!
  fs.mkdirSync(path.join(rootDir, 'public', 'icon'), { recursive: true });
  fs.writeFileSync(path.join(rootDir, 'public', 'icon', 'favicon.png'), pngBuffers[192]);
  fs.writeFileSync(path.join(rootDir, 'public', 'icon', 'favicon-48x48.png'), pngBuffers[48]);
  fs.writeFileSync(path.join(rootDir, 'public', 'icon', 'favicon-192x192.png'), pngBuffers[192]);
  fs.writeFileSync(path.join(rootDir, 'public', 'icon', 'favicon-512x512.png'), pngBuffers[512]);
  fs.writeFileSync(path.join(rootDir, 'public', 'icon', 'apple-touch-icon.png'), pngBuffers[180]);
  fs.writeFileSync(path.join(rootDir, 'public', 'apple-touch-icon.png'), pngBuffers[180]);
  console.log('Wrote public PNG icons (48x48, 180x180, 192x192, 512x512)');

  // 2. Generate multi-size ICO file (16, 32, 48, 256)
  const icoSizes = [16, 32, 48, 256];
  const icoImages = icoSizes.map(s => ({
    width: s === 256 ? 0 : s,
    height: s === 256 ? 0 : s,
    buffer: pngBuffers[s]
  }));

  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * icoImages.length;

  const entries = [];
  for (const img of icoImages) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width, 0);
    entry.writeUInt8(img.height, 1);
    entry.writeUInt8(0, 2); // colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += img.buffer.length;
  }

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(icoImages.length, 4); // number of images

  const icoBuffer = Buffer.concat([
    header,
    ...entries,
    ...icoImages.map(img => img.buffer)
  ]);

  fs.writeFileSync(path.join(rootDir, 'app', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon.ico'), icoBuffer);
  console.log('Generated app/favicon.ico and public/favicon.ico (multi-res ICO: 16, 32, 48, 256)');

  console.log('All favicons successfully updated!');
}

buildFavicons().catch(err => {
  console.error(err);
  process.exit(1);
});
