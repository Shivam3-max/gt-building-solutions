'use client';
import { useState } from 'react';
import { GoldLine } from '@/components/Presentational';
import { TileCalculator, PaintCalculator, BudgetEstimator, AdhesiveCalculator, RenovationChecklist } from '@/components/Calculators';
import { WHATSAPP_LINK } from '@/lib/site';

const TOOLS = [
  { name: 'Tile Calculator', icon: '◼', desc: 'Calculate exact tiles needed with wastage', Comp: TileCalculator },
  { name: 'Paint Coverage', icon: '🎨', desc: 'How much paint for your room', Comp: PaintCalculator },
  { name: 'Budget Estimator', icon: '₹', desc: 'Rough material cost estimate', Comp: BudgetEstimator },
  { name: 'Adhesive & Grout', icon: '◈', desc: 'Bags of adhesive and grout needed', Comp: AdhesiveCalculator },
  { name: 'Reno Checklist', icon: '✦', desc: 'Track your renovation tasks', Comp: RenovationChecklist },
];

export default function CalculatorsHub() {
  const [active, setActive] = useState(0);
  const ActiveComp = TOOLS[active].Comp;

  return (
    <div style={{ padding: '32px var(--px) 80px' }}>
      <div className="show-mobile" style={{ display: 'none', flexDirection: 'column', overflowX: 'auto', padding: '0 0 8px' }}>
        <div style={{ display: 'flex', gap: '8px', paddingBottom: '4px', minWidth: 'max-content' }}>
          {TOOLS.map((t, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              background: active === i ? 'var(--navy)' : 'var(--white)',
              border: `1px solid ${active === i ? 'var(--navy)' : 'var(--border)'}`,
              borderRadius: '100px', padding: '10px 18px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              <span style={{ fontSize: '14px' }}>{t.icon}</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: active === i ? 'var(--gold)' : 'var(--navy)' }}>{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="hide-mobile" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px', alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: '100px' }}>
          {TOOLS.map((t, i) => (
            <div key={i} onClick={() => setActive(i)} className="card-hover" style={{
              background: active === i ? 'var(--navy)' : 'var(--white)',
              border: `1px solid ${active === i ? 'var(--navy)' : 'var(--border)'}`,
              borderRadius: '14px', padding: '20px 22px', marginBottom: '10px', cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0, background: active === i ? 'rgba(201,168,76,0.15)' : 'rgba(13,27,62,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{t.icon}</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: active === i ? '#ffffff' : 'var(--navy)', marginBottom: '2px' }}>{t.name}</div>
                  <div style={{ fontSize: '11px', color: active === i ? 'rgba(255,255,255,0.45)' : 'var(--txt3)', lineHeight: '1.4' }}>{t.desc}</div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ background: 'linear-gradient(135deg,var(--gold) 0%,var(--gold3) 100%)', borderRadius: '14px', padding: '24px 22px', marginTop: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)', marginBottom: '8px' }}>Need Expert Help?</div>
            <div style={{ fontSize: '12px', color: 'rgba(13,27,62,0.65)', lineHeight: '1.5', marginBottom: '14px' }}>Our team can verify your estimates.</div>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: 'var(--navy)', color: 'var(--gold)', padding: '11px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', letterSpacing: '1px', textDecoration: 'none', textTransform: 'uppercase' }}>💬 Ask an Expert</a>
          </div>
        </div>
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '20px', padding: '44px' }}>
          <div style={{ marginBottom: '28px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>
              {TOOLS[active].icon} Tool {active + 1} of {TOOLS.length}
            </span>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '34px', fontWeight: '600', color: 'var(--navy)', marginBottom: '8px' }}>{TOOLS[active].name}</h2>
            <p style={{ fontSize: '13px', color: 'var(--txt3)' }}>{TOOLS[active].desc}</p>
          </div>
          <GoldLine my={20} />
          <ActiveComp />
        </div>
      </div>

      <div className="show-mobile" style={{ display: 'none', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '20px', padding: '28px 20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '6px' }}>
              {TOOLS[active].icon} {TOOLS[active].name}
            </span>
            <p style={{ fontSize: '13px', color: 'var(--txt3)' }}>{TOOLS[active].desc}</p>
          </div>
          <GoldLine my={16} />
          <ActiveComp />
        </div>
        <div style={{ background: 'linear-gradient(135deg,var(--gold) 0%,var(--gold3) 100%)', borderRadius: '14px', padding: '24px', marginTop: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)', marginBottom: '8px' }}>Need Expert Help?</div>
          <div style={{ fontSize: '12px', color: 'rgba(13,27,62,0.65)', lineHeight: '1.5', marginBottom: '14px' }}>Our team can verify your estimates.</div>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: 'var(--navy)', color: 'var(--gold)', padding: '11px', borderRadius: '8px', fontWeight: '700', fontSize: '12px', letterSpacing: '1px', textDecoration: 'none', textTransform: 'uppercase' }}>💬 Ask an Expert</a>
        </div>
      </div>
    </div>
  );
}
