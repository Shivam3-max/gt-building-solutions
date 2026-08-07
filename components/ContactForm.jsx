'use client';
import { useState } from 'react';
import { CATEGORIES } from '@/data/categories';
import { WHATSAPP_NUMBER } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

// Free form-to-email delivery via Web3Forms. Get a free access key at
// https://web3forms.com and paste it below — no backend/server required.
const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', category: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Enquiry${form.category ? ': ' + form.category : ''} — GT Building Solutions Website`,
          from_name: form.name,
          replyto: form.email,
          name: form.name,
          phone: form.phone,
          email: form.email,
          category: form.category,
          message: form.message,
        }),
      }).catch(() => {});
    }
    trackEvent('contact_form_submit', { category: form.category });
    const t = `Hello GT Building Solutions!%0A%0AName: ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0ACategory: ${form.category}%0A%0A${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${t}`, '_blank');
    setSent(true);
  };
  const lbl = { fontSize: '10px', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--navy)', display: 'block', marginBottom: '8px' };

  return (
    <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '20px', padding: '48px 44px' }}>
      <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '32px', fontWeight: '600', color: 'var(--navy)', marginBottom: '8px' }}>Send an Enquiry</h2>
      <p style={{ fontSize: '13px', color: 'var(--txt3)', marginBottom: '34px' }}>We respond promptly during business hours.</p>
      {sent ? (
        <div style={{ textAlign: 'center', padding: '64px 20px' }}>
          <div style={{ fontSize: '52px', marginBottom: '20px' }}>✅</div>
          <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '28px', color: 'var(--navy)', marginBottom: '12px' }}>Message Sent!</h3>
          <p style={{ fontSize: '14px', color: 'var(--txt2)' }}>WhatsApp has been opened. Our team will respond shortly.</p>
        </div>
      ) : (
        <form onSubmit={submit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }} className="grid-2">
            <div><label style={lbl}>Your Name *</label><input placeholder="Full name" value={form.name} onChange={set('name')} required /></div>
            <div><label style={lbl}>Phone *</label><input placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={set('phone')} required /></div>
          </div>
          <div style={{ marginBottom: '20px' }}><label style={lbl}>Email Address</label><input type="email" placeholder="your@email.com" value={form.email} onChange={set('email')} /></div>
          <div style={{ marginBottom: '20px' }}><label style={lbl}>Product Category</label>
            <select value={form.category} onChange={set('category')}>
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => <option key={c.id} value={c.label}>{c.label}</option>)}
              <option value="Multiple Categories">Multiple Categories</option>
            </select>
          </div>
          <div style={{ marginBottom: '24px' }}><label style={lbl}>Message *</label>
            <textarea rows={4} placeholder="Describe what you need — quantity, project type, timeline..." value={form.message} onChange={set('message')} required style={{ resize: 'none' }} />
          </div>
          <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>Send via WhatsApp →</button>
        </form>
      )}
    </div>
  );
}
