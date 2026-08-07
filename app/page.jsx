import Link from 'next/link';
import {
  Reveal, SiteImage, HeroTicker, HeroBackgroundVideo, ScrollIndicator, BrandMarquee, CatCard, WhyCard, WhoWeServeCard,
} from '@/components/Interactive';
import FAQSection from '@/components/FAQSection';
import JsonLd from '@/components/JsonLd';
import { CATEGORIES } from '@/data/categories';
import { HOME_FAQS } from '@/data/faqs';
import { STORES, WHATSAPP_LINK } from '@/lib/site';
import { organizationNode, storeNode, faqPageSchema, graph } from '@/lib/schema';

export const metadata = {
  alternates: { canonical: '/' },
};

const homeSchema = graph(
  organizationNode(),
  storeNode('panchkula'),
  storeNode('chandigarh'),
  faqPageSchema(HOME_FAQS),
);

const HOME_GALLERY_IMAGES = [
  { src: 'client/gt-storefront-wide-1.jpg', label: 'Showroom Exterior' },
  { src: 'kitchen-fittings.jpg', label: 'Kitchen Hardware Display' },
  { src: 'bathroom.jpg', label: 'Bathroom Display' },
];

const WHY_ITEMS = [
  { i: '✦', t: 'Trusted Premium Brands', d: '30+ industry-leading brands. Every product is genuine, certified, and sourced directly from manufacturers. No grey market, no compromise.' },
  { i: '◈', t: 'Single Vendor Convenience', d: 'One supplier for your entire project. Save time, cut coordination overhead, streamline logistics, and have one point of accountability.' },
  { i: '▣', t: 'Project & Bulk Supply', d: 'Contractor-grade bulk supply with priority stock allocation, dedicated account managers, project pricing, and scheduled deliveries.' },
  { i: '⏱', t: 'Time Saving & Reliable', d: 'Ready inventory ensures your project never waits on materials. We deliver when you need it, every time, without delays.' },
  { i: '₹', t: 'Competitive Pricing', d: 'Direct dealerships mean zero middleman markups. Best rates across the board for retail and bulk alike, with transparent quotations.' },
  { i: '◎', t: 'Dedicated Expert Support', d: 'Product guidance, specification advice, free consultations, and after-sales support on every order — from a team that understands construction.' },
];

const WHO_WE_SERVE = [
  { emoji: '🏗', role: 'Architects', desc: 'Specify premium materials with confidence' },
  { emoji: '🎨', role: 'Interior Designers', desc: 'Source all finishes from one trusted partner' },
  { emoji: '🏢', role: 'Builders', desc: 'Reliable bulk supply on tight timelines' },
  { emoji: '🔧', role: 'Contractors', desc: 'Competitive pricing on every project' },
  { emoji: '🍳', role: 'Kitchen Dealers', desc: 'Full modular hardware range always in stock' },
];

export default function HomePage() {
  return (
    <div>
      <JsonLd data={homeSchema} />
      {/* VIDEO HERO */}
      <section style={{
        minHeight: '100svh', height: '100svh', background: '#060C1C',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        paddingTop: '88px', paddingBottom: '24px', position: 'relative', overflow: 'hidden',
      }}>
        <HeroBackgroundVideo />
        <div className="hero-scrim-h" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(6,12,28,0.55) 0%,rgba(6,12,28,0.4) 42%,rgba(6,12,28,0.28) 100%)', zIndex: 1 }} />
        <div className="hero-scrim-v" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(6,12,28,0.1) 0%,rgba(6,12,28,0.14) 36%,rgba(6,12,28,0.5) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.03) 1px,transparent 1px)', backgroundSize: '64px 64px', pointerEvents: 'none', zIndex: 2 }} />
        <div style={{ position: 'absolute', top: '12%', right: '-120px', width: '480px', height: '480px', border: '1px solid rgba(201,168,76,0.12)', borderRadius: '50%', pointerEvents: 'none', zIndex: 2 }} />
        <div style={{ position: 'absolute', bottom: '8%', right: '16%', width: '180px', height: '180px', background: 'radial-gradient(circle,rgba(201,168,76,0.18) 0%,rgba(201,168,76,0) 70%)', pointerEvents: 'none', zIndex: 2 }} />

        <div className="hero-pad" style={{ position: 'relative', zIndex: 5, padding: '0 var(--px) 36px', maxWidth: '1280px', margin: '0 auto', width: '100%', flex: '1 1 auto', display: 'flex', alignItems: 'center' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.12fr) minmax(300px,0.7fr)', gap: '28px', alignItems: 'center' }}>
            <div className="hero-content-copy" style={{ maxWidth: '760px' }}>
              <HeroTicker />
              <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2.6px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)', marginBottom: '20px' }}>
                Panchkula and Chandigarh&rsquo;s trusted material partner
              </div>
              <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontWeight: '300', color: '#ffffff', fontSize: 'clamp(38px,5.6vw,78px)', lineHeight: '0.94', marginBottom: '14px' }}>
                Build faster with
                <span style={{ display: 'block', fontWeight: '700', fontStyle: 'italic', background: 'linear-gradient(135deg,var(--gold) 0%,#F5E3A8 45%,var(--gold3) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  one powerful supply partner.
                </span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.76)', fontSize: '16px', fontWeight: '300', maxWidth: '560px', lineHeight: '1.6', marginBottom: '20px' }}>
                Hardware, tiles, paints, panels, pipes, adhesives, and tools from 30+ premium brands, all sourced through one dependable team for retail, renovation, and large project supply.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '18px' }}>
                <Link href="/contact" className="btn-gold">Plan My Requirement</Link>
                <Link href="/products" className="btn-ghost">Browse Categories</Link>
                <Link href="/gallery" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '6px', padding: '14px 28px', fontSize: '12px', fontWeight: '500', fontFamily: 'DM Sans,sans-serif', letterSpacing: '1.2px', textTransform: 'uppercase', backdropFilter: 'blur(12px)', textDecoration: 'none' }}>
                  View Showroom
                </Link>
              </div>
              <div className="hero-proof" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {[
                  'Single point for supply, advice, and delivery',
                  'Premium stock for homes, interiors, and site work',
                  'Support for both walk-in buyers and project teams',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '9px 14px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.82)', fontSize: '11px', backdropFilter: 'blur(12px)' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
              <div className="hero-mobile-stats" style={{ display: 'none', gap: '20px', marginTop: '18px' }}>
                {[{ n: '30+', l: 'Brands' }, { n: '7', l: 'Categories' }, { n: '2', l: 'Stores' }].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '22px', fontWeight: '700', color: '#ffffff', lineHeight: '1' }}>{s.n}</div>
                    <div style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.54)', marginTop: '3px' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-panel" style={{ justifySelf: 'end', width: '100%', maxWidth: '360px', background: 'linear-gradient(180deg,rgba(255,255,255,0.14) 0%,rgba(255,255,255,0.08) 100%)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '28px', padding: '20px', backdropFilter: 'blur(18px)', boxShadow: '0 20px 80px rgba(5,10,24,0.35)' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '14px' }}>What we supply</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '10px', marginBottom: '20px' }}>
                {['Hardware fittings', 'Designer tiles', 'Paint systems', 'Power tools', 'Gypsum panels', 'Adhesives', 'Pipes and fittings', 'Sanitary ware'].map((item, i) => (
                  <div key={i} style={{ padding: '14px 12px', borderRadius: '16px', background: 'rgba(8,16,34,0.34)', border: '1px solid rgba(255,255,255,0.08)', color: '#ffffff', fontSize: '12px', lineHeight: '1.4' }}>{item}</div>
                ))}
              </div>
              <div style={{ paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.14)' }}>
                <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {[{ n: '30+', l: 'Brands' }, { n: '7', l: 'Categories' }, { n: '2', l: 'Stores' }].map((s, i) => (
                    <div key={i}>
                      <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '32px', fontWeight: '700', color: '#ffffff', lineHeight: '1' }}>{s.n}</div>
                      <div style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.54)', marginTop: '4px' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '13px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                  Visit our showrooms or share your BOQ and we will help you shortlist, quantify, and source the right mix for your project.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll"><ScrollIndicator /></div>
      </section>

      {/* BRAND BAND */}
      <section style={{ background: 'linear-gradient(180deg,#081024 0%, #0E1830 100%)', padding: '10px 0 18px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.025) 1px,transparent 1px)', backgroundSize: '54px 54px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', fontSize: '9px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.34)', marginBottom: '12px' }}>Trusted brand portfolio</div>
          <BrandMarquee />
        </div>
      </section>

      {/* STATS */}
      <section className="stats-pad" style={{ padding: '40px var(--px) 80px', background: 'var(--cream)' }}>
        <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(13,27,62,0.06)' }}>
          {[
            { n: '30+', l: 'Premium Brands', s: "India's finest names" },
            { n: '7', l: 'Product Categories', s: 'Complete ecosystem' },
            { n: '2', l: 'Store Locations', s: 'Panchkula & Chandigarh' },
            { n: '1000s', l: 'Projects Supplied', s: 'Across the region' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'var(--white)', padding: '44px 28px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '54px', fontWeight: '700', color: 'var(--navy)', lineHeight: '1', marginBottom: '8px' }}>{s.n}</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--navy)', marginBottom: '4px' }}>{s.l}</div>
              <div style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: '500', letterSpacing: '0.3px' }}>{s.s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="cats-pad" style={{ padding: '40px var(--px) 80px', background: 'var(--cream)' }}>
        <Reveal>
          <div style={{ marginBottom: '52px' }}>
            <span className="section-tag">What We Offer</span>
            <h2 className="section-h">Seven Categories.<br />One Destination.</h2>
          </div>
        </Reveal>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06} className={i === 0 ? 'span2-mobile' : ''} style={i === 0 ? { gridColumn: 'span 2' } : {}}>
              <CatCard cat={c} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="pad-bottom-only" style={{ padding: '0 var(--px) 80px', background: 'var(--cream)' }}>
        <Reveal>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '16px' }}>
            {HOME_GALLERY_IMAGES.map((item, i) => (
              <SiteImage key={i} src={item.src} alt={item.label} h={320} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* WHY GT */}
      <section className="pad-section" style={{ background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.03) 1px,transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="section-tag">The GT Advantage</span>
              <h2 className="section-h-light">Why Professionals Choose Us</h2>
            </div>
          </Reveal>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {WHY_ITEMS.map((item, i) => <WhyCard key={i} item={item} i={i} />)}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="pad-section" style={{ background: 'var(--cream)' }}>
        <Reveal><div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <span className="section-tag">Who We Serve</span>
          <h2 className="section-h">Our Ideal Partners</h2>
        </div></Reveal>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '14px' }}>
          {WHO_WE_SERVE.map((p, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <WhoWeServeCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* DUAL BRAND */}
      <section className="pad-bottom-only" style={{ padding: '0 var(--px) 80px', background: 'var(--cream)' }}>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {[
            { code: 'GT', name: STORES.panchkula.name, desc: 'The flagship brand for hardware, adhesives, panels, paints, tools, and complete building solutions. Your single point of contact for any construction project.', addr: STORES.panchkula.fullAddress, ph: STORES.panchkula.phone, href: STORES.panchkula.phoneHref },
            { code: 'GS', name: STORES.chandigarh.name, desc: 'Specialized in premium tiles and sanitary ware. Designer tiles, bathroom solutions, and surface finishes curated for architects and discerning homeowners.', addr: STORES.chandigarh.fullAddress, ph: STORES.chandigarh.phone, href: STORES.chandigarh.phoneHref },
          ].map((e, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ background: 'linear-gradient(140deg,var(--navy) 0%,var(--navy3) 100%)', borderRadius: '20px', padding: '52px 46px', position: 'relative', overflow: 'hidden', height: '100%' }}>
                <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(201,168,76,0.05)', pointerEvents: 'none' }} />
                <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '60px', fontWeight: '700', color: 'var(--gold)', lineHeight: '1', marginBottom: '14px', opacity: '0.22' }}>{e.code}</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '26px', fontWeight: '600', color: '#ffffff', marginBottom: '18px', lineHeight: '1.2' }}>{e.name}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.54)', lineHeight: '1.72', marginBottom: '30px' }}>{e.desc}</p>
                <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,var(--gold),transparent)' }} />
                <div style={{ paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.55' }}>📍 {e.addr}</div>
                  <a href={e.href} style={{ color: 'var(--gold)', fontSize: '15px', fontWeight: '600', textDecoration: 'none' }}>📞 {e.ph}</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={HOME_FAQS} title="Frequently Asked Questions" />

      {/* CTA STRIP */}
      <section className="pad-section" style={{ background: 'linear-gradient(135deg,var(--gold) 0%,var(--gold3) 55%,var(--gold) 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(13,27,62,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(13,27,62,0.06) 1px,transparent 1px)', backgroundSize: '38px 38px', pointerEvents: 'none' }} />
        <Reveal>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontWeight: '700', color: 'var(--navy)', fontSize: 'clamp(34px,5vw,62px)', lineHeight: '1.08', marginBottom: '20px' }}>
              Ready to Build Something<br />Remarkable?
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(13,27,62,0.65)', marginBottom: '44px', maxWidth: '480px', margin: '0 auto 44px', lineHeight: '1.65' }}>
              Visit our stores or call for a free consultation. We&rsquo;ll help you source everything your project needs.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={STORES.panchkula.phoneHref} style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: 'var(--navy)', color: 'var(--gold)', padding: '15px 38px', borderRadius: '6px', fontWeight: '600', fontSize: '12px', letterSpacing: '1.2px', textDecoration: 'none', textTransform: 'uppercase' }}>
                📞 Call Now
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: '#25D366', color: '#ffffff', padding: '15px 38px', borderRadius: '6px', fontWeight: '600', fontSize: '12px', letterSpacing: '1.2px', textDecoration: 'none', textTransform: 'uppercase' }}>
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
