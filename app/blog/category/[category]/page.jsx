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
  return archiveCategories(posts).filter((category) => category.slug).map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return {};
  return {
    title: `${category.label} Guides`,
    description: `Practical ${category.shortLabel.toLowerCase()} buying guides, comparisons, and project advice for Panchkula and Chandigarh.`,
    alternates: { canonical: `/blog/category/${category.slug}` },
  };
}

export default async function BlogCategoryPage({ params }) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  const posts = await getAllPosts();
  const archivePosts = categoryPosts(posts, categorySlug);
  if (!category || !archivePosts.length) notFound();

  const visiblePosts = postsForPage(archivePosts, 1);
  const path = `/blog/category/${category.slug}`;
  const schema = graph(
    breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: category.label, path }]),
    blogArchiveSchema({ name: `${category.label} Guides`, path, posts: visiblePosts }),
  );

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <JsonLd data={schema} />
      <PageHero tag="Blog Category" title={`${category.label}\nGuides.`} sub={`Buying guides, comparisons, and practical advice for ${category.shortLabel.toLowerCase()} projects in Panchkula and Chandigarh.`} />
      <BlogGrid posts={visiblePosts} currentPage={1} totalPages={pageCount(archivePosts)} basePath={path} categories={archiveCategories(posts)} activeCategory={category.slug} />
    </div>
  );
}
