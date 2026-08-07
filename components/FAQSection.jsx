export default function FAQSection({ title = 'Frequently Asked Questions', faqs }) {
  if (!faqs || !faqs.length) return null;
  return (
    <div style={{ padding: '0 var(--px) 80px' }}>
      <span className="section-tag">Common Questions</span>
      <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '36px', fontWeight: '600', color: 'var(--navy)', marginBottom: '28px', lineHeight: '1.2' }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '900px' }}>
        {faqs.map((f, i) => (
          <details key={i} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px 22px' }}>
            <summary style={{ cursor: 'pointer', fontSize: '15px', fontWeight: '600', color: 'var(--navy)', listStyle: 'none' }}>
              {f.q}
            </summary>
            <p style={{ fontSize: '14px', color: 'var(--txt2)', lineHeight: '1.75', marginTop: '12px' }}>{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
