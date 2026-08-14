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
const GROUPED_FEATURED_IMAGE_BY_SLUG = {
  'how-to-choose-the-right-adhesive-or-waterproofing-solution-for-your-home-or-office-in-the-tri-city-region': 'group-adhesives-application.jpg',
  'pidilite-authorized-dealer-in-panchkula-gt-building-solutions': 'group-adhesives-application.jpg',
  'roff-vs-gresbond-which-tile-adhesive-should-you-choose': 'group-adhesives-application.jpg',
  'top-pidilite-products-for-home-diy-use-in-panchkula-chandigarh': 'group-adhesives-application.jpg',
  'top-roff-products-for-tiling-projects-in-panchkula-chandigarh': 'group-adhesives-application.jpg',
  'eboo-cabinet-furniture-hardware-price-buying-guide-in-panchkula-chandigarh-zirakpur-2026': 'group-hardware-cabinet-product.jpg',
  'eboo-vs-hettich-cabinet-hardware-which-is-right-for-you': 'group-hardware-cabinet-compare.jpg',
  'godrej-authorized-dealer-in-panchkula-gt-building-solutions': 'group-hardware-locks-showroom.jpg',
  'godrej-locks-price-buying-guide-in-panchkula-chandigarh-zirakpur-2026': 'group-hardware-locks-product.jpg',
  'sleek-kitchens-vs-a-custom-hettich-fitted-kitchen-which-is-right-for-you': 'group-hardware-cabinet-compare.jpg',
  'top-eboo-cabinet-hardware-products-for-your-furniture-project-in-panchkula-chandigarh': 'group-hardware-cabinet-product.jpg',
  'paint-price-guide-what-to-expect-when-shopping-in-panchkula-chandigarh': 'group-paints-display.jpg',
  'chetak-authorized-dealer-in-panchkula-gt-building-solutions': 'group-panels-boards.jpg',
  'chetak-panels-boards-price-buying-guide-in-panchkula-chandigarh-zirakpur-2026': 'group-panels-boards.jpg',
  'panels-plastering-showroom-near-me-why-visit-gt-building-solutions-in-panchkula': 'group-panels-boards.jpg',
  'top-chetak-panel-applications-for-interiors-partitions-in-panchkula-chandigarh': 'group-panels-interior.jpg',
  'best-pipes-plumbing-building-material-brands-available-in-panchkula-chandigarh-zirakpur-mohali-complete-2026-guide': 'group-plumbing-product.jpg',
  'birla-hil-pipes-price-buying-guide-in-panchkula-chandigarh-zirakpur-2026': 'group-plumbing-product.jpg',
  'pipes-plumbing-materials-price-guide-what-to-expect-when-shopping-in-panchkula-chandigarh': 'group-plumbing-product.jpg',
  'pipes-plumbing-showroom-near-me-why-visit-gt-building-solutions-in-panchkula': 'group-plumbing-showroom.jpg',
  'prince-piping-authorized-dealer-in-panchkula-gt-building-solutions': 'group-plumbing-showroom.jpg',
  'prince-piping-vs-birla-hil-which-pipes-should-you-choose-for-your-plumbing': 'group-plumbing-product.jpg',
  'top-plumbing-building-material-trends-for-2026-what-tri-city-homeowners-are-choosing': 'group-plumbing-product.jpg',
  'top-prince-piping-products-for-plumbing-in-panchkula-chandigarh': 'group-plumbing-product.jpg',
  'dewalt-vs-havells-power-tools-which-should-you-choose-for-your-tri-city-project': 'group-power-tools-showroom.jpg',
  'havells-power-tools-authorized-dealer-in-panchkula-gt-building-solutions': 'group-power-tools-showroom.jpg',
  'top-power-tool-trends-for-2026-what-tri-city-buyers-are-choosing': 'group-power-tools-showroom.jpg',
  'best-tile-sanitaryware-brands-available-in-panchkula-chandigarh-zirakpur-mohali-complete-2026-guide': 'group-tiles-sanitary-product.jpg',
  'kajaria-tiles-price-buying-guide-in-panchkula-chandigarh-zirakpur-2026': 'group-tiles-sanitary-product.jpg',
  'tiles-sanitaryware-price-guide-what-to-expect-when-shopping-in-panchkula-chandigarh': 'group-tiles-sanitary-product.jpg',
  'tiles-sanitaryware-showroom-near-me-why-visit-gt-building-solutions-in-panchkula': 'group-tiles-sanitary-showroom.jpg',
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
  const groupedImage = GROUPED_FEATURED_IMAGE_BY_SLUG[slug];
  if (groupedImage) return `blog/${groupedImage}`;
  return row.featured_image ? `blog/${row.featured_image}` : relatedCategory?.heroImage || null;
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
