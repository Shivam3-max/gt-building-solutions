'use client';
import { useState } from 'react';
import { Reveal, SiteImage } from '@/components/Interactive';
import { WHATSAPP_LINK } from '@/lib/site';

const GALLERY_CATS = [
  { id: 'all', label: 'All' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'adhesives', label: 'Adhesives' },
  { id: 'panels', label: 'Panels' },
  { id: 'tiles', label: 'Tiles' },
  { id: 'paints', label: 'Paints' },
  { id: 'tools', label: 'Tools' },
  { id: 'pipes', label: 'Pipes' },
];

const GALLERY_ITEMS = [
  { cat: 'hardware', label: 'Kitchen Fittings Display', span: 2, src: 'kitchen-fittings.jpg' },
  { cat: 'hardware', label: 'Hettich Drawer Systems', src: 'hettich.jpg' },
  { cat: 'hardware', label: 'Door Hardware Range', src: 'door.jpg' },
  { cat: 'tiles', label: 'Kajaria Tile Showroom', span: 2, src: 'client/gt-kajaria-facade.jpg' },
  { cat: 'tiles', label: 'Bathroom Suite Display', src: 'bathroom.jpg' },
  { cat: 'tiles', label: 'Gujarat Tiles Interior Display', src: 'client/gujarat-tiles-interior-generated.png' },
  { cat: 'paints', label: 'Paints Design Studio', span: 2, src: 'generated-paints-showroom.png' },
  { cat: 'paints', label: 'Asian Paints Swatches', src: 'asian-paints.jpg' },
  { cat: 'paints', label: 'Birla Opus Collection', src: 'birla-opus.jpg' },
  { cat: 'adhesives', label: 'Fevicol Products', src: 'fevicol.jpg' },
  { cat: 'adhesives', label: 'Tile Adhesives & Construction Chemicals', src: 'adhesives-showroom-generated.png' },
  { cat: 'adhesives', label: 'Dr. Fixit Waterproofing', src: 'dr-fixit.jpg' },
  { cat: 'panels', label: 'Panels Showroom', span: 2, src: 'generated-panels-showroom.png' },
  { cat: 'panels', label: 'Gyproc Ceiling System', src: 'gyproc.jpg' },
  { cat: 'panels', label: 'Partition Wall System', src: 'panels-wall-system-generated.png' },
  { cat: 'tools', label: 'Power Tools Showroom', span: 2, src: 'generated-tools-showroom.png' },
  { cat: 'tools', label: 'DeWalt Power Tools', src: 'dewalt.jpg' },
  { cat: 'tools', label: 'CUMI Grinder Range', src: 'cumi.jpg' },
  { cat: 'pipes', label: 'Pipes & Plumbing Display', span: 2, src: 'generated-pipes-showroom.png' },
  { cat: 'pipes', label: 'Prince CPVC & uPVC Pipe Range', src: 'prince-pipes-display-generated.png' },
  { cat: 'pipes', label: 'Fittings & Valves', src: 'fittings.jpg' },
];

export default function GalleryGrid() {
  const [filter, setFilter] = useState('all');
  const shown = filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.cat === filter);

  return (
    <>
      <div style={{ padding: '40px var(--px) 0' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {GALLERY_CATS.map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              background: filter === f.id ? 'var(--navy)' : 'var(--white)',
              border: `1px solid ${filter === f.id ? 'var(--navy)' : 'var(--border)'}`,
              borderRadius: '100px', padding: '9px 22px', fontSize: '12px', fontWeight: '500',
              fontFamily: 'DM Sans,sans-serif', letterSpacing: '0.3px',
              color: filter === f.id ? 'var(--gold)' : 'var(--navy)', cursor: 'pointer',
            }}>{f.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '32px var(--px) 80px' }}>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {shown.map((item, i) => (
            <Reveal key={`${filter}-${i}`} delay={i * 0.04} className={item.span === 2 ? 'span2-mobile' : ''} style={item.span === 2 ? { gridColumn: 'span 2' } : {}}>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--white)' }}>
                <SiteImage src={item.src} alt={item.label} h={item.span === 2 ? 280 : 220} radius={0} />
                <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--navy)' }}>{item.label}</span>
                  <span style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(201,168,76,0.1)', borderRadius: '100px', padding: '4px 10px' }}>{item.cat}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {shown.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--txt3)' }}>No items in this category yet.</div>
        )}

        <Reveal>
          <div style={{ marginTop: '56px', background: 'linear-gradient(135deg,var(--navy) 0%,var(--navy3) 100%)', borderRadius: '20px', padding: '52px', textAlign: 'center' }}>
            <span className="section-tag" style={{ color: 'var(--gold)' }}>Coming Soon</span>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(26px,4vw,42px)', fontWeight: '600', color: '#ffffff', marginBottom: '16px', lineHeight: '1.2' }}>
              Real Project Photos Coming Soon
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', maxWidth: '480px', margin: '0 auto 32px' }}>
              We&rsquo;re uploading photos from real installations, showrooms, and completed projects. Check back soon.
            </p>
            <a href={`${WHATSAPP_LINK}?text=I'd like to see your product gallery`} target="_blank" rel="noopener noreferrer" className="btn-gold">
              WhatsApp for Photos
            </a>
          </div>
        </Reveal>
      </div>
    </>
  );
}
