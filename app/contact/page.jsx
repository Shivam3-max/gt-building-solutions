import { PageHero } from '@/components/Presentational';
import { SiteImage } from '@/components/Interactive';
import ContactForm from '@/components/ContactForm';
import TrackedLink from '@/components/TrackedLink';
import { STORES, WHATSAPP_LINK } from '@/lib/site';

export const metadata = {
  title: 'Contact Us — Panchkula & Chandigarh',
  description: 'Get in touch with GT Building Solutions — call, WhatsApp, or visit our Panchkula & Chandigarh showrooms for pricing and product availability.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const stores = [
    { tag: STORES.panchkula.tag, name: `${STORES.panchkula.city} Store`, addr: `${STORES.panchkula.street}\n${STORES.panchkula.city}, ${STORES.panchkula.region} ${STORES.panchkula.postalCode}`, ph: STORES.panchkula.phone, href: STORES.panchkula.phoneHref, mapQuery: STORES.panchkula.fullAddress },
    { tag: STORES.chandigarh.tag, name: `${STORES.chandigarh.city} Store`, addr: `${STORES.chandigarh.street}\n${STORES.chandigarh.city}`, ph: STORES.chandigarh.phone, href: STORES.chandigarh.phoneHref, mapQuery: STORES.chandigarh.fullAddress },
  ];

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <PageHero tag="Get In Touch" title={"Let's Build Something\nTogether."} />
      <div style={{ padding: '64px var(--px) 80px', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '56px', alignItems: 'start' }} className="grid-2">
        <div>
          {stores.map((l, i) => (
            <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '16px', padding: '34px 32px', marginBottom: '16px' }}>
              <div style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px' }}>{l.tag}</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '22px', fontWeight: '600', color: 'var(--navy)', marginBottom: '12px' }}>{l.name}</h2>
              <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: '1.6', marginBottom: '14px', whiteSpace: 'pre-line' }}>📍 {l.addr}</p>
              <TrackedLink href={l.href} event="phone_click" eventParams={{ location: `contact_page_${l.tag}` }} style={{ fontSize: '15px', fontWeight: '600', color: 'var(--navy)', textDecoration: 'none', display: 'block', marginBottom: '18px' }}>📞 {l.ph}</TrackedLink>
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', height: '220px' }}>
                <iframe
                  title={`Map of ${l.name}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(l.mapQuery)}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          ))}
          <div style={{ background: 'var(--navy)', borderRadius: '16px', padding: '34px 32px' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '22px', fontWeight: '600', color: '#ffffff', marginBottom: '20px' }}>Quick Connect</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <TrackedLink href={WHATSAPP_LINK} event="whatsapp_click" eventParams={{ location: 'contact_page_quick_connect' }} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#25D366', color: '#ffffff', padding: '14px 20px', borderRadius: '10px', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>💬 WhatsApp — {STORES.panchkula.phone}</TrackedLink>
              <TrackedLink href={STORES.chandigarh.phoneHref} event="phone_click" eventParams={{ location: 'contact_page_quick_connect' }} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(201,168,76,0.14)', color: 'var(--gold)', padding: '14px 20px', borderRadius: '10px', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>📞 Call — {STORES.chandigarh.phone}</TrackedLink>
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <SiteImage src="client/gt-storefront-wide-2.jpg" alt="GT Building Solutions store front" h={200} />
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
