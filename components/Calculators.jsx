'use client';
import { useState } from 'react';

const inp = { width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '14px', fontFamily: 'DM Sans,sans-serif', color: 'var(--navy)', background: 'var(--cream)', outline: 'none' };
const lbl = { fontSize: '10px', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--navy)', display: 'block', marginBottom: '8px', opacity: 0.6 };

export const TileCalculator = () => {
  const [v, setV] = useState({ l: '', w: '', tl: '', tw: '', waste: '10' });
  const [res, setRes] = useState(null);
  const set = (k) => (e) => setV((p) => ({ ...p, [k]: e.target.value }));
  const calc = () => {
    const roomArea = parseFloat(v.l) * parseFloat(v.w);
    const tileArea = (parseFloat(v.tl) / 100) * (parseFloat(v.tw) / 100);
    if (!roomArea || !tileArea) return;
    const waste = parseFloat(v.waste) || 10;
    const total = Math.ceil((roomArea / tileArea) * (1 + waste / 100));
    setRes({ area: roomArea.toFixed(2), total, boxes: Math.ceil(total / 6), waste });
  };
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="grid-2">
        <div><label style={lbl}>Room Length (m)</label><input style={inp} type="number" placeholder="4.5" value={v.l} onChange={set('l')} /></div>
        <div><label style={lbl}>Room Width (m)</label><input style={inp} type="number" placeholder="3.2" value={v.w} onChange={set('w')} /></div>
        <div><label style={lbl}>Tile Length (cm)</label><input style={inp} type="number" placeholder="60" value={v.tl} onChange={set('tl')} /></div>
        <div><label style={lbl}>Tile Width (cm)</label><input style={inp} type="number" placeholder="60" value={v.tw} onChange={set('tw')} /></div>
        <div className="span2-mobile" style={{ gridColumn: 'span 2' }}><label style={lbl}>Wastage %</label><input style={inp} type="number" placeholder="10" value={v.waste} onChange={set('waste')} /></div>
      </div>
      <button onClick={calc} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '15px' }}>Calculate Tiles Needed</button>
      {res && <div style={{ marginTop: '20px', background: 'var(--navy)', borderRadius: '14px', padding: '28px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', textAlign: 'center' }}>
          {[{ n: `${res.area} m²`, l: 'Room Area' }, { n: res.total, l: `Tiles (+${res.waste}% waste)` }, { n: `~${res.boxes} boxes`, l: 'Est. Boxes (6/box)' }].map((r, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '32px', fontWeight: '700', color: 'var(--gold)' }}>{r.n}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '4px', fontWeight: '500' }}>{r.l}</div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
};

export const PaintCalculator = () => {
  const [v, setV] = useState({ l: '', w: '', h: '', coats: '2', doors: '1', windows: '1' });
  const [res, setRes] = useState(null);
  const set = (k) => (e) => setV((p) => ({ ...p, [k]: e.target.value }));
  const calc = () => {
    const L = parseFloat(v.l), W = parseFloat(v.w), H = parseFloat(v.h);
    if (!L || !W || !H) return;
    const net = Math.max(2 * (L + W) * H - (parseFloat(v.doors) * 1.8) - (parseFloat(v.windows) * 1.4), 0);
    const coats = parseFloat(v.coats) || 2;
    setRes({ net: net.toFixed(1), litres: Math.ceil(net * coats / 10), primer: Math.ceil(net / 12), coats });
  };
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '16px' }} className="grid-3">
        <div><label style={lbl}>Length (m)</label><input style={inp} type="number" placeholder="4.5" value={v.l} onChange={set('l')} /></div>
        <div><label style={lbl}>Width (m)</label><input style={inp} type="number" placeholder="3.5" value={v.w} onChange={set('w')} /></div>
        <div><label style={lbl}>Height (m)</label><input style={inp} type="number" placeholder="2.8" value={v.h} onChange={set('h')} /></div>
        <div><label style={lbl}>No. of Coats</label><input style={inp} type="number" placeholder="2" value={v.coats} onChange={set('coats')} /></div>
        <div><label style={lbl}>No. of Doors</label><input style={inp} type="number" placeholder="1" value={v.doors} onChange={set('doors')} /></div>
        <div><label style={lbl}>No. of Windows</label><input style={inp} type="number" placeholder="1" value={v.windows} onChange={set('windows')} /></div>
      </div>
      <button onClick={calc} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '15px' }}>Calculate Paint Required</button>
      {res && <div style={{ marginTop: '20px', background: 'var(--navy)', borderRadius: '14px', padding: '28px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', textAlign: 'center' }}>
          {[{ n: `${res.net} m²`, l: 'Net Wall Area' }, { n: `~${res.litres} L`, l: `Paint (${res.coats} coats)` }, { n: `~${res.primer} L`, l: 'Primer Required' }].map((r, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '32px', fontWeight: '700', color: 'var(--gold)' }}>{r.n}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '4px', fontWeight: '500' }}>{r.l}</div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
};

export const BudgetEstimator = () => {
  const items = [
    { id: 'flooring', label: 'Flooring (Tiles)', unit: 'per sq.ft', low: 40, high: 120 },
    { id: 'walls', label: 'Wall Tiles / Dado', unit: 'per sq.ft', low: 35, high: 100 },
    { id: 'paint', label: 'Interior Paint', unit: 'per sq.ft (wall area)', low: 18, high: 45 },
    { id: 'hardware', label: 'Kitchen Hardware', unit: 'per linear foot', low: 500, high: 2000 },
    { id: 'panels', label: 'Gypsum / False Ceiling', unit: 'per sq.ft', low: 60, high: 180 },
    { id: 'plumbing', label: 'Plumbing Fittings', unit: 'lump sum', low: 25000, high: 80000 },
    { id: 'electricals', label: 'Electrical Fittings', unit: 'lump sum', low: 20000, high: 60000 },
  ];
  const [qty, setQty] = useState({});
  const setQ = (k) => (e) => setQty((p) => ({ ...p, [k]: e.target.value }));
  const results = items.map((item) => { const q = parseFloat(qty[item.id]) || 0; return { ...item, q, low: Math.round(item.low * q), high: Math.round(item.high * q) }; }).filter((r) => r.q > 0);
  const totalLow = results.reduce((a, r) => a + r.low, 0);
  const totalHigh = results.reduce((a, r) => a + r.high, 0);
  const fmt = (n) => (n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString()}`);
  return (
    <div>
      <p style={{ fontSize: '13px', color: 'var(--txt2)', marginBottom: '20px', lineHeight: '1.6' }}>Enter quantities for each category to get a rough material cost estimate.</p>
      {items.map((item) => (
        <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'center', marginBottom: '12px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px 20px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--navy)', marginBottom: '2px' }}>{item.label}</div>
            <div style={{ fontSize: '11px', color: 'var(--txt3)' }}>{item.unit} • ₹{item.low}–₹{item.high}</div>
          </div>
          <input style={{ ...inp, width: '120px', textAlign: 'right' }} type="number" placeholder="Qty" value={qty[item.id] || ''} onChange={setQ(item.id)} />
        </div>
      ))}
      {results.length > 0 && <div style={{ marginTop: '20px', background: 'var(--navy)', borderRadius: '14px', padding: '28px 24px' }}>
        {results.map((r, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '10px', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>{r.label}</span>
            <span style={{ fontSize: '13px', color: 'var(--gold)', fontWeight: '600' }}>{fmt(r.low)} – {fmt(r.high)}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px' }}>
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff' }}>Total Estimate</span>
          <span style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '26px', fontWeight: '700', color: 'var(--gold)' }}>{fmt(totalLow)} – {fmt(totalHigh)}</span>
        </div>
      </div>}
    </div>
  );
};

export const AdhesiveCalculator = () => {
  const [v, setV] = useState({ area: '', tileSize: '60', type: 'ceramic' });
  const [res, setRes] = useState(null);
  const set = (k) => (e) => setV((p) => ({ ...p, [k]: e.target.value }));
  const types = { ceramic: { adh: 4.5, grout: 0.6 }, vitrified: { adh: 4.2, grout: 0.55 }, marble: { adh: 5, grout: 0.65 } };
  const calc = () => {
    const area = parseFloat(v.area); if (!area) return;
    const t = types[v.type] || types.ceramic;
    setRes({ adh: Math.ceil(area * t.adh / 20), grout: Math.ceil(area * t.grout / 10) });
  };
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '16px' }} className="grid-3">
        <div><label style={lbl}>Area to Tile (sq.ft)</label><input style={inp} type="number" placeholder="200" value={v.area} onChange={set('area')} /></div>
        <div><label style={lbl}>Tile Size</label><select style={inp} value={v.tileSize} onChange={set('tileSize')}><option value="30">30×30 cm</option><option value="60">60×60 cm</option><option value="80">80×80 cm</option><option value="120">120×60 cm</option></select></div>
        <div><label style={lbl}>Tile Type</label><select style={inp} value={v.type} onChange={set('type')}><option value="ceramic">Ceramic</option><option value="vitrified">Vitrified</option><option value="marble">Marble / Stone</option></select></div>
      </div>
      <button onClick={calc} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '15px' }}>Calculate Adhesive & Grout</button>
      {res && <div style={{ marginTop: '20px', background: 'var(--navy)', borderRadius: '14px', padding: '28px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', textAlign: 'center' }}>
          {[{ n: `${res.adh} bags`, l: 'Tile Adhesive (20 kg bags)' }, { n: `${res.grout} bags`, l: 'Grout (10 kg bags)' }].map((r, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '36px', fontWeight: '700', color: 'var(--gold)' }}>{r.n}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '6px', fontWeight: '500' }}>{r.l}</div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
};

export const RenovationChecklist = () => {
  const sections = [
    { title: 'Structure & Walls', items: ['Waterproofing (bathrooms/terrace)', 'Plastering & leveling', 'Gypsum partition walls', 'False ceiling / cornice'] },
    { title: 'Flooring', items: ['Floor tiles selection', 'Wall tiles / dado', 'Tile adhesive & grout', 'Tile polishing / sealing'] },
    { title: 'Kitchen', items: ['Modular cabinets hardware', 'Kitchen tiles & countertop', 'Kitchen fittings & plumbing', 'Adhesives for laminate'] },
    { title: 'Bathrooms', items: ['WC & washbasin', 'Shower / faucets', 'Bathroom tiles', 'Waterproofing & sealing'] },
    { title: 'Paints & Finishes', items: ['Wall primer', 'Interior emulsion paint', 'Exterior weather coat', 'Wood polish / enamel'] },
    { title: 'Electrical & Plumbing', items: ['CPVC / uPVC piping', 'Electrical conduits', 'Switches & sockets', 'Water tanks & pumps'] },
  ];
  const allItems = sections.flatMap((s) => s.items);
  const [checked, setChecked] = useState({});
  const toggle = (item) => setChecked((p) => ({ ...p, [item]: !p[item] }));
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / allItems.length) * 100);
  return (
    <div>
      <div style={{ background: 'var(--navy)', borderRadius: '14px', padding: '24px 28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>Renovation Progress</span>
          <span style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '28px', fontWeight: '700', color: 'var(--gold)' }}>{pct}%</span>
        </div>
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg,var(--gold),var(--gold3))', borderRadius: '3px', transition: 'width 0.4s ease' }} />
        </div>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '10px' }}>{done} of {allItems.length} tasks completed</p>
      </div>
      {sections.map((s, si) => (
        <div key={si} style={{ marginBottom: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', background: 'rgba(13,27,62,0.04)', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)' }}>{s.title}</span>
          </div>
          {s.items.map((item, ii) => (
            <div key={ii} onClick={() => toggle(item)} style={{
              display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 20px', cursor: 'pointer',
              borderBottom: ii < s.items.length - 1 ? '1px solid var(--border)' : 'none',
              background: checked[item] ? 'rgba(201,168,76,0.04)' : 'transparent',
            }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0,
                border: checked[item] ? 'none' : '2px solid rgba(13,27,62,0.2)',
                background: checked[item] ? 'var(--gold)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'var(--navy)',
              }}>{checked[item] ? '✓' : ''}</div>
              <span style={{ fontSize: '14px', color: checked[item] ? 'var(--txt3)' : 'var(--navy)', textDecoration: checked[item] ? 'line-through' : 'none' }}>{item}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
