import { Reveal, SiteImage, Counter } from '@/components/Interactive';
import { PageHero, GoldLine } from '@/components/Presentational';
import { STORES } from '@/lib/site';

export const metadata = {
  title: 'About Us — Garg Trading Company',
  description: "The story behind GT Building Solutions: how Garg Trading Company became Panchkula & Chandigarh's one-stop building materials showroom.",
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <PageHero tag="Our Story" title={'Building Trust,\nBuilding Futures.'} sub="From a single store to the region's most trusted one-stop building solutions provider." />
      <div style={{ padding: '72px var(--px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'start' }} className="grid-2">
        <Reveal>
          <div>
            <span className="section-tag">Who We Are</span>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '36px', fontWeight: '600', color: 'var(--navy)', marginBottom: '28px', lineHeight: '1.2' }}>
              The Region&rsquo;s Most Trusted One-Stop Building Partner
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--txt2)', lineHeight: '1.8', marginBottom: '22px' }}>
              Garg Trading Company was founded with a single, bold vision — to eliminate the chaos of coordinating with a dozen different vendors for a single construction or renovation project.
            </p>
            <p style={{ fontSize: '16px', color: 'var(--txt2)', lineHeight: '1.8', marginBottom: '22px' }}>
              Today, we carry 30+ of India&rsquo;s and the world&rsquo;s most trusted brands across 7 product categories. From the first nail to the final coat of paint — we supply it all.
            </p>
            <p style={{ fontSize: '16px', color: 'var(--txt2)', lineHeight: '1.8' }}>
              Our clients — architects, interior designers, builders, and homeowners — trust us for quality, availability, transparent pricing, and a level of service that makes complex projects feel simple.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <SiteImage src="client/gt-storefront-wide-1.jpg" alt="GT Building Solutions store front" h={360} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
            <SiteImage src="client/gt-office-wall-logo-1.jpg" alt="Panchkula store interior" h={180} />
            <SiteImage src="client/gujarat-tiles-interior-generated.png" alt="Chandigarh store interior" h={180} />
          </div>
        </Reveal>
      </div>

      <div style={{ padding: '0 var(--px) 72px' }}>
        {[
          { n: '30+', l: 'Premium Brand Partners' },
          { n: '7', l: 'Complete Product Categories' },
          { n: '2', l: 'Store Locations' },
          { n: '1000s', l: 'Projects Supplied Across the Region' },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '14px', padding: '26px 30px', display: 'flex', alignItems: 'center', gap: '22px', marginBottom: '14px' }}>
              <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '46px', fontWeight: '700', color: 'var(--gold)', lineHeight: '1', minWidth: '96px' }}>
                <Counter target={s.n} />
              </div>
              <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--navy)' }}>{s.l}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <div style={{ padding: '0 var(--px) 72px' }}>
        <Reveal><div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="section-tag">Our Brands</span>
          <h2 className="section-h">Two Entities. One Commitment.</h2>
        </div></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid-2">
          {[
            { code: 'GT', name: STORES.panchkula.name, desc: 'The flagship brand for hardware, adhesives, panels, paints, power tools, and complete building solutions.', addr: STORES.panchkula.fullAddress, ph: STORES.panchkula.phone, href: STORES.panchkula.phoneHref },
            { code: 'GS', name: STORES.chandigarh.name, desc: 'Specialized in premium tiles and sanitary ware. From designer floor and wall tiles to complete bathroom solutions.', addr: STORES.chandigarh.fullAddress, ph: STORES.chandigarh.phone, href: STORES.chandigarh.phoneHref },
          ].map((e, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ background: 'linear-gradient(140deg,var(--navy) 0%,var(--navy3) 100%)', borderRadius: '20px', padding: '52px 46px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-28px', right: '-28px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(201,168,76,0.05)', pointerEvents: 'none' }} />
                <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '58px', fontWeight: '700', color: 'var(--gold)', lineHeight: '1', marginBottom: '14px', opacity: '0.2' }}>{e.code}</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '26px', fontWeight: '600', color: '#ffffff', marginBottom: '18px', lineHeight: '1.2' }}>{e.name}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.52)', lineHeight: '1.72', marginBottom: '28px' }}>{e.desc}</p>
                <GoldLine my={0} />
                <div style={{ paddingTop: '22px' }}>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.55', marginBottom: '10px' }}>📍 {e.addr}</div>
                  <a href={e.href} style={{ color: 'var(--gold)', fontSize: '15px', fontWeight: '600', textDecoration: 'none' }}>📞 {e.ph}</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 var(--px) 80px' }}>
        <Reveal><div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="section-tag">What We Stand For</span>
          <h2 className="section-h">Our Core Values</h2>
        </div></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }} className="grid-3">
          {[
            { t: 'Quality First', d: 'We only stock brands we trust completely. Every product must meet the standard we would use in our own homes.' },
            { t: 'Customer Centricity', d: 'Your project timeline is our priority. Expert specification guidance ensures you make the right decisions every time.' },
            { t: 'Integrity Always', d: 'Transparent pricing, honest advice, genuine products. No shortcuts, no substitutions, no surprises.' },
          ].map((v, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '16px', padding: '40px 32px', borderTop: '3px solid var(--gold)' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '24px', fontWeight: '600', color: 'var(--navy)', marginBottom: '14px' }}>{v.t}</h3>
                <p style={{ fontSize: '14px', color: 'var(--txt2)', lineHeight: '1.7' }}>{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
