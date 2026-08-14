import { notFound } from 'next/navigation';
import { PageHero } from '@/components/Presentational';
import BlogGrid from '@/components/BlogGrid';
import JsonLd from '@/components/JsonLd';
import { getAllPosts } from '@/lib/blog';
import { archiveCategories, categoryPosts, pageCount, postsForPage } from '@/lib/blog-archive';
import { getCategoryBySlug } from '@/data/categories';
import { blogArchiveSchema, breadcrumbSchema, graph } from '@/lib/schema';

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return archiveCategories(posts).flatMap((category) => {
    if (!category.slug) return [];
    const count = pageCount(categoryPosts(posts, category.slug));
    return Array.from({ length: Math.max(0, count - 1) }, (_, index) => ({ category: category.slug, page: String(index + 2) }));
  });
}

export async function generateMetadata({ params }) {
  const { category: categorySlug, page: pageParam } = await params;
  const category = getCategoryBySlug(categorySlug);
  const page = Number(pageParam);
  if (!category) return {};
  return {
    title: `${category.label} Guides — Page ${page}`,
    description: `More ${category.shortLabel.toLowerCase()} buying guides, comparisons, and project advice from GT Building Solutions.`,
    alternates: { canonical: `/blog/category/${category.slug}/page/${page}` },
  };
}

export default async function BlogCategoryPaginationPage({ params }) {
  const { category: categorySlug, page: pageParam } = await params;
  const category = getCategoryBySlug(categorySlug);
  const page = Number(pageParam);
  const posts = await getAllPosts();
  const archivePosts = categoryPosts(posts, categorySlug);
  const totalPages = pageCount(archivePosts);
  if (!category || !Number.isInteger(page) || page < 2 || page > totalPages) notFound();

  const visiblePosts = postsForPage(archivePosts, page);
  const basePath = `/blog/category/${category.slug}`;
  const path = `${basePath}/page/${page}`;
  const schema = graph(
    breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: category.label, path: basePath }, { name: `Page ${page}`, path }]),
    blogArchiveSchema({ name: `${category.label} Guides — Page ${page}`, path, posts: visiblePosts }),
  );

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <JsonLd data={schema} />
      <PageHero tag={`Blog Category · Page ${page}`} title={`${category.label}\nGuides.`} sub={`More practical advice for ${category.shortLabel.toLowerCase()} projects in Panchkula and Chandigarh.`} />
      <BlogGrid posts={visiblePosts} currentPage={page} totalPages={totalPages} basePath={basePath} categories={archiveCategories(posts)} activeCategory={category.slug} />
    </div>
  );
}
