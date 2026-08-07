import Link from 'next/link';
import { CompanyLogo } from './Presentational';
import { CATEGORIES } from '@/data/categories';
import { LOCALITIES } from '@/data/localities';
import { STORES, WHATSAPP_LINK, SOCIAL_LINKS } from '@/lib/site';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Brands', href: '/brands' },
  { label: 'Locations', href: '/locations' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Calculators', href: '/calculators' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const SocialIcon = ({ id }) => {
  if (id === 'facebook') return <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M13.5 21v-7.7h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46h1.6V4.14C15.94 4.1 15.06 4 14.02 4c-2.16 0-3.64 1.32-3.64 3.74V10.3H8v3h2.38V21h3.12z"/></svg>;
  if (id === 'instagram') return <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.35" cy="6.65" r="1.1" fill="currentColor" stroke="none"/></svg>;
  return <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.33 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.24c-.24.68-1.4 1.3-1.93 1.37-.5.07-1.13.1-1.82-.12-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.29.58-.36.77-.36h.55c.18 0 .42-.07.65.5.24.58.82 2 .89 2.15.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.07.95 1.96 1.25 2.24 1.39.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.26.36-.22.6-.13.24.09 1.55.73 1.82.86.26.13.44.19.5.3.07.11.07.62-.17 1.3Z"/></svg>;
};

export default function Footer() {
  const socialEntries = Object.entries(SOCIAL_LINKS).filter(([, href]) => href);
  return (
    <footer className="bg-[#070D1C] px-5 md:px-20 pt-14 pb-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-10 mb-12">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-5">
            <CompanyLogo size={48} ringColor="rgba(201,168,76,0.32)" shadow="0 12px 28px rgba(0,0,0,0.24)" />
            <div>
              <div className="text-white font-serif text-[15px] font-bold">Garg Trading Company</div>
              <div className="text-[9px] tracking-[2.5px] text-gold uppercase">Building Solutions</div>
            </div>
          </Link>
          <p className="text-[13px] leading-relaxed max-w-[270px] text-white/40 mb-6">
            Panchkula &amp; Chandigarh&rsquo;s premier one-stop supplier for all building and hardware materials, also serving Zirakpur and Mohali.
          </p>
          {socialEntries.length > 0 && (
            <div className="flex gap-2">
              {socialEntries.map(([id, href]) => (
                <a key={id} href={href} aria-label={id} target="_blank" rel="noopener noreferrer"
                  className="w-[34px] h-[34px] border border-gold/20 rounded-lg flex items-center justify-center text-gold hover:bg-gold/10 hover:border-gold transition-all">
                  <SocialIcon id={id} />
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="text-white text-[11px] font-semibold tracking-[2px] uppercase mb-5">Navigate</div>
          {NAV_ITEMS.map((p) => (
            <Link key={p.href} href={p.href} className="block text-[13px] mb-3 text-white/40 hover:text-gold transition-colors">{p.label}</Link>
          ))}
        </div>
        <div>
          <div className="text-white text-[11px] font-semibold tracking-[2px] uppercase mb-5">Categories</div>
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={`/${c.slug}`} className="block text-[13px] mb-3 text-white/40 hover:text-gold transition-colors">{c.label.split(' ')[0]}</Link>
          ))}
        </div>
        <div>
          <div className="text-white text-[11px] font-semibold tracking-[2px] uppercase mb-5">Our Stores</div>
          <div className="text-[13px] mb-5 text-white/40 leading-relaxed">
            <div className="text-gold font-semibold mb-1">{STORES.panchkula.city}</div>
            {STORES.panchkula.street},<br />{STORES.panchkula.city}, {STORES.panchkula.region} {STORES.panchkula.postalCode}<br />
            <a href={STORES.panchkula.phoneHref} className="text-gold no-underline font-medium">{STORES.panchkula.phone}</a>
          </div>
          <div className="text-[13px] text-white/40 leading-relaxed">
            <div className="text-gold font-semibold mb-1">{STORES.chandigarh.city}</div>
            {STORES.chandigarh.street},<br />{STORES.chandigarh.city}<br />
            <a href={STORES.chandigarh.phoneHref} className="text-gold no-underline font-medium">{STORES.chandigarh.phone}</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gold/10 pt-6 flex flex-wrap justify-between items-center gap-3 text-[11px] text-white/25">
        <span>© {new Date().getFullYear()} Garg Trading Company. All rights reserved.</span>
        <span className="text-gold/50">One Stop Hardware &amp; Building Solutions</span>
      </div>
    </footer>
  );
}
