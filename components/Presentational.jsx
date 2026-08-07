import { assetPath, COMPANY_LOGO } from '@/lib/site';

export const ImgPlaceholder = ({ h = 280, label = 'Add Your Image Here', radius = 16 }) => (
  <div style={{
    height: `${h}px`, borderRadius: `${radius}px`,
    background: 'linear-gradient(135deg,#e8e4dc 0%,#d8d4cc 50%,#e4e0d8 100%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '12px', border: '2px dashed rgba(13,27,62,0.12)', position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', inset: 0, opacity: 0.04,
      backgroundImage: 'linear-gradient(45deg,#0D1B3E 25%,transparent 25%),linear-gradient(-45deg,#0D1B3E 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#0D1B3E 75%),linear-gradient(-45deg,transparent 75%,#0D1B3E 75%)',
      backgroundSize: '20px 20px', backgroundPosition: '0 0,0 10px,10px -10px,-10px 0',
    }} />
    <div style={{ fontSize: '32px', opacity: '0.35' }}>📷</div>
    <div style={{
      fontSize: '11px', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase',
      color: 'rgba(13,27,62,0.38)',
    }}>{label}</div>
  </div>
);

export const GoldLine = ({ my = 32 }) => (
  <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,var(--gold),transparent)', margin: `${my}px 0` }} />
);

export const PageHero = ({ tag, title, sub }) => (
  <div style={{
    background: 'linear-gradient(158deg,#080F22 0%,#0D1B3E 60%,#162347 100%)',
    padding: '100px var(--px) 80px', position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.04) 1px,transparent 1px)',
      backgroundSize: '50px 50px', pointerEvents: 'none',
    }} />
    <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
      <span className="section-tag">{tag}</span>
      <h1 style={{
        fontFamily: 'Cormorant Garamond,serif', fontWeight: '300', fontStyle: 'italic',
        fontSize: 'clamp(36px,6.5vw,80px)', color: '#ffffff', lineHeight: '1.08', marginBottom: sub ? '20px' : '0', whiteSpace: 'pre-line',
      }}>
        {title}
      </h1>
      {sub && <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', marginTop: '16px', maxWidth: '560px' }}>{sub}</p>}
    </div>
  </div>
);

export const CompanyLogo = ({ size = 52, bgSize, ringColor = 'rgba(13,27,62,0.12)', shadow = '0 10px 24px rgba(7,13,28,0.14)', style = {} }) => {
  const outer = bgSize || size;
  const inner = Math.round(outer * 0.64);
  return (
    <div style={{
      width: outer, height: outer, borderRadius: '50%',
      background: '#ffffff',
      border: `1px solid ${ringColor}`,
      boxShadow: shadow,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      ...style,
    }}>
      <img
        src={COMPANY_LOGO}
        alt="Garg Trading Company logo"
        style={{ width: inner, height: inner, objectFit: 'contain', display: 'block' }}
      />
    </div>
  );
};
