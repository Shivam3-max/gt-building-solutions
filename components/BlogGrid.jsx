'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Reveal, SiteImage } from '@/components/Interactive';

export default function BlogGrid({ posts }) {
  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))];
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? posts : posts.filter((p) => p.category === filter);

  return (
    <>
      {categories.length > 1 && (
        <div style={{ padding: '40px var(--px) 0' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)} style={{
                background: filter === c ? 'var(--navy)' : 'var(--white)',
                border: `1px solid ${filter === c ? 'var(--navy)' : 'var(--border)'}`,
                borderRadius: '100px', padding: '9px 22px', fontSize: '12px', fontWeight: '500',
                fontFamily: 'DM Sans,sans-serif', letterSpacing: '0.3px',
                color: filter === c ? 'var(--gold)' : 'var(--navy)', cursor: 'pointer',
              }}>{c}</button>
            ))}
          </div>
        </div>
      )}

      <div style={{ padding: '32px var(--px) 80px' }}>
        {shown.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--txt3)' }}>
            {posts.length === 0 ? 'No posts published yet — check back soon.' : 'No posts in this category yet.'}
          </div>
        ) : (
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
            {shown.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div className="card-hover" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--white)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <SiteImage src={post.featuredImage} alt={post.title} h={200} radius={0} />
                    <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      {post.category && (
                        <span style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '10px' }}>{post.category}</span>
                      )}
                      <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '22px', fontWeight: '600', color: 'var(--navy)', lineHeight: '1.25', marginBottom: '10px' }}>
                        {post.title}
                      </h2>
                      <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: '1.65', flex: 1 }}>{post.excerpt}</p>
                      <span style={{ fontSize: '11px', color: 'var(--txt3)', marginTop: '16px', fontWeight: '500' }}>
                        {new Date(post.publishedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
