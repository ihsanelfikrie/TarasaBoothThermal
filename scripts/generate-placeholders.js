// Script untuk generate placeholder images untuk header/footer
// Jalankan dengan: node scripts/generate-placeholders.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Ukuran untuk printer thermal 58mm (576px width)
const WIDTH = 576;
const HEADER_HEIGHT = 100;
const FOOTER_HEIGHT = 100;

// Warna retro
const BG_COLOR = '#F0E8D0';
const DARK_COLOR = '#000000';

async function createPlaceholder(text, filename, isHeader = true) {
  const height = isHeader ? HEADER_HEIGHT : FOOTER_HEIGHT;
  
  // Buat SVG text
  const svgText = `
    <svg width="${WIDTH}" height="${height}">
      <rect width="${WIDTH}" height="${height}" fill="${BG_COLOR}"/>
      <rect x="10" y="10" width="${WIDTH - 20}" height="${height - 20}" 
            fill="none" stroke="${DARK_COLOR}" stroke-width="3"/>
      <text x="50%" y="50%" 
            font-family="monospace" 
            font-size="24" 
            fill="${DARK_COLOR}" 
            text-anchor="middle" 
            dominant-baseline="middle">
        ${text}
      </text>
    </svg>
  `;

  await sharp(Buffer.from(svgText))
    .png()
    .toFile(filename);
  
  console.log(`✅ Created: ${filename}`);
}

async function generateAllPlaceholders() {
  // Buat folder jika belum ada
  const headersDir = path.join(__dirname, '../public/assets/headers');
  const footersDir = path.join(__dirname, '../public/assets/footers');
  
  if (!fs.existsSync(headersDir)) {
    fs.mkdirSync(headersDir, { recursive: true });
  }
  
  if (!fs.existsSync(footersDir)) {
    fs.mkdirSync(footersDir, { recursive: true });
  }

  console.log('🎨 Generating placeholder images...\n');

  // Generate Headers
  await createPlaceholder('POLOS', path.join(headersDir, 'polos.png'), true);
  await createPlaceholder('LOGO EVENT', path.join(headersDir, 'logo-event.png'), true);
  await createPlaceholder('KLASIK', path.join(headersDir, 'klasik.png'), true);

  // Generate Footers
  await createPlaceholder('POLOS', path.join(footersDir, 'polos.png'), false);
  await createPlaceholder('TERIMA KASIH!', path.join(footersDir, 'terima-kasih.png'), false);
  await createPlaceholder('2025', path.join(footersDir, 'tanggal.png'), false);

  console.log('\n✨ All placeholders generated successfully!');
  console.log('📁 Check: public/assets/headers/ and public/assets/footers/');
}

generateAllPlaceholders().catch(console.error);