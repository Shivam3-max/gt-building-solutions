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
      return 'blog/group-adhesives-application.jpg';
    case 'hardware':
      if (slug.includes('godrej')) {
        return `blog/${slug.includes('authorized-dealer') ? 'group-hardware-locks-showroom.jpg' : 'group-hardware-locks-product.jpg'}`;
      }
      if (includesAny(slug, ['vs-', 'which-is-right', 'comparison'])) {
        return 'blog/group-hardware-cabinet-compare.jpg';
      }
      return 'blog/group-hardware-cabinet-product.jpg';
    case 'paints':
      if (includesAny(slug, ['birla-white', 'wall-putty'])) {
        return 'blog/group-paints-wall-putty.jpg';
      }
      if (includesAny(slug, ['ica', 'wood-finish'])) {
        return 'blog/group-paints-wood-finish.jpg';
      }
      return 'blog/group-paints-display.jpg';
    case 'panels':
      if (includesAny(slug, ['jb-plastering', 'gypsum-plaster', 'sand-cement-plaster'])) {
        return 'blog/group-panels-plaster.jpg';
      }
      if (includesAny(slug, ['top-', 'applications', 'partitions', 'false-ceiling', 'gyproc-gypsum-board-vs', 'how-to-choose-the-right-panels', 'best-panel'])) {
        return 'blog/group-panels-interior.jpg';
      }
      return 'blog/group-panels-boards.jpg';
    case 'pipes-plumbing':
      if (includesAny(slug, ['tata-agrico', 'irrigation', 'farm', 'nursery'])) {
        return 'blog/group-plumbing-irrigation.jpg';
      }
      if (includesAny(slug, ['authorized-dealer', 'showroom-near-me'])) {
        return 'blog/group-plumbing-showroom.jpg';
      }
      return 'blog/group-plumbing-product.jpg';
    case 'power-tools':
      if (includesAny(slug, ['cumi', 'abrasive', 'cutting-disc', 'fabrication'])) {
        return 'blog/group-power-tools-abrasives.jpg';
      }
      return 'blog/group-power-tools-showroom.jpg';
    case 'tiles':
      if (includesAny(slug, ['hindware', 'kerovit', 'sanitaryware', 'bathroom'])) {
        return `blog/${includesAny(slug, ['authorized-dealer', 'showroom-near-me']) ? 'group-tiles-sanitary-showroom.jpg' : 'group-tiles-sanitary-product.jpg'}`;
      }
      if (includesAny(slug, ['authorized-dealer', 'showroom-near-me'])) {
        return 'blog/group-tiles-design.jpg';
      }
      return 'blog/group-tiles-design.jpg';
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
