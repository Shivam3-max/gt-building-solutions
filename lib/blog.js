// Blog content is authored in content/blog-posts.xlsx (a spreadsheet, not
// code) so the site owner can add/edit posts without touching the codebase.
// This module reads that file at build time only — nothing here runs in the
// browser. If the file is missing, /blog just renders with no posts instead
// of failing the build.
import path from 'path';
import ExcelJS from 'exceljs';
import { marked } from 'marked';
import { CATEGORIES } from '@/data/categories';

const FILE_PATH = path.join(process.cwd(), 'content', 'blog-posts.xlsx');
const REQUIRED_FIELDS = ['title', 'meta_description', 'excerpt', 'published_date', 'body_markdown'];
const FAQ_COUNT = 5;
const IMAGE_VARIANTS = {
  adhesives: {
    general: ['group-adhesives-application.jpg'],
  },
  hardware: {
    cabinet: ['group-hardware-cabinet-product.jpg', 'group-hardware-cabinet-compare.jpg'],
    locks: ['group-hardware-locks-product.jpg', 'group-hardware-locks-showroom.jpg'],
  },
  paints: {
    general: ['group-paints-display.jpg', 'group-paints-wood-finish.jpg'],
    putty: ['group-paints-wall-putty.jpg', 'group-paints-display.jpg'],
    wood: ['group-paints-wood-finish.jpg', 'group-paints-display.jpg'],
  },
  panels: {
    boards: ['group-panels-boards.jpg', 'group-panels-interior.jpg'],
    interior: ['group-panels-interior.jpg', 'group-panels-boards.jpg'],
    plaster: ['group-panels-plaster.jpg', 'group-panels-interior.jpg'],
  },
  plumbing: {
    general: ['group-plumbing-product.jpg', 'group-plumbing-showroom.jpg'],
    showroom: ['group-plumbing-showroom.jpg', 'group-plumbing-product.jpg'],
    irrigation: ['group-plumbing-irrigation.jpg', 'group-plumbing-product.jpg'],
  },
  tools: {
    general: ['group-power-tools-showroom.jpg', 'group-power-tools-abrasives.jpg'],
    abrasives: ['group-power-tools-abrasives.jpg', 'group-power-tools-showroom.jpg'],
  },
  tiles: {
    design: ['group-tiles-design.jpg', 'group-tiles-sanitary-product.jpg', 'group-tiles-sanitary-showroom.jpg'],
    sanitary: ['group-tiles-sanitary-product.jpg', 'group-tiles-design.jpg', 'group-tiles-sanitary-showroom.jpg'],
    showroom: ['group-tiles-sanitary-showroom.jpg', 'group-tiles-design.jpg', 'group-tiles-sanitary-product.jpg'],
  },
};

let cache = null;

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function cellToString(value) {
  if (value == null) return '';
  if (typeof value === 'object' && 'text' in value) return String(value.text).trim();
  if (typeof value === 'object' && 'result' in value) return String(value.result).trim();
  return String(value).trim();
}

function includesAny(value, needles) {
  return needles.some((needle) => value.includes(needle));
}

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickVariant(slug, variants) {
  if (!variants?.length) return null;
  return variants[hashString(slug) % variants.length];
}

async function loadRows() {
  const workbook = new ExcelJS.Workbook();
  try {
    await workbook.xlsx.readFile(FILE_PATH);
  } catch (err) {
    console.warn(`[blog] Could not read content/blog-posts.xlsx (${err.message}) — /blog will show no posts.`);
    return [];
  }

  const sheet = workbook.worksheets.find((ws) => ws.name.toLowerCase() === 'posts') || workbook.worksheets[0];
  if (!sheet) return [];

  const headerRow = sheet.getRow(1);
  const headers = [];
  headerRow.eachCell({ includeEmpty: false }, (cell, colNumber) => {
    headers[colNumber] = cellToString(cell.value);
  });

  const rows = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const obj = { __row: rowNumber };
    let hasContent = false;
    headers.forEach((header, colNumber) => {
      if (!header) return;
      const value = cellToString(row.getCell(colNumber).value);
      obj[header] = value;
      if (value) hasContent = true;
    });
    if (hasContent) rows.push(obj);
  });
  return rows;
}

function resolveFeaturedImage(row, relatedCategory, slug) {
  const categorySlug = row.related_category_slug || relatedCategory?.slug || slugify(row.category || '');

  switch (categorySlug) {
    case 'adhesives':
      return `blog/${pickVariant(slug, IMAGE_VARIANTS.adhesives.general)}`;
    case 'hardware':
      if (slug.includes('godrej')) {
        return `blog/${pickVariant(slug, IMAGE_VARIANTS.hardware.locks)}`;
      }
      return `blog/${pickVariant(slug, IMAGE_VARIANTS.hardware.cabinet)}`;
    case 'paints':
      if (includesAny(slug, ['birla-white', 'wall-putty'])) {
        return `blog/${pickVariant(slug, IMAGE_VARIANTS.paints.putty)}`;
      }
      if (includesAny(slug, ['ica', 'wood-finish'])) {
        return `blog/${pickVariant(slug, IMAGE_VARIANTS.paints.wood)}`;
      }
      return `blog/${pickVariant(slug, IMAGE_VARIANTS.paints.general)}`;
    case 'panels':
      if (includesAny(slug, ['jb-plastering', 'gypsum-plaster', 'sand-cement-plaster'])) {
        return `blog/${pickVariant(slug, IMAGE_VARIANTS.panels.plaster)}`;
      }
      if (includesAny(slug, ['top-', 'applications', 'partitions', 'false-ceiling', 'gyproc-gypsum-board-vs', 'how-to-choose-the-right-panels', 'best-panel'])) {
        return `blog/${pickVariant(slug, IMAGE_VARIANTS.panels.interior)}`;
      }
      return `blog/${pickVariant(slug, IMAGE_VARIANTS.panels.boards)}`;
    case 'pipes-plumbing':
      if (includesAny(slug, ['tata-agrico', 'irrigation', 'farm', 'nursery'])) {
        return `blog/${pickVariant(slug, IMAGE_VARIANTS.plumbing.irrigation)}`;
      }
      if (includesAny(slug, ['authorized-dealer', 'showroom-near-me'])) {
        return `blog/${pickVariant(slug, IMAGE_VARIANTS.plumbing.showroom)}`;
      }
      return `blog/${pickVariant(slug, IMAGE_VARIANTS.plumbing.general)}`;
    case 'power-tools':
      if (includesAny(slug, ['cumi', 'abrasive', 'cutting-disc', 'fabrication'])) {
        return `blog/${pickVariant(slug, IMAGE_VARIANTS.tools.abrasives)}`;
      }
      return `blog/${pickVariant(slug, IMAGE_VARIANTS.tools.general)}`;
    case 'tiles':
      if (includesAny(slug, ['authorized-dealer', 'showroom-near-me'])) {
        return `blog/${pickVariant(slug, IMAGE_VARIANTS.tiles.showroom)}`;
      }
      if (includesAny(slug, ['hindware', 'kerovit', 'sanitaryware'])) {
        return `blog/${pickVariant(slug, IMAGE_VARIANTS.tiles.sanitary)}`;
      }
      return `blog/${pickVariant(slug, IMAGE_VARIANTS.tiles.design)}`;
    default:
      return relatedCategory?.heroImage || null;
  }
}

function normalizePost(row) {
  const missing = REQUIRED_FIELDS.filter((f) => !row[f]);
  if (missing.length) {
    console.warn(`[blog] Skipping row ${row.__row} in blog-posts.xlsx — missing required field(s): ${missing.join(', ')}`);
    return null;
  }

  const status = (row.status || 'published').toLowerCase();
  if (status === 'draft') return null;

  const slug = slugify(row.slug || row.title);
  const relatedCategory = row.related_category_slug
    ? CATEGORIES.find((c) => c.slug === row.related_category_slug)
    : null;

  const faqs = [];
  for (let i = 1; i <= FAQ_COUNT; i++) {
    const q = row[`faq${i}_question`];
    const a = row[`faq${i}_answer`];
    if (q && a) faqs.push({ q, a });
  }

  return {
    slug,
    title: row.title,
    metaTitle: row.meta_title || row.title,
    metaDescription: row.meta_description,
    excerpt: row.excerpt,
    category: row.category || null,
    relatedCategorySlug: row.related_category_slug || null,
    relatedBrandSlug: row.related_brand_slug || null,
    author: row.author || 'GT Building Solutions Team',
    publishedDate: row.published_date,
    updatedDate: row.updated_date || row.published_date,
    featuredImage: resolveFeaturedImage(row, relatedCategory, slug),
    bodyHtml: marked.parse(row.body_markdown),
    faqs,
    tags: row.tags ? row.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
  };
}

export async function getAllPosts() {
  if (cache) return cache;

  const rows = await loadRows();
  const seenSlugs = new Set();
  const posts = [];

  for (const row of rows) {
    const post = normalizePost(row);
    if (!post) continue;
    if (seenSlugs.has(post.slug)) {
      console.warn(`[blog] Duplicate slug "${post.slug}" in blog-posts.xlsx — skipping row ${row.__row}`);
      continue;
    }
    seenSlugs.add(post.slug);
    posts.push(post);
  }

  posts.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  cache = posts;
  return posts;
}

export async function getPostBySlug(slug) {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function getPostsByCategory(categorySlug, excludeSlug = null) {
  const posts = await getAllPosts();
  return posts.filter((p) => p.relatedCategorySlug === categorySlug && p.slug !== excludeSlug);
}
