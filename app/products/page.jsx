import Link from 'next/link';
import { Reveal } from '@/components/Interactive';
import { PageHero } from '@/components/Presentational';
import { CATEGORIES } from '@/data/categories';

export const metadata = {
  title: 'Product Categories in Panchkula & Chandigarh',
  description: 'Hardware, tiles, paints, panels, tools, adhesives & pipes — browse all 7 product categories stocked by GT Building Solutions.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <PageHero tag="Our Product Range" title={'Complete Building\nSolutions, Curated.'} />
      <div style={{ padding: '64px var(--px) 80px' }}>
        {CATEGORIES.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 0.05}>
            <Link href={`/${cat.slug}`}
              style={{
                background: 'var(--white)', border: '1px solid var(--border)',
                borderRadius: '20px', padding: '50px', marginBottom: '20px',
                display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '50px', alignItems: 'start',
                textDecoration: 'none',
              }}
              className="grid-2 card-hover">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '22px' }}>
                  <div style={{ width: '52px', height: '52px', background: `linear-gradient(135deg,${cat.color} 0%,${cat.color}cc 100%)`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>{cat.icon}</div>
                  <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '26px', fontWeight: '600', color: 'var(--navy)', lineHeight: '1.2' }}>{cat.label}</h2>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--txt2)', lineHeight: '1.7', marginBottom: '20px' }}>{cat.desc}</p>
                <div style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>
                  {cat.brands.length} brands available
                </div>
                <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--navy)', letterSpacing: '1.5px', textTransform: 'uppercase', borderBottom: '1px solid var(--gold)', paddingBottom: '2px' }}>
                  View Full Category →
                </span>
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--navy)', opacity: '0.35', marginBottom: '18px' }}>
                  Brands in this category
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {cat.brands.map((b) => (
                    <div key={b} style={{ background: 'rgba(13,27,62,0.04)', border: '1px solid rgba(13,27,62,0.09)', borderRadius: '100px', padding: '10px 22px', fontSize: '13px', fontWeight: '500', color: 'var(--navy)' }}>{b}</div>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
