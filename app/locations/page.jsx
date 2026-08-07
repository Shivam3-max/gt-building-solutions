import Link from 'next/link';
import { PageHero } from '@/components/Presentational';
import { Reveal } from '@/components/Interactive';
import { LOCALITIES } from '@/data/localities';

export const metadata = {
  title: 'Areas We Serve — Panchkula, Chandigarh, Zirakpur & Mohali',
  description: 'GT Building Solutions serves the Panchkula–Chandigarh–Zirakpur–Mohali tri-city area with two showrooms and project delivery across the region.',
  alternates: { canonical: '/locations' },
};

export default function LocationsPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <PageHero tag="Where We Serve" title={'Panchkula, Chandigarh\n& the Tri-City Area.'} sub="Two showrooms, and project delivery across Panchkula, Chandigarh, Zirakpur, and Mohali." />
      <div style={{ padding: '64px var(--px) 80px', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px' }} className="grid-2">
        {LOCALITIES.map((l, i) => (
          <Reveal key={l.slug} delay={i * 0.06}>
            <Link href={`/locations/${l.slug}`} className="card-hover" style={{
              display: 'block', background: 'var(--white)', border: '1px solid var(--border)',
              borderRadius: '18px', padding: '36px', textDecoration: 'none',
            }}>
              <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)' }}>
                {l.isStore ? 'Showroom' : 'Service Area'}
              </span>
              <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '28px', fontWeight: '600', color: 'var(--navy)', margin: '10px 0 14px' }}>{l.city}</h2>
              <p style={{ fontSize: '14px', color: 'var(--txt2)', lineHeight: '1.7', marginBottom: '16px' }}>{l.intro}</p>
              <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--navy)', letterSpacing: '1.5px', textTransform: 'uppercase', borderBottom: '1px solid var(--gold)', paddingBottom: '2px' }}>
                View Details →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
