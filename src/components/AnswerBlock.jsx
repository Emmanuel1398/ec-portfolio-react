/* Answer-first copy for search and AI answer engines.
   `summary` → a short lead paragraph placed right under the page title.
   `faqs`    → visible question/answer pairs (the same pairs feed the
               FAQPage JSON-LD in src/seo/pages.js, so they must stay visible).
   Renders nothing until a data entry has these fields. */
export default function AnswerBlock({ summary, faqs }) {
  if (!summary && !(faqs && faqs.length)) return null;
  return (
    <>
      {summary && (
        <p style={{ maxWidth:'none', marginTop:'1.8rem', fontFamily:'var(--body)', fontWeight:400,
          fontSize:'clamp(1.05rem,1.5vw,1.25rem)', color:'var(--text)', lineHeight:1.7 }}>
          {summary}
        </p>
      )}
      {faqs && faqs.length > 0 && (
        <section style={{ marginTop:'3rem' }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ marginTop: i ? '1.8rem' : 0 }}>
              <h2 style={{ fontFamily:'var(--serif)', fontWeight:400, fontSize:'clamp(1.3rem,2vw,1.7rem)',
                color:'var(--text)', lineHeight:1.2 }}>{f.q}</h2>
              <p style={{ marginTop:'.7rem', fontFamily:'var(--body)', fontWeight:300,
                fontSize:'clamp(.98rem,1.15vw,1.08rem)', color:'var(--muted)', lineHeight:1.9 }}>{f.a}</p>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
