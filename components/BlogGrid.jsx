import Link from 'next/link';
import { Reveal, SiteImage } from '@/components/Interactive';

function pageHref(basePath, page) {
  return page === 1 ? basePath : `${basePath}/page/${page}`;
}

export default function BlogGrid({ posts, currentPage, totalPages, basePath, categories, activeCategory }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
      <nav aria-label="Browse blog categories" style={{ padding: '40px var(--px) 0' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((category) => {
            const active = category.slug === activeCategory;
            return (
              <Link
                key={category.slug || 'all'}
                href={category.href}
                aria-current={active ? 'page' : undefined}
                style={{
                  background: active ? 'var(--navy)' : 'var(--white)',
                  border: `1px solid ${active ? 'var(--navy)' : 'var(--border)'}`,
                  borderRadius: '100px', padding: '9px 22px', fontSize: '12px', fontWeight: '500',
                  fontFamily: 'DM Sans,sans-serif', letterSpacing: '0.3px', textDecoration: 'none',
                  color: active ? 'var(--gold)' : 'var(--navy)',
                }}
              >
                {category.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <section aria-label="Blog posts" style={{ padding: '32px var(--px) 80px' }}>
        <p style={{ color: 'var(--txt3)', fontSize: '13px', marginBottom: '20px' }}>
          Page {currentPage} of {totalPages}
        </p>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.05}>
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <article className="card-hover" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--white)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <SiteImage src={post.featuredImage} alt={post.title} h={200} radius={0} />
                  <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    {post.category && (
                      <span style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '10px' }}>{post.category}</span>
                    )}
                    <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '22px', fontWeight: '600', color: 'var(--navy)', lineHeight: '1.25', marginBottom: '10px' }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: '1.65', flex: 1 }}>{post.excerpt}</p>
                    <time dateTime={post.publishedDate} style={{ fontSize: '11px', color: 'var(--txt3)', marginTop: '16px', fontWeight: '500' }}>
                      {new Date(post.publishedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </time>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>

        {totalPages > 1 && (
          <nav aria-label="Blog pagination" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '40px' }}>
            {currentPage > 1 && <Link href={pageHref(basePath, currentPage - 1)} style={paginationStyle}>Previous</Link>}
            {pageNumbers.map((page) => (
              <Link key={page} href={pageHref(basePath, page)} aria-current={page === currentPage ? 'page' : undefined} style={{ ...paginationStyle, ...(page === currentPage ? activePaginationStyle : {}) }}>
                {page}
              </Link>
            ))}
            {currentPage < totalPages && <Link href={pageHref(basePath, currentPage + 1)} style={paginationStyle}>Next</Link>}
          </nav>
        )}
      </section>
    </>
  );
}

const paginationStyle = {
  minWidth: '38px', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: '8px',
  color: 'var(--navy)', background: 'var(--white)', textAlign: 'center', textDecoration: 'none', fontSize: '13px',
};

const activePaginationStyle = { background: 'var(--navy)', borderColor: 'var(--navy)', color: 'var(--gold)' };
