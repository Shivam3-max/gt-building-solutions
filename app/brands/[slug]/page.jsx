import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BrandLogo } from '@/components/Interactive';
import { GoldLine } from '@/components/Presentational';
import JsonLd from '@/components/JsonLd';
import { BRANDS, getBrandBySlug } from '@/data/brands';
import { getCategoryById } from '@/data/categories';
import { WHATSAPP_LINK, STORES } from '@/lib/site';
import { breadcrumbSchema, brandSchema, graph } from '@/lib/schema';

export function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};
  const cat = getCategoryById(brand.cat);
  return {
    title: `${brand.name} — In Stock in Panchkula & Chandigarh`,
    description: `${brand.name} ${cat.label.toLowerCase()} available at GT Building Solutions. Call or WhatsApp for pricing and availability in Panchkula & Chandigarh.`,
    alternates: { canonical: `/brands/${brand.slug}` },
  };
}

export default async function BrandPage({ params }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();
  const cat = getCategoryById(brand.cat);
  const schema = graph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: cat.label, path: `/${cat.slug}` },
      { name: brand.name, path: `/brands/${brand.slug}` },
    ]),
    brandSchema(brand),
  );

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <JsonLd data={schema} />
      <div style={{ background: 'linear-gradient(158deg,#080F22 0%,#0D1B3E 60%,#162347 100%)', padding: '100px var(--px) 70px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.04) 1px,transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }} />
        <nav aria-label="Breadcrumb" style={{ position: 'relative', zIndex: 2, marginBottom: '28px', fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link href="/brands" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Brands</Link>
          {' / '}
          <span style={{ color: '#ffffff' }}>{brand.name}</span>
        </nav>
        <div style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '220px 1fr', gap: '40px', alignItems: 'center' }} className="grid-2">
          <div style={{ maxWidth: '220px' }}>
            <BrandLogo name={brand.name} h={110} radius={20} />
          </div>
          <div>
            <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '14px' }}>
              Brand Partner · {cat.label}
            </span>
            <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontWeight: '600', fontSize: 'clamp(34px,5vw,58px)', color: '#ffffff', lineHeight: '1.1' }}>
              {brand.name}
            </h1>
          </div>
        </div>
      </div>

      <div style={{ padding: '56px var(--px)', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '48px', alignItems: 'start' }} className="grid-2">
        <div>
          <span className="section-tag">About {brand.name}</span>
          <p style={{ fontSize: '16px', color: 'var(--txt2)', lineHeight: '1.85', marginBottom: '28px' }}>{brand.description}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
            {brand.highlights.map((h, i) => (
              <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: 'var(--navy)', fontWeight: '500' }}>{h}</span>
              </div>
            ))}
          </div>
          <Link href={`/${cat.slug}`} style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy)', letterSpacing: '0.5px', borderBottom: '1px solid var(--gold)', paddingBottom: '2px', textDecoration: 'none' }}>
            ← See all {cat.label} products
          </Link>
        </div>

        <div style={{ background: 'linear-gradient(140deg,var(--navy) 0%,var(--navy3) 100%)', borderRadius: '20px', padding: '40px 34px' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '26px', fontWeight: '600', color: '#ffffff', marginBottom: '14px' }}>
            Get {brand.name} pricing today
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.7', marginBottom: '26px' }}>
            Call, WhatsApp, or visit our showroom for current stock and pricing on {brand.name}.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '26px' }}>
            <a href={STORES.panchkula.phoneHref} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(201,168,76,0.14)', color: 'var(--gold)', padding: '14px 20px', borderRadius: '10px', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>📞 Call — {STORES.panchkula.phone}</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#25D366', color: '#ffffff', padding: '14px 20px', borderRadius: '10px', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>💬 WhatsApp Us</a>
          </div>
          <GoldLine my={0} />
          <div style={{ paddingTop: '20px' }}>
            <Link href="/contact" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>Request a Quote</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
