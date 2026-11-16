import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSeoContext } from '../providers/SeoProvider';
import { policySeo, notFoundSeo } from '../seo/pages';
import { getPolicy, POLICIES, POLICY_UPDATED } from '../data/policies';

/* ─────────────────────────────────────────────────────────────
   POLICY PAGE · one component renders all six notices
   Terms of Use, Privacy Policy, Copyright & Image Use, Cookie
   Notice, Rights & Use, No AI Use. The text lives in
   src/data/policies.js; this file only knows how to lay it out.
   ───────────────────────────────────────────────────────────── */

/* a paragraph that can carry inline links: 'text' or {parts:[…]} */
function Para({ p }) {
  if (typeof p === 'string') return <p className="pol-p">{p}</p>;
  return (
    <p className="pol-p">
      {p.parts.map((x, i) =>
        typeof x === 'string'
          ? <span key={i}>{x}</span>
          : (x.href || '').startsWith('/')
            ? <Link key={i} to={x.href} className="pol-a">{x.text}</Link>
            : <a key={i} href={x.href} className="pol-a"
                {...((x.href || '').startsWith('mailto:') ? {} : { target:'_blank', rel:'noopener noreferrer' })}>{x.text}</a>
      )}
    </p>
  );
}

function Block({ b }) {
  switch (b.t) {
    case 'h':     return <h2 className="pol-h">{b.text}</h2>;
    case 'p':     return <Para p={b.body} />;
    case 'ul':    return <ul className="pol-list">{b.items.map((i, k) => <li key={k}>{i}</li>)}</ul>;
    case 'ol':    return <ol className="pol-list pol-ol">{b.items.map((i, k) => <li key={k}>{i}</li>)}</ol>;
    case 'quote': return (
      <div className="pol-quote">
        <div className="pol-qt">{b.title}</div>
        <p>{b.body}</p>
      </div>
    );
    case 'table': return (
      <div className="pol-tw">
        <table className="pol-t">
          <thead><tr>{b.head.map((h, k) => <th key={k}>{h}</th>)}</tr></thead>
          <tbody>{b.rows.map((r, k) => <tr key={k}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
    default: return null;
  }
}

export default function PolicyPage({ slug }) {
  const params = useParams();
  const p = getPolicy(slug || params.slug);
  const { updateSeo } = useSeoContext();

  useEffect(() => { updateSeo(p ? policySeo(p) : notFoundSeo()); }, [p, updateSeo]);

  if (!p) {
    return (
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
        flexDirection:'column', gap:'1.5rem', color:'var(--muted)' }}>
        <div style={{ fontFamily:'var(--serif)', fontWeight:400, fontSize:'2rem', color:'var(--text)' }}>Notice not found</div>
        <Link to="/" style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.18em',
          textTransform:'uppercase', color:'var(--gold)' }}>&larr; Home</Link>
      </div>
    );
  }

  const others = POLICIES.filter(o => o.slug !== p.slug);

  return (
    <div className="page pol">
      <style>{POL_CSS}</style>

      <div className="pol-wrap">
        <Link to="/" className="pol-back">&larr; Home</Link>

        <header className="pol-head">
          <div className="pol-eyebrow">Rights &amp; Policies</div>
          <h1 className="pol-title">{p.title} <em>{p.accent}</em></h1>
          <p className="pol-lede">{p.lede}</p>
          {p.dated && <div className="pol-date">Last updated {POLICY_UPDATED}</div>}
        </header>

        <article className="pol-body">
          {p.blocks.map((b, i) => <Block key={i} b={b} />)}
        </article>

        <nav className="pol-more" aria-label="Other notices">
          <div className="pol-more-t">The other notices</div>
          <div className="pol-more-l">
            {others.map(o => <Link key={o.slug} to={`/${o.slug}`}>{o.label}</Link>)}
          </div>
        </nav>
      </div>
    </div>
  );
}

const POL_CSS = `
.pol{min-height:100vh;}
.pol-wrap{max-width:var(--wrap);margin:0 auto;padding:8rem var(--gutter) 6rem;}
.pol-back{font-family:var(--ui);font-size:12px;letter-spacing:.18em;text-transform:uppercase;
  color:var(--muted);text-decoration:none;}
.pol-back:hover{color:var(--gold);}
.pol-head{margin-top:2.5rem;padding-bottom:2.2rem;border-bottom:1px solid var(--border);}
.pol-eyebrow{font-family:var(--ui);font-size:12px;letter-spacing:.22em;text-transform:uppercase;
  color:var(--muted);margin-bottom:1.3rem;}
.pol-title{font-family:var(--serif);font-weight:500;line-height:.96;letter-spacing:.01em;
  font-size:clamp(2.6rem,6.5vw,5.2rem);color:var(--text);}
.pol-title em{font-style:normal;color:var(--gold);}
.pol-lede{margin-top:1.6rem;max-width:58ch;font-family:var(--ui);font-weight:300;
  font-size:clamp(1.02rem,1.4vw,1.2rem);line-height:1.7;color:var(--muted);}
.pol-date{margin-top:1.4rem;font-family:var(--ui);font-size:11px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--dim);}
.pol-body{max-width:78ch;margin-top:3rem;}
.pol-h{font-family:var(--serif);font-weight:500;font-size:clamp(1.25rem,2vw,1.65rem);
  color:var(--gold);margin:3rem 0 1rem;line-height:1.3;}
.pol-h:first-child{margin-top:0;}
.pol-p{font-family:var(--ui);font-weight:300;font-size:1.04rem;line-height:1.85;
  color:#ffffff;margin:0 0 1.15rem;}
.pol-a{color:var(--gold);text-decoration:none;border-bottom:1px solid rgba(201,169,110,.45);
  transition:color .25s,border-color .25s;}
.pol-a:hover{color:var(--gold2);border-color:var(--gold2);}
.pol-list{margin:0 0 1.3rem;padding-left:1.15rem;}
.pol-list li{font-family:var(--ui);font-weight:300;font-size:1.04rem;line-height:1.8;
  color:#ffffff;margin-bottom:.55rem;}
.pol-list li::marker{color:var(--gold);}
.pol-ol{padding-left:1.4rem;}
.pol-quote{margin:1.8rem 0 2rem;border-left:2px solid var(--gold);background:rgba(201,169,110,.07);
  backdrop-filter:blur(2px);padding:1.5rem 1.7rem;}
.pol-qt{font-family:var(--ui);font-size:11px;letter-spacing:.18em;text-transform:uppercase;
  color:var(--gold);margin-bottom:.75rem;}
.pol-quote p{font-family:var(--ui);font-weight:300;font-size:1.02rem;line-height:1.85;
  color:var(--text);margin:0;}
.pol-tw{margin:1.5rem 0 2rem;border:1px solid var(--border);background:rgba(16,16,16,.72);
  backdrop-filter:blur(4px);overflow-x:auto;}
.pol-t{width:100%;border-collapse:collapse;min-width:640px;}
.pol-t th{font-family:var(--ui);font-size:10px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--gold);background:rgba(201,169,110,.05);text-align:left;padding:.85rem 1.1rem;
  border-bottom:1px solid var(--border);border-right:1px solid var(--border);}
.pol-t td{font-family:var(--ui);font-weight:300;font-size:.95rem;line-height:1.65;
  color:var(--text);padding:.9rem 1.1rem;border-bottom:1px solid var(--border);
  border-right:1px solid var(--border);vertical-align:top;}
.pol-t th:last-child,.pol-t td:last-child{border-right:none;}
.pol-t tr:last-child td{border-bottom:none;}
.pol-more{margin-top:4.5rem;padding-top:2.2rem;border-top:1px solid var(--border);}
.pol-more-t{font-family:var(--ui);font-size:11px;letter-spacing:.18em;text-transform:uppercase;
  color:var(--muted);margin-bottom:1.1rem;}
.pol-more-l{display:flex;flex-wrap:wrap;gap:.5rem 1.6rem;}
.pol-more-l a{font-family:var(--ui);font-size:12px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--gold);text-decoration:none;border-bottom:1px solid transparent;transition:border-color .25s;}
.pol-more-l a:hover{border-bottom-color:var(--gold);}
@media(max-width:720px){.pol-wrap{padding-top:6.5rem;}}
`;
