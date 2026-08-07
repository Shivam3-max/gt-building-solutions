import Link from 'next/link';
import { Reveal, SiteImage, BrandLogo } from '@/components/Interactive';
import { GoldLine } from '@/components/Presentational';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import { getBrandsByCategory } from '@/data/brands';
import { WHATSAPP_LINK } from '@/lib/site';
import { breadcrumbSchema, faqPageSchema, graph } from '@/lib/schema';

export default function CategoryTemplate({ cat }) {
  const brands = getBrandsByCategory(cat.id);
  const schema = graph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
      { name: cat.label, path: `/${cat.slug}` },
    ]),
    ...(cat.faqs && cat.faqs.length ? [faqPageSchema(cat.faqs)] : []),
  );
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <JsonLd data={schema} />
      <div style={{ background: `linear-gradient(158deg,${cat.color}ee 0%,${cat.color} 60%,${cat.color}dd 100%)`, padding: '100px var(--px) 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }} />
        <nav aria-label="Breadcrumb" style={{ position: 'relative', zIndex: 2, marginBottom: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link href="/products" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Products</Link>
          {' / '}
          <span style={{ color: '#ffffff' }}>{cat.label}</span>
        </nav>
        <div style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="grid-2">
          <div>
            <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.12)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '20px' }}>{cat.icon}</div>
            <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '14px' }}>Product Category</span>
            <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontWeight: '600', fontSize: 'clamp(36px,5.5vw,68px)', color: '#ffffff', lineHeight: '1.1', marginBottom: '20px' }}>
              {cat.label}
            </h1>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', maxWidth: '500px' }}>{cat.desc}</p>
          </div>
          <div>
            <SiteImage src={cat.heroImage} alt={cat.label} h={340} radius={20} />
          </div>
        </div>
      </div>

      <div style={{ padding: '64px var(--px) 0' }}>
        <p style={{ fontSize: '15px', color: 'var(--txt2)', lineHeight: '1.85', maxWidth: '900px' }}>{cat.longDesc}</p>
      </div>

      <div style={{ padding: '48px var(--px) 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }} className="grid-2">
        <div>
          <span className="section-tag">What We Stock</span>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '36px', fontWeight: '600', color: 'var(--navy)', marginBottom: '28px', lineHeight: '1.2' }}>Product Range</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {cat.products.map((p, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px 22px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', color: 'var(--navy)', fontWeight: '500' }}>{p}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <span className="section-tag">Brands We Carry</span>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '36px', fontWeight: '600', color: 'var(--navy)', marginBottom: '28px', lineHeight: '1.2' }}>Our Brand Partners</h2>
          {brands.map((b, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <Link href={`/brands/${b.slug}`} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px 30px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '20px', textDecoration: 'none' }}>
                <div style={{ width: '82px', flexShrink: 0 }}>
                  <BrandLogo name={b.name} h={52} radius={12} />
                </div>
                <div>
                  <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '20px', fontWeight: '600', color: 'var(--navy)', marginBottom: '4px' }}>{b.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--txt3)', fontWeight: '500', letterSpacing: '0.5px' }}>In Stock at GT →</div>
                </div>
              </Link>
            </Reveal>
          ))}
          <Link href="/contact" className="btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: '8px', padding: '15px' }}>
            Get a Quote for This Category
          </Link>
        </div>
      </div>

      <div style={{ padding: '0 var(--px) 80px' }}>
        <span className="section-tag">Gallery</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginTop: '16px' }} className="grid-3">
          {(cat.galleryImages || []).map((item, i) => (
            <SiteImage key={i} src={item.src} alt={item.label} h={220} />
          ))}
        </div>
      </div>

      <FAQSection faqs={cat.faqs} title={`${cat.label} — Frequently Asked Questions`} />

      <div style={{ padding: '0 var(--px) 80px' }}>
        <div style={{ background: 'linear-gradient(135deg,var(--navy) 0%,var(--navy3) 100%)', borderRadius: '20px', padding: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '32px', fontWeight: '600', color: '#ffffff', marginBottom: '12px' }}>Need Bulk Supply or Project Pricing?</h3>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6' }}>
              Contact us with your project details and get a custom quote within hours.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-gold">Get Quote</Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#25D366', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '14px 28px', fontSize: '12px', fontWeight: '600', fontFamily: 'DM Sans,sans-serif', letterSpacing: '1.2px', textTransform: 'uppercase', textDecoration: 'none' }}>💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}
