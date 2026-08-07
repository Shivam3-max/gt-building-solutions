'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Reveal, BrandLogo } from '@/components/Interactive';
import { BRANDS } from '@/data/brands';
import { catColorMap } from '@/data/categories';

const FILTERS = [
  { id: 'all', label: 'All Brands' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'adhesives', label: 'Adhesives' },
  { id: 'paints', label: 'Paints' },
  { id: 'tiles', label: 'Tiles' },
  { id: 'panels', label: 'Panels' },
  { id: 'tools', label: 'Power Tools' },
  { id: 'pipes', label: 'Pipes' },
];
const CAT_LABEL = { hardware: 'Hardware', adhesives: 'Adhesives', paints: 'Paints', tiles: 'Tiles & Sanitary', panels: 'Panels', tools: 'Power Tools', pipes: 'Pipes' };

export default function BrandsGrid() {
  const [filter, setFilter] = useState('all');
  const shown = filter === 'all' ? BRANDS : BRANDS.filter((b) => b.cat === filter);

  return (
    <>
      <div style={{ padding: '40px var(--px) 0' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {FILTERS.map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              background: filter === f.id ? 'var(--navy)' : 'var(--white)',
              border: `1px solid ${filter === f.id ? 'var(--navy)' : 'var(--border)'}`,
              borderRadius: '100px', padding: '9px 22px', fontSize: '12px', fontWeight: '500',
              fontFamily: 'DM Sans,sans-serif', letterSpacing: '0.3px',
              color: filter === f.id ? 'var(--gold)' : 'var(--navy)', cursor: 'pointer',
            }}>{f.label}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: '32px var(--px) 80px' }}>
        <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
          {shown.map((b, i) => (
            <Reveal key={b.slug} delay={i * 0.03}>
              <Link href={`/brands/${b.slug}`} className="card-hover" style={{
                background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '16px',
                padding: '34px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
                textDecoration: 'none',
              }}>
                <div style={{ width: '100%', maxWidth: '150px' }}>
                  <BrandLogo name={b.name} h={74} radius={15} />
                </div>
                <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '19px', fontWeight: '600', color: 'var(--navy)', textAlign: 'center' }}>{b.name}</div>
                <div style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', color: catColorMap[b.cat] || 'var(--gold)', opacity: 0.65 }}>
                  {CAT_LABEL[b.cat] || b.cat}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
