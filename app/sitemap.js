import { SITE_URL } from '@/lib/site';
import { CATEGORIES } from '@/data/categories';
import { BRANDS } from '@/data/brands';
import { LOCALITIES } from '@/data/localities';
import { getAllPosts } from '@/lib/blog';
import { archiveCategories, categoryPosts, pageCount } from '@/lib/blog-archive';

export const dynamic = 'force-static';

const STATIC_ROUTES = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: 'about', priority: 0.7, changeFrequency: 'monthly' },
  { path: 'contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'products', priority: 0.9, changeFrequency: 'monthly' },
  { path: 'brands', priority: 0.9, changeFrequency: 'monthly' },
  { path: 'locations', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'gallery', priority: 0.5, changeFrequency: 'monthly' },
  { path: 'calculators', priority: 0.6, changeFrequency: 'monthly' },
  { path: 'blog', priority: 0.8, changeFrequency: 'weekly' },
];

export default async function sitemap() {
  const now = new Date();
  const posts = await getAllPosts();

  const staticEntries = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}/${path}`.replace(/\/$/, '') + '/',
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const categoryEntries = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/${cat.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const brandEntries = BRANDS.map((brand) => ({
    url: `${SITE_URL}/brands/${brand.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const localityEntries = LOCALITIES.map((loc) => ({
    url: `${SITE_URL}/locations/${loc.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const postEntries = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: new Date(post.updatedDate),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const blogPageEntries = Array.from({ length: Math.max(0, pageCount(posts) - 1) }, (_, index) => ({
    url: `${SITE_URL}/blog/page/${index + 2}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  const blogCategoryEntries = archiveCategories(posts).flatMap((category) => {
    if (!category.slug) return [];
    const totalPages = pageCount(categoryPosts(posts, category.slug));
    return Array.from({ length: totalPages }, (_, index) => {
      const page = index + 1;
      const suffix = page === 1 ? '' : `/page/${page}`;
      return {
        url: `${SITE_URL}/blog/category/${category.slug}${suffix}/`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: page === 1 ? 0.7 : 0.5,
      };
    });
  });

  return [...staticEntries, ...categoryEntries, ...brandEntries, ...localityEntries, ...blogPageEntries, ...blogCategoryEntries, ...postEntries];
}
