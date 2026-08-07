'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { assetPath, brandLogoPath } from '@/lib/site';
import { BRANDS } from '@/data/brands';
import { catColorMap, getCategoryById } from '@/data/categories';
import { ImgPlaceholder } from './Presentational';

export const useInView = (threshold = 0.08) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) { setInView(true); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold, rootMargin: '0px 0px 80px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

export const Counter = ({ target, suffix = '', duration = 1800 }) => {
  const [ref, inView] = useInView(0.3);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const isNum = !isNaN(parseInt(target));
    if (!isNum) { setVal(target); return; }
    const end = parseInt(target.replace(/\D/g, ''));
    const step = Math.ceil(end / 60);
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + step, end);
      setVal(cur);
      if (cur >= end) clearInterval(t);
    }, duration / 60);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  const display = typeof val === 'number' && val > 0 ? val + (target.includes('+') ? ('+') : '') : target;
  return <span ref={ref}>{display}{suffix}</span>;
};

export const Reveal = ({ children, delay = 0, dir = 'up', style = {}, className = '' }) => {
  const [ref, inView] = useInView(0.1);
  const transforms = { up: 'translateY(40px)', down: 'translateY(-40px)', left: 'translateX(-40px)', right: 'translateX(40px)' };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : transforms[dir] || transforms.up,
      transition: `opacity 0.7s ${delay}s cubic-bezier(.22,.68,0,1.1), transform 0.7s ${delay}s cubic-bezier(.22,.68,0,1.1)`,
      ...style,
    }}>{children}</div>
  );
};

export const SiteImage = ({ src, alt, h = 280, radius = 16, fit = 'cover', style = {} }) => {
  const [broken, setBroken] = useState(false);
  if (!src || broken) return <ImgPlaceholder h={h} label={alt} radius={radius} />;
  return (
    <img
      src={assetPath(src)}
      alt={alt}
      loading="lazy"
      onError={() => setBroken(true)}
      style={{
        display: 'block', width: '100%', height: `${h}px`, objectFit: fit,
        borderRadius: `${radius}px`, background: '#e8e4dc', ...style,
      }}
    />
  );
};

export const BrandLogo = ({ name, h = 64, radius = 14, style = {} }) => {
  const brand = BRANDS.find((b) => b.name === name);
  const [broken, setBroken] = useState(false);
  if (!brand?.logo || broken) {
    return (
      <div style={{
        width: '100%', height: `${h}px`, borderRadius: `${radius}px`, flexShrink: 0,
        background: `linear-gradient(135deg,${catColorMap[brand?.cat] || 'var(--navy)'} 0%,${catColorMap[brand?.cat] || 'var(--navy)'}bb 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--gold)', fontFamily: 'Cormorant Garamond,serif',
        fontSize: '16px', fontWeight: '700', letterSpacing: '0.8px',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        ...style,
      }}>{name.slice(0, 2).toUpperCase()}</div>
    );
  }
  return (
    <div style={{
      width: '100%', height: `${h}px`, borderRadius: `${radius}px`,
      background: 'linear-gradient(180deg,#ffffff 0%,#f8f7f3 100%)',
      border: '1px solid rgba(13,27,62,0.08)',
      boxShadow: '0 10px 28px rgba(13,27,62,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      ...style,
    }}>
      <img
        src={brandLogoPath(brand.logo)}
        alt={`${name} logo`}
        loading="lazy"
        onError={() => setBroken(true)}
        style={{
          display: 'block', width: brand.logoScale || '82%', height: '72%',
          objectFit: 'contain', filter: 'drop-shadow(0 1px 1px rgba(13,27,62,0.05))',
        }}
      />
    </div>
  );
};

/* ─── HERO CANVAS (mouse-reactive) ───────────────────────── */
export const HeroCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf, W, H;
    const mouse = { x: -9999, y: -9999 };
    const GOLD = 'rgba(201,168,76,';
    const WHITE = 'rgba(255,255,255,';
    let nodes = [];

    const mkNode = () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2.2 + 0.6,
      gold: Math.random() > 0.65,
      opacity: Math.random() * 0.55 + 0.12,
      ox: 0, oy: 0,
    });

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      nodes = Array.from({ length: 58 }, mkNode);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.parentElement.addEventListener('mousemove', onMove);
    canvas.parentElement.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach((n) => {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120 * 0.8;
          n.ox += (dx / dist) * force;
          n.oy += (dy / dist) * force;
        }
        n.ox *= 0.92; n.oy *= 0.92;
        n.x += n.vx + n.ox; n.y += n.vy + n.oy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            const a = (1 - d / 140) * 0.16;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = nodes[i].gold ? GOLD + a + ')' : WHITE + a + ')';
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = GOLD + ((1 - dist / 160) * 0.18) + ')';
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.gold ? GOLD + n.opacity + ')' : WHITE + (n.opacity * 0.55) + ')';
        ctx.fill();
      });
      nodes.filter((_, i) => i % 9 === 0).forEach((n) => {
        ctx.beginPath();
        ctx.moveTo(n.x - 10, n.y); ctx.lineTo(n.x + 10, n.y);
        ctx.moveTo(n.x, n.y - 10); ctx.lineTo(n.x, n.y + 10);
        ctx.strokeStyle = GOLD + '0.1)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return (
    <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />
  );
};

export const ScrollIndicator = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY < 80);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div style={{
      position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 7, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
      opacity: visible ? 1 : 0, transition: 'opacity 0.4s',
    }}>
      <span style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Scroll</span>
      <div style={{ width: '1px', height: '40px', position: 'relative', overflow: 'hidden', background: 'rgba(255,255,255,0.12)' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%',
          background: 'linear-gradient(to bottom,transparent,var(--gold),transparent)',
          animation: 'scrollDot 1.6s ease-in-out infinite', height: '50%',
        }} />
      </div>
    </div>
  );
};

export const HeroTicker = () => {
  const items = ['30+ Premium Brands', '7 Product Categories', 'Panchkula & Chandigarh', 'Hardware · Tiles · Paints', 'Free Consultation Available', 'Project & Bulk Supply'];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '14px',
      background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.22)',
      borderRadius: '100px', padding: '8px 20px 8px 12px', marginBottom: '36px',
      animation: 'fadeUp 0.6s ease both',
    }}>
      <div style={{
        background: 'linear-gradient(135deg,var(--gold),var(--gold3))', borderRadius: '100px', padding: '4px 10px',
        fontSize: '9px', fontWeight: '700', color: 'var(--navy)', letterSpacing: '1.5px', textTransform: 'uppercase', flexShrink: 0,
      }}>Live</div>
      <span style={{ color: 'var(--gold)', fontSize: '10px', fontWeight: '600', letterSpacing: '1.8px', textTransform: 'uppercase', transition: 'opacity 0.3s' }} key={idx}>{items[idx]}</span>
    </div>
  );
};

const shouldSkipHeroVideo = () => {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn) {
    if (conn.saveData) return true;
    if (conn.effectiveType && /2g|3g/.test(conn.effectiveType)) return true;
  }
  return false;
};

export const HERO_VIDEOS = {
  desktop: 'client/desktop.mp4',
  mobile: 'client/phone.mp4',
  fallback: 'client/hero-poster.jpg',
};

export const HeroBackgroundVideo = () => {
  const [mobile, setMobile] = useState(false);
  const [ready, setReady] = useState(false);
  const [skipVideo, setSkipVideo] = useState(false);
  useEffect(() => {
    setSkipVideo(shouldSkipHeroVideo());
    const media = window.matchMedia('(max-width: 768px)');
    const sync = (event) => setMobile(event.matches);
    sync(media);
    if (media.addEventListener) {
      media.addEventListener('change', sync);
      return () => media.removeEventListener('change', sync);
    }
    media.addListener(sync);
    return () => media.removeListener(sync);
  }, []);
  const src = mobile ? HERO_VIDEOS.mobile : HERO_VIDEOS.desktop;
  useEffect(() => setReady(false), [src]);
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("${assetPath(HERO_VIDEOS.fallback)}")`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: ready ? 0 : 1, transition: 'opacity 0.35s ease',
      }} />
      {!skipVideo && (
        <video
          key={src}
          autoPlay muted loop playsInline preload="metadata"
          poster={assetPath(HERO_VIDEOS.fallback)}
          onCanPlay={() => setReady(true)}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: ready ? 1 : 0, transition: 'opacity 0.35s ease',
            willChange: 'opacity', backfaceVisibility: 'hidden', pointerEvents: 'none',
          }}
        >
          <source src={assetPath(src)} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export const BrandMarquee = () => {
  const names = BRANDS.map((b) => b.name);
  const r1 = [...names.slice(0, 14), ...names.slice(0, 14)];
  const r2 = [...names.slice(13), ...names.slice(13)];
  const pill = (name, i) => (
    <span key={i} style={{
      display: 'inline-flex', alignItems: 'center', gap: '9px',
      padding: '9px 26px', margin: '0 6px',
      background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(201,168,76,0.2)',
      borderRadius: '100px', whiteSpace: 'nowrap', color: 'rgba(255,255,255,0.78)',
      fontSize: '13px', fontWeight: '500', letterSpacing: '0.3px',
      backdropFilter: 'blur(8px)', transition: 'all 0.22s', cursor: 'default',
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(201,168,76,0.14)';
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)';
        e.currentTarget.style.color = 'var(--gold)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
        e.currentTarget.style.color = 'rgba(255,255,255,0.78)';
      }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
      {name}
    </span>
  );
  return (
    <div style={{ overflow: 'hidden', width: '100%', paddingBottom: '4px' }}>
      <div className="marqueeL" style={{ display: 'flex', width: 'max-content', marginBottom: '10px' }}>
        {r1.map((n, i) => pill(n, i))}
      </div>
      <div className="marqueeR" style={{ display: 'flex', width: 'max-content' }}>
        {r2.map((n, i) => pill(n, i))}
      </div>
    </div>
  );
};

export const CatCard = ({ cat }) => {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={`/${cat.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'block', background: 'var(--white)',
        border: `1px solid ${hov ? 'var(--gold)' : 'var(--border)'}`,
        borderRadius: '18px', padding: '36px 34px', cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
        transform: hov ? 'translateY(-6px)' : 'none',
        boxShadow: hov ? '0 24px 56px rgba(13,27,62,0.10)' : '0 2px 12px rgba(13,27,62,0.04)',
        transition: 'all 0.3s cubic-bezier(.22,.68,0,1.1)',
        textDecoration: 'none',
      }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg,transparent 40%,rgba(201,168,76,0.04) 50%,transparent 60%)',
        backgroundSize: '200% 100%', backgroundPosition: hov ? '100% 0' : '200% 0',
        transition: 'background-position 0.6s ease', pointerEvents: 'none',
      }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: 'linear-gradient(225deg,rgba(201,168,76,0.07) 0%,transparent 65%)', pointerEvents: 'none' }} />
      <div style={{
        width: '48px', height: '48px',
        background: hov ? `linear-gradient(135deg,${cat.color},${cat.color}bb)` : 'rgba(13,27,62,0.06)',
        borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '20px', marginBottom: '18px', transition: 'all 0.3s',
        transform: hov ? 'scale(1.1) rotate(-4deg)' : 'none',
      }}>{cat.icon}</div>
      <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '21px', fontWeight: '600', color: 'var(--navy)', marginBottom: '10px', lineHeight: '1.3' }}>{cat.label}</h3>
      <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: '1.65', marginBottom: '16px' }}>{cat.desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
        {cat.brands.map((b) => (
          <span key={b} style={{
            background: hov ? 'rgba(201,168,76,0.08)' : 'rgba(13,27,62,0.05)',
            border: `1px solid ${hov ? 'rgba(201,168,76,0.3)' : 'transparent'}`,
            borderRadius: '100px', padding: '4px 12px', fontSize: '11px',
            fontWeight: '500', color: 'var(--navy)', letterSpacing: '0.2px', transition: 'all 0.25s',
          }}>{b}</span>
        ))}
      </div>
      <div style={{
        maxHeight: hov ? '120px' : '0px', overflow: 'hidden',
        borderTop: hov ? '1px solid var(--border)' : '1px solid transparent',
        paddingTop: hov ? '14px' : '0', transition: 'all 0.35s ease',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {cat.products.slice(0, 4).map((p, i) => (
            <span key={i} style={{ fontSize: '10px', color: 'var(--txt3)', fontWeight: '500', letterSpacing: '0.3px', background: 'rgba(13,27,62,0.04)', borderRadius: '4px', padding: '3px 8px' }}>{p}</span>
          ))}
          {cat.products.length > 4 && <span style={{ fontSize: '10px', color: 'var(--gold)', fontWeight: '600' }}>+{cat.products.length - 4} more</span>}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px', fontSize: '11px', fontWeight: '700', color: hov ? 'var(--gold)' : 'var(--navy)', letterSpacing: '1.5px', textTransform: 'uppercase', transition: 'color 0.25s' }}>
        Explore Category
        <span style={{ transform: hov ? 'translateX(4px)' : 'none', transition: 'transform 0.25s' }}>→</span>
      </div>
    </Link>
  );
};

export const WhyCard = ({ item, i }) => {
  const [hov, setHov] = useState(false);
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: hov ? 'rgba(201,168,76,0.07)' : 'rgba(255,255,255,0.04)',
      border: `1px solid ${hov ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.12)'}`,
      borderRadius: '16px', padding: '36px 30px', transition: 'all 0.28s ease', cursor: 'default',
      opacity: inView ? 1 : 0, transform: inView ? 'none' : `translateY(30px)`, transitionDelay: `${i * 0.08}s`,
    }}>
      <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '30px', color: 'var(--gold)', marginBottom: '18px', transform: hov ? 'scale(1.15) rotate(-6deg)' : 'none', display: 'inline-block', transition: 'transform 0.3s cubic-bezier(.22,.68,0,1.1)' }}>{item.i}</div>
      <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '20px', fontWeight: '600', color: '#ffffff', marginBottom: '12px' }}>{item.t}</h3>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.7', maxHeight: hov ? '200px' : '60px', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>{item.d}</p>
      {hov && <div style={{ marginTop: '16px', fontSize: '11px', fontWeight: '600', color: 'var(--gold)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Learn more →</div>}
    </div>
  );
};

export const WhoWeServeCard = ({ p }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: 'var(--white)', border: `1px solid ${hov ? 'var(--gold)' : 'var(--border)'}`,
      borderRadius: '16px', padding: '34px 20px', textAlign: 'center',
      transform: hov ? 'translateY(-5px)' : 'none', boxShadow: hov ? '0 18px 44px rgba(13,27,62,0.09)' : 'none',
      transition: 'all 0.28s ease', cursor: 'default',
    }}>
      <div style={{ fontSize: '32px', marginBottom: '16px', display: 'block', transform: hov ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.3s' }}>{p.emoji}</div>
      <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '19px', fontWeight: '600', color: 'var(--navy)', marginBottom: '8px' }}>{p.role}</div>
      <div style={{ fontSize: '12px', color: 'var(--txt3)', lineHeight: '1.55' }}>{p.desc}</div>
    </div>
  );
};
