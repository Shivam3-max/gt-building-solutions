import { CATEGORIES } from '@/data/categories';

export const POSTS_PER_PAGE = 12;

export function pageCount(posts) {
  return Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
}

export function postsForPage(posts, page) {
  const start = (page - 1) * POSTS_PER_PAGE;
  return posts.slice(start, start + POSTS_PER_PAGE);
}

export function archiveCategories(posts) {
  const available = new Set(posts.map((post) => post.relatedCategorySlug));
  return [
    { slug: null, label: 'All Guides', href: '/blog' },
    ...CATEGORIES.filter((category) => available.has(category.slug)).map((category) => ({
      slug: category.slug,
      label: category.shortLabel,
      href: `/blog/category/${category.slug}`,
    })),
  ];
}

export function categoryPosts(posts, categorySlug) {
  return posts.filter((post) => post.relatedCategorySlug === categorySlug);
}
