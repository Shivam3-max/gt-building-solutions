import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/Presentational';
import { SiteImage, BrandLogo } from '@/components/Interactive';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import { getAllPosts, getPostBySlug, getPostsByCategory } from '@/lib/blog';
import { getCategoryBySlug } from '@/data/categories';
import { getBrandBySlug } from '@/data/brands';
import { WHATSAPP_LINK, SITE_URL } from '@/lib/site';
import { breadcrumbSchema, faqPageSchema, graph } from '@/lib/schema';

// With `output: 'export'`, generateStaticParams must return at least one
// entry or the entire build fails — not just this route. If the workbook is
// ever missing or has zero valid posts, fall back to a single placeholder
// param so the build still succeeds and /blog/[anything] shows a friendly
// "no posts yet" page instead of breaking the whole site.
const NO_POSTS_PLACEHOLDER = '_no-posts-yet';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  if (posts.length === 0) return [{ slug: NO_POSTS_PLACEHOLDER }];
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (slug === NO_POSTS_PLACEHOLDER) {
    return { title: 'Blog', alternates: { canonical: '/blog' } };
  }
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: post.featuredImage ? { images: [`/Public/${post.featuredImage}`] } : undefined,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  if (slug === NO_POSTS_PLACEHOLDER) {
    return (
      <div style={{ background: 'var(--cream)', minHeight: '100vh', padding: '140px var(--px) 100px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '32px', fontWeight: '600', color: 'var(--navy)', marginBottom: '12px' }}>No posts yet</h1>
        <p style={{ fontSize: '15px', color: 'var(--txt2)' }}>Check back soon, or <Link href="/contact" style={{ color: 'var(--gold)' }}>get in touch</Link> with your project needs.</p>
      </div>
    );
  }

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const relatedCategory = post.relatedCategorySlug ? getCategoryBySlug(post.relatedCategorySlug) : null;
  const relatedBrand = post.relatedBrandSlug ? getBrandBySlug(post.relatedBrandSlug) : null;
  const relatedPosts = post.relatedCategorySlug
    ? (await getPostsByCategory(post.relatedCategorySlug, post.slug)).slice(0, 3)
    : [];

  const schema = graph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    {
      '@type': 'BlogPosting',
      '@id': `${SITE_URL}/blog/${post.slug}/#post`,
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.publishedDate,
      dateModified: post.updatedDate,
      author: { '@type': 'Organization', name: post.author },
      publisher: { '@id': `${SITE_URL}/#organization` },
      ...(post.featuredImage ? { image: `${SITE_URL}/Public/${post.featuredImage}` } : {}),
      mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    },
    ...(post.faqs.length ? [faqPageSchema(post.faqs)] : []),
  );

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <JsonLd data={schema} />

      <div style={{ background: 'linear-gradient(158deg,#080F22 0%,#0D1B3E 60%,#162347 100%)', padding: '100px var(--px) 70px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.04) 1px,transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }} />
        <nav aria-label="Breadcrumb" style={{ position: 'relative', zIndex: 2, marginBottom: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link href="/blog" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Blog</Link>
          {' / '}
          <span style={{ color: '#ffffff' }}>{post.title}</span>
        </nav>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
          {post.category && <span className="section-tag">{post.category}</span>}
          <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontWeight: '600', fontSize: 'clamp(30px,5vw,52px)', color: '#ffffff', lineHeight: '1.15', marginBottom: '16px' }}>
            {post.title}
          </h1>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
            {post.author} · {new Date(post.publishedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>

      <div style={{ padding: '56px var(--px) 0', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '48px', alignItems: 'start' }} className="grid-2">
        <div>
          {post.featuredImage && (
            <div style={{ marginBottom: '36px' }}>
              <SiteImage src={post.featuredImage} alt={post.title} h={360} radius={16} />
            </div>
          )}
          <div
            style={{ fontSize: '16px', color: 'var(--txt2)', lineHeight: '1.85' }}
            className="blog-body"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '100px' }}>
          {(relatedCategory || relatedBrand) && (
            <div style={{ background: 'linear-gradient(140deg,var(--navy) 0%,var(--navy3) 100%)', borderRadius: '20px', padding: '32px 30px' }}>
              <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)' }}>Related</span>
              {relatedCategory && (
                <>
                  <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '22px', fontWeight: '600', color: '#ffffff', margin: '10px 0 12px' }}>{relatedCategory.label}</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.6', marginBottom: '16px' }}>{relatedCategory.desc}</p>
                  <Link href={`/${relatedCategory.slug}`} className="btn-gold" style={{ width: '100%', justifyContent: 'center', marginBottom: relatedBrand ? '20px' : 0 }}>
                    Explore {relatedCategory.label}
                  </Link>
                </>
              )}
              {relatedBrand && (
                <div style={{ paddingTop: relatedCategory ? '20px' : 0, borderTop: relatedCategory ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                  <Link href={`/brands/${relatedBrand.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
                    <div style={{ width: '56px', flexShrink: 0 }}>
                      <BrandLogo name={relatedBrand.name} h={40} radius={8} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '17px', fontWeight: '600', color: '#ffffff' }}>{relatedBrand.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: '500' }}>In Stock at GT →</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          )}

          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '20px', padding: '32px 30px' }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '20px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px' }}>Need help with your project?</h3>
            <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: '1.6', marginBottom: '18px' }}>Talk to our team for pricing, availability, or a full project quote.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#25D366', color: '#ffffff', padding: '13px 18px', borderRadius: '10px', fontWeight: '600', fontSize: '13px', textDecoration: 'none' }}>💬 WhatsApp Us</a>
              <Link href="/contact" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>Get a Quote</Link>
            </div>
          </div>
        </div>
      </div>

      <FAQSection faqs={post.faqs} title={`${post.title} — FAQs`} />

      {relatedPosts.length > 0 && (
        <div style={{ padding: '0 var(--px) 80px' }}>
          <span className="section-tag">Keep Reading</span>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '32px', fontWeight: '600', color: 'var(--navy)', marginBottom: '24px' }}>More on {post.category}</h2>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
            {relatedPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                <div className="card-hover" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--white)' }}>
                  <SiteImage src={p.featuredImage} alt={p.title} h={160} radius={0} />
                  <div style={{ padding: '18px 20px' }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '17px', fontWeight: '600', color: 'var(--navy)', lineHeight: '1.3' }}>{p.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
