import { notFound } from 'next/navigation';
import { PageHero } from '@/components/Presentational';
import BlogGrid from '@/components/BlogGrid';
import JsonLd from '@/components/JsonLd';
import { getAllPosts } from '@/lib/blog';
import { archiveCategories, pageCount, postsForPage } from '@/lib/blog-archive';
import { blogArchiveSchema, breadcrumbSchema, graph } from '@/lib/schema';

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return Array.from({ length: Math.max(0, pageCount(posts) - 1) }, (_, index) => ({ page: String(index + 2) }));
}

export async function generateMetadata({ params }) {
  const { page: pageParam } = await params;
  const page = Number(pageParam);
  return {
    title: `Building Materials Blog — Page ${page}`,
    description: 'Practical guides on tiles, paints, plumbing, adhesives, and hardware from GT Building Solutions.',
    alternates: { canonical: `/blog/page/${page}` },
  };
}

export default async function BlogPaginationPage({ params }) {
  const { page: pageParam } = await params;
  const page = Number(pageParam);
  const posts = await getAllPosts();
  const totalPages = pageCount(posts);
  if (!Number.isInteger(page) || page < 2 || page > totalPages) notFound();

  const visiblePosts = postsForPage(posts, page);
  const path = `/blog/page/${page}`;
  const schema = graph(
    breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: `Page ${page}`, path }]),
    blogArchiveSchema({ name: `GT Building Solutions Blog — Page ${page}`, path, posts: visiblePosts }),
  );

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <JsonLd data={schema} />
      <PageHero tag={`Blog · Page ${page}`} title="Building Materials\nGuides." sub="Browse practical advice for your next project." />
      <BlogGrid posts={visiblePosts} currentPage={page} totalPages={totalPages} basePath="/blog" categories={archiveCategories(posts)} activeCategory={null} />
    </div>
  );
}
