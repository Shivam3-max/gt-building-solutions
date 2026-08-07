import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/Presentational';
import { LOCALITIES, getLocalityBySlug } from '@/data/localities';
import { WHATSAPP_LINK } from '@/lib/site';

export function generateStaticParams() {
  return LOCALITIES.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const l = getLocalityBySlug(city);
  if (!l) return {};
  return {
    title: `Building Materials & Hardware Store in ${l.city}`,
    description: l.isStore
      ? `GT Building Solutions' ${l.storeName} showroom in ${l.city} — hardware, tiles, paints and more, with address, phone and map.`
      : `GT Building Solutions serves ${l.city} with building materials and hardware delivered from our Panchkula & Chandigarh showrooms.`,
    alternates: { canonical: `/locations/${l.slug}` },
  };
}

export default async function LocalityPage({ params }) {
  const { city } = await params;
  const l = getLocalityBySlug(city);
  if (!l) notFound();
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(l.mapQuery || l.city + ', India')}&output=embed`;

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <PageHero tag={l.isStore ? 'Our Showroom' : 'Service Area'} title={`Building Materials\nin ${l.city}.`} sub={l.intro} />

      <div style={{ padding: '56px var(--px) 0' }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: '24px', fontSize: '12px', color: 'var(--txt3)' }}>
          <Link href="/" style={{ color: 'var(--txt3)', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link href="/locations" style={{ color: 'var(--txt3)', textDecoration: 'none' }}>Locations</Link>
          {' / '}
          <span style={{ color: 'var(--navy)' }}>{l.city}</span>
        </nav>
      </div>

      <div style={{ padding: '0 var(--px) 64px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '48px', alignItems: 'start' }} className="grid-2">
        <div>
          {l.body.map((para, i) => (
            <p key={i} style={{ fontSize: '15px', color: 'var(--txt2)', lineHeight: '1.85', marginBottom: '18px' }}>{para}</p>
          ))}
          <div style={{ marginTop: '28px', borderRadius: '18px', overflow: 'hidden', border: '1px solid var(--border)', height: '340px' }}>
            <iframe
              title={`Map of ${l.city}`}
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div style={{ background: 'linear-gradient(140deg,var(--navy) 0%,var(--navy3) 100%)', borderRadius: '20px', padding: '40px 34px' }}>
          {l.isStore ? (
            <>
              <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)' }}>{l.storeName}</span>
              <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '26px', fontWeight: '600', color: '#ffffff', margin: '10px 0 20px' }}>Visit Our {l.city} Showroom</h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', marginBottom: '10px' }}>📍 {l.address}</p>
              <a href={`tel:${l.phone.replace(/\s/g, '')}`} style={{ display: 'block', color: 'var(--gold)', fontSize: '16px', fontWeight: '600', textDecoration: 'none', marginBottom: '24px' }}>📞 {l.phone}</a>
            </>
          ) : (
            <>
              <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)' }}>Nearest Showrooms</span>
              <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '26px', fontWeight: '600', color: '#ffffff', margin: '10px 0 20px' }}>We Deliver to {l.city}</h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', marginBottom: '4px' }}>📍 Garg Trading Company, Panchkula</p>
              <a href="tel:+919814033573" style={{ display: 'block', color: 'var(--gold)', fontSize: '15px', fontWeight: '600', textDecoration: 'none', marginBottom: '16px' }}>📞 +91 98140 33573</a>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', marginBottom: '4px' }}>📍 Gujarat Tiles & Sanitary Depot, Chandigarh</p>
              <a href="tel:+919216866671" style={{ display: 'block', color: 'var(--gold)', fontSize: '15px', fontWeight: '600', textDecoration: 'none', marginBottom: '24px' }}>📞 +91 92168 66671</a>
            </>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#25D366', color: '#ffffff', padding: '14px 20px', borderRadius: '10px', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>💬 WhatsApp Us</a>
            <Link href="/contact" className="btn-gold" style={{ justifyContent: 'center' }}>Get a Quote</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
