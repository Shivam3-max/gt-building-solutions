'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CompanyLogo } from './Presentational';
import { CATEGORIES } from '@/data/categories';
import { LOCALITIES } from '@/data/localities';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products', dropdown: CATEGORIES.map((c) => ({ label: c.label, href: `/${c.slug}` })) },
  { label: 'Brands', href: '/brands' },
  { label: 'Locations', href: '/locations', dropdown: LOCALITIES.map((l) => ({ label: l.city, href: `/locations/${l.slug}` })) },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Calculators', href: '/calculators' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));
  const dark = scrolled || mobileOpen;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 px-5 md:px-10 ${dark ? 'py-3 bg-cream/97 backdrop-blur-xl border-b border-gold/20' : 'py-5 bg-transparent'}`}>
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <CompanyLogo size={44} ringColor={dark ? 'rgba(13,27,62,0.14)' : 'rgba(255,255,255,0.24)'} shadow={dark ? '0 10px 20px rgba(7,13,28,0.12)' : '0 10px 24px rgba(7,13,28,0.22)'} />
          <div>
            <div className={`font-serif text-[15px] font-bold leading-tight tracking-wide ${dark ? 'text-navy' : 'text-white'}`}>GARG TRADING CO.</div>
            <div className="text-[9px] font-semibold text-gold tracking-[2.5px] uppercase">Building Solutions</div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <div key={l.label} className="relative group">
              <Link
                href={l.href}
                className={`inline-block px-3 py-2 text-[12px] font-medium tracking-wide uppercase border-b-2 transition-colors ${
                  isActive(l.href) ? 'text-gold border-gold' : `border-transparent ${dark ? 'text-navy hover:text-navy' : 'text-white/85 hover:text-white'}`
                }`}
              >
                {l.label}
              </Link>
              {l.dropdown && (
                <div className="absolute left-0 top-full pt-2 hidden group-hover:block min-w-[220px]">
                  <div className="bg-white border border-border rounded-xl shadow-xl py-2 overflow-hidden">
                    {l.dropdown.map((d) => (
                      <Link key={d.href} href={d.href} className="block px-4 py-2 text-[13px] text-navy hover:bg-gold-pale hover:text-gold transition-colors">
                        {d.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link href="/contact" className="btn-gold ml-4" style={{ padding: '10px 22px', fontSize: '11px' }}>Get Quote</Link>
        </div>

        <button
          className="lg:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className={`block w-6 h-0.5 rounded transition-all ${dark ? 'bg-navy' : 'bg-white'} ${
              mobileOpen && i === 0 ? 'rotate-45 translate-y-[7px]' : mobileOpen && i === 1 ? 'scale-x-0' : mobileOpen && i === 2 ? '-rotate-45 -translate-y-[7px]' : ''
            }`} />
          ))}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden pt-4 pb-5">
          {LINKS.map((l) => (
            <div key={l.label} className="border-b border-border">
              <div className="flex items-center justify-between">
                <Link href={l.href} onClick={() => setMobileOpen(false)} className={`block flex-1 py-3 text-[14px] font-medium tracking-wide uppercase ${isActive(l.href) ? 'text-gold' : 'text-navy'}`}>
                  {l.label}
                </Link>
                {l.dropdown && (
                  <button
                    className="px-3 py-3 text-navy/60"
                    onClick={() => setOpenMobileSection((s) => (s === l.label ? null : l.label))}
                    aria-label={`Toggle ${l.label} submenu`}
                  >
                    {openMobileSection === l.label ? '−' : '+'}
                  </button>
                )}
              </div>
              {l.dropdown && openMobileSection === l.label && (
                <div className="pb-3 pl-3 flex flex-col gap-2">
                  {l.dropdown.map((d) => (
                    <Link key={d.href} href={d.href} onClick={() => setMobileOpen(false)} className="text-[13px] text-txt2">
                      {d.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-gold w-full justify-center mt-4" style={{ padding: '14px' }}>Get Quote</Link>
        </div>
      )}
    </nav>
  );
}
