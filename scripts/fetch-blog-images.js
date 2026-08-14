// One-off script: assigns a distinct, topically relevant Pexels stock photo
// to every row in content/blog-posts.xlsx (replacing the current heavy
// image reuse), downloads it into public/Public/blog/<slug>.jpg, and
// rewrites the featured_image cell. Run once, not part of the build.
//
// Usage: PEXELS_API_KEY=xxx node scripts/fetch-blog-images.js
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const API_KEY = process.env.PEXELS_API_KEY;
if (!API_KEY) {
  console.error('Set PEXELS_API_KEY env var.');
  process.exit(1);
}

const XLSX_PATH = path.join(__dirname, '..', 'content', 'blog-posts.xlsx');
const OUT_DIR = path.join(__dirname, '..', 'public', 'Public', 'blog');

// category -> brand-slug -> subject phrase (falls back to category default)
const SUBJECT = {
  'Adhesives & Surface Solutions': {
    __default: 'adhesive glue tube',
    fevicol: 'wood glue carpentry clamp',
    roff: 'tile adhesive trowel',
    gresbond: 'tile adhesive trowel tiles',
    'dr-fixit': 'waterproofing basement wall',
    pidilite: 'adhesive glue bottle',
    '3m': 'duct tape roll tools',
  },
  'Kitchen, Furniture & Door Hardware': {
    __default: 'cabinet hinge hardware',
    hettich: 'drawer slide rail cabinet',
    eboo: 'cabinet hinge closeup',
    blaupunkt: 'kitchen cabinet hardware',
    tunes: 'cabinet door handle closeup',
    godrej: 'door lock security',
    'sleek-kitchens': 'modern modular kitchen interior',
  },
  'Paints & Coatings': {
    __default: 'paint cans wall color',
    ica: 'wood varnish brush furniture',
    'birla-white': 'wall putty plaster trowel',
    'asian-paints': 'paint roller wall painting',
    'birla-opus': 'paint roller wall painting',
    'nippon-paint': 'paint color swatches',
  },
  'Panels & Gypsum Boards': {
    __default: 'gypsum board false ceiling',
    'jb-plastering': 'plasterer trowel wall plaster',
    chetak: 'false ceiling interior construction',
    gyproc: 'drywall installation interior',
  },
  'Pipes & Plumbing': {
    __default: 'pvc pipes plumbing stack',
    'tata-agrico': 'irrigation pipes farm field',
    'prince-piping': 'pvc pipes stack warehouse',
    'birla-hil': 'plumbing pipes fittings',
  },
  'Power Tools & Equipment': {
    __default: 'power tools workshop',
    cumi: 'angle grinder cutting disc sparks',
    dewalt: 'power drill tool closeup',
    havells: 'cordless drill workshop',
  },
  'Tiles & Sanitary': {
    __default: 'ceramic tiles bathroom',
    kajaria: 'tile flooring pattern closeup',
    hindware: 'bathroom sink faucet modern',
    kerovit: 'bathroom faucet fixture modern',
  },
};

function intentModifier(slug) {
  if (/-vs-|-vs\b/.test(slug)) return 'comparison';
  if (/dealer|showroom/.test(slug)) return 'store display retail';
  if (/price-|buying-guide|colour-guide|price-guide/.test(slug)) return 'closeup product';
  if (/trends-for-2026|trending/.test(slug)) return 'modern interior design';
  if (/^top-/.test(slug)) return 'collection flatlay';
  if (/how-to-choose|why-/.test(slug)) return 'hands work application';
  return '';
}

function buildQuery(category, brand, slug) {
  const table = SUBJECT[category] || {};
  const subject = table[brand] || table.__default || category;
  const modifier = intentModifier(slug);
  return `${subject} ${modifier}`.trim();
}

async function searchPexels(query, page) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=80&page=${page}&orientation=landscape`;
  const res = await fetch(url, { headers: { Authorization: API_KEY } });
  if (!res.ok) {
    throw new Error(`Pexels search failed (${res.status}) for "${query}": ${await res.text()}`);
  }
  return res.json();
}

const queryPools = new Map(); // query -> { photos: [...], nextPage, exhausted }

async function nextPhotoFor(query, usedIds) {
  let pool = queryPools.get(query);
  if (!pool) {
    pool = { photos: [], nextPage: 1, exhausted: false };
    queryPools.set(query, pool);
  }

  for (;;) {
    const candidate = pool.photos.find((p) => !usedIds.has(p.id));
    if (candidate) return candidate;
    if (pool.exhausted) return null;

    const data = await searchPexels(query, pool.nextPage);
    pool.photos.push(...data.photos);
    pool.nextPage += 1;
    if (!data.next_page || data.photos.length === 0) pool.exhausted = true;
  }
}

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buf);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(XLSX_PATH);
  const sheet = workbook.worksheets.find((ws) => ws.name.toLowerCase() === 'posts') || workbook.worksheets[0];

  const headerRow = sheet.getRow(1);
  const headers = [];
  headerRow.eachCell({ includeEmpty: false }, (cell, col) => { headers[col] = String(cell.value).trim(); });
  const colOf = (name) => headers.indexOf(name);
  const slugCol = colOf('slug');
  const categoryCol = colOf('category');
  const brandCol = colOf('related_brand_slug');
  const imageCol = colOf('featured_image');

  const usedIds = new Set();
  const results = [];

  const rowNumbers = [];
  sheet.eachRow((row, rowNumber) => { if (rowNumber > 1) rowNumbers.push(rowNumber); });

  for (const rowNumber of rowNumbers) {
    const row = sheet.getRow(rowNumber);
    const slug = String(row.getCell(slugCol).value || '').trim();
    if (!slug) continue;
    const category = String(row.getCell(categoryCol).value || '').trim();
    const brand = String(row.getCell(brandCol).value || '').trim();

    const query = buildQuery(category, brand, slug);
    const photo = await nextPhotoFor(query, usedIds);
    if (!photo) {
      console.warn(`[fetch-blog-images] No photo found for row ${rowNumber} (${slug}), query "${query}"`);
      continue;
    }
    usedIds.add(photo.id);

    const filename = `${slug}.jpg`;
    const destPath = path.join(OUT_DIR, filename);
    const imageUrl = `${photo.src.original}?auto=compress&cs=tinysrgb&w=1600`;
    await downloadImage(imageUrl, destPath);

    row.getCell(imageCol).value = filename;
    results.push({ rowNumber, slug, query, photoId: photo.id, photographer: photo.photographer });
    console.log(`row ${rowNumber} [${slug}] -> photo ${photo.id} ("${query}") by ${photo.photographer}`);
  }

  await workbook.xlsx.writeFile(XLSX_PATH);
  fs.writeFileSync(
    path.join(__dirname, '..', 'content', 'blog-image-credits.json'),
    JSON.stringify(results, null, 2)
  );
  console.log(`\nDone. Assigned ${results.length} images. Credits written to content/blog-image-credits.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
