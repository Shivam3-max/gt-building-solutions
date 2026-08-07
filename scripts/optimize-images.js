// One-off/reusable image optimizer: resizes oversized JPG/PNG assets and
// writes a .webp sibling next to each, so <picture> can serve WebP with the
// original as fallback. Safe to re-run — skips files already small enough
// and re-derives .webp siblings from the (possibly already-shrunk) original.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..', 'public', 'Public');
const SIZE_THRESHOLD = 150 * 1024; // 150KB
const LOGO_MAX_WIDTH = 500;
const HERO_MAX_WIDTH = 1600;
const DEFAULT_MAX_WIDTH = 1200;

function maxWidthFor(filePath, originalBytes) {
  if (filePath.split(path.sep).includes('brand logo')) return LOGO_MAX_WIDTH;
  if (originalBytes > 1024 * 1024) return HERO_MAX_WIDTH;
  return DEFAULT_MAX_WIDTH;
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

async function run() {
  const files = walk(ROOT);
  let totalBefore = 0;
  let totalAfter = 0;
  let touched = 0;

  for (const file of files) {
    const beforeBytes = fs.statSync(file).size;
    totalBefore += beforeBytes;

    if (beforeBytes <= SIZE_THRESHOLD) {
      // still ensure a webp sibling exists for consistency
      const webpPath = file.replace(/\.(jpe?g|png)$/i, '.webp');
      if (!fs.existsSync(webpPath)) {
        await sharp(file).rotate().webp({ quality: 80 }).toFile(webpPath);
      }
      totalAfter += beforeBytes;
      continue;
    }

    const maxW = maxWidthFor(file, beforeBytes);
    const ext = path.extname(file).toLowerCase();
    // Read into a buffer up front so sharp never holds an open handle on
    // `file` itself — avoids Windows EPERM when we overwrite it below.
    const inputBuffer = fs.readFileSync(file);
    const resized = sharp(inputBuffer).rotate().resize({ width: maxW, withoutEnlargement: true });

    let outputBuffer;
    if (ext === '.png') {
      outputBuffer = await resized.clone().png({ quality: 82, compressionLevel: 9 }).toBuffer();
    } else {
      outputBuffer = await resized.clone().jpeg({ quality: 78, mozjpeg: true }).toBuffer();
    }

    if (outputBuffer.length < beforeBytes) {
      fs.writeFileSync(file, outputBuffer);
    } // else keep original bytes on disk (resize/recompress didn't help)

    const webpBuffer = await sharp(inputBuffer).rotate().resize({ width: maxW, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
    const webpPath = file.replace(/\.(jpe?g|png)$/i, '.webp');
    fs.writeFileSync(webpPath, webpBuffer);

    totalAfter += fs.statSync(file).size;
    touched++;
    console.log(`${path.relative(ROOT, file)}: ${(beforeBytes / 1024).toFixed(0)}KB -> ${(fs.statSync(file).size / 1024).toFixed(0)}KB (+webp)`);
  }

  console.log(`\nFiles processed: ${files.length}, resized/recompressed: ${touched}`);
  console.log(`Total before: ${(totalBefore / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Total after (originals only): ${(totalAfter / 1024 / 1024).toFixed(2)}MB`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
