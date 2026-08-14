import { PageHero } from '@/components/Presentational';
import BlogGrid from '@/components/BlogGrid';
import JsonLd from '@/components/JsonLd';
import { getAllPosts } from '@/lib/blog';
import { archiveCategories, pageCount, postsForPage } from '@/lib/blog-archive';
import { blogArchiveSchema, breadcrumbSchema, graph } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Blog — Building Materials Tips & Guides',
  description: 'Practical guides on tiles, paints, plumbing, adhesives, and hardware from GT Building Solutions — Panchkula & Chandigarh’s building materials showroom.',
  alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const visiblePosts = postsForPage(posts, 1);
  const schema = graph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]),
    {
      '@type': 'Blog',
      '@id': `${SITE_URL}/blog/#blog`,
      name: 'GT Building Solutions Blog',
      url: `${SITE_URL}/blog`,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    blogArchiveSchema({ name: 'GT Building Solutions Blog', path: '/blog', posts: visiblePosts }),
  );

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <JsonLd data={schema} />
      <PageHero tag="Blog" title={'Guides & Tips for\nYour Next Project.'} sub="Practical advice on materials, brands, and getting your renovation or build right the first time." />
      <BlogGrid posts={visiblePosts} currentPage={1} totalPages={pageCount(posts)} basePath="/blog" categories={archiveCategories(posts)} activeCategory={null} />
    </div>
  );
}
