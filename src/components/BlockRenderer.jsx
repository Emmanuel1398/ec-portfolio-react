import { useState } from 'react';
import VideoModal from './VideoModal';
import Lightbox, { hiRes, ZoomBadge } from './Lightbox';

/* ── one asset frame: image when src present, else dashed placeholder ── */
function Frame({ f, ratio = '4/3' }) {
  const [open, setOpen] = useState(false);
  if (f && f.src) {
    const cap = [f.label, f.spec].filter(Boolean).join(' \u00b7 ');
    return (
      <>
        <div className="cb-shot" role="button" tabIndex={0}
          aria-label={`View ${f.label || 'image'} full size`}
          onClick={() => setOpen(true)}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true); } }}
          style={{ position:'relative', overflow:'hidden', background:'var(--bg2)' }}
          onMouseEnter={e => { const i = e.currentTarget.querySelector('img'); if (i) i.style.transform='scale(1.03)'; }}
          onMouseLeave={e => { const i = e.currentTarget.querySelector('img'); if (i) i.style.transform='scale(1)'; }}>
          <img src={f.src} alt={f.label} loading="lazy"
            style={{ width:'100%', height:'auto', objectFit:'contain', display:'block',
              transition:'transform .9s cubic-bezier(0.16,1,0.3,1)' }}/>
          {f.tag && <span className="cb-tag">{f.tag}</span>}
          <ZoomBadge />
          {(f.label || f.spec) && (
            <div className="cb-cap">{f.label}{f.spec ? <span> · {f.spec}</span> : null}</div>
          )}
        </div>
        {open && <Lightbox src={f.full || hiRes(f.src)} caption={cap} onClose={() => setOpen(false)} />}
      </>
    );
  }
  return (
    <div className="cb-frame" style={{ aspectRatio:ratio }}>
      {f && f.tag && <span className="cb-tag">{f.tag}</span>}
      <div className="cb-fl">{f ? f.label : 'Asset'}</div>
      {f && f.spec && <div className="cb-fs">{f.spec}</div>}
      <div className="cb-fh">asset coming soon</div>
    </div>
  );
}

function VideoFrame({ block }) {
  const [modal, setModal] = useState(false);
  const has = !!block.youtubeId;
  return (
    <>
      <div className="cb-frame" style={{ aspectRatio:'16/9', cursor: has ? 'pointer' : 'default' }}
        onClick={() => has && setModal(true)}>
        <div className="cb-play" />
        <div className="cb-fl">{block.label}</div>
        {block.spec && <div className="cb-fs">{block.spec}</div>}
        <div className="cb-fh">{has ? 'click to play' : 'video coming soon'}</div>
      </div>
      {modal && <VideoModal youtubeId={block.youtubeId} title={block.label} onClose={() => setModal(false)} />}
    </>
  );
}

export default function BlockRenderer({ blocks }) {
  return (
    <div className="cblog">
      <style>{CB_CSS}</style>
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'head':
            return (
              <div className="cb-head" key={i}>
                <span className="cb-num">{b.num}</span>
                <h2 className="cb-title">{b.title} <em>{b.accent}</em></h2>
              </div>
            );
          case 'prose':
            return b.body
              ? <div className="cb-prose" key={i}>{b.body.map((p, j) => <p key={j}>{p}</p>)}</div>
              : <p className="cb-coming" key={i}>Technical write-up coming soon.</p>;
          case 'frames': {
            const cls = b.cols === 3 ? 'cb-grid3' : b.cols === 2 ? 'cb-grid2' : 'cb-grid1';
            return <div className={cls} key={i}>{b.items.map((f, j) => <Frame key={j} f={f} />)}</div>;
          }
          case 'maps':
            return <div className="cb-maps" key={i}>{b.items.map((f, j) => <Frame key={j} f={f} ratio="1/1" />)}</div>;
          case 'nodegraph':
            return <div key={i} className="cb-mt"><Frame f={{ tag:'Node Graph', label:b.label, spec:b.spec }} ratio="16/9" /></div>;
          case 'video':
            return <div key={i} className="cb-mt"><VideoFrame block={b} /></div>;
          case 'valueTable':
            return (
              <div className="cb-vt" key={i}>
                <div className="cb-vt-cap">{b.caption}{b.chip && <span className="cb-chip">{b.chip}</span>}</div>
                {b.rows.map((r, j) => (
                  <div className="cb-vt-row" key={j}>
                    <div className="cb-k">{r.k}</div>
                    <div className="cb-v">{r.v ? r.v : <span className="cb-dash">—</span>}</div>
                  </div>
                ))}
              </div>
            );
          case 'lightRig':
            return (
              <div className="cb-lt" key={i}>
                <div className="cb-vt-cap">{b.caption}{b.chip && <span className="cb-chip">{b.chip}</span>}</div>
                <div className="cb-lt-grid">
                  <div className="cb-h">Light</div><div className="cb-h">Type</div><div className="cb-h">Intensity</div><div className="cb-h">Colour · Temp</div><div className="cb-h">Samples</div>
                  {b.rows.map((r, j) => (
                    <div className="cb-lt-cell" key={j} style={{ gridColumn:'1 / -1', display:'contents' }}>
                      <div className="cb-lname">{r.name}</div>
                      <div className="cb-mut">{r.type || <span className="cb-dash">—</span>}</div>
                      <div className="cb-mut">{r.intensity || <span className="cb-dash">—</span>}</div>
                      <div className="cb-mut">{r.colour || <span className="cb-dash">—</span>}</div>
                      <div className="cb-mut">{r.samples || <span className="cb-dash">—</span>}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          case 'callout':
            return (
              <div className="cb-callout" key={i}>
                <div className="cb-ct">{b.title}</div>
                <p className="cb-coming" style={{ margin:0 }}>{b.body || 'Notes coming soon.'}</p>
              </div>
            );
          case 'chips':
            return <div className="cb-chips" key={i}>{b.items.map((c, j) => <span key={j}>{c}</span>)}</div>;
          case 'pullquote':
            return b.text
              ? <blockquote className="cb-pq" key={i}>{b.text}</blockquote>
              : <p className="cb-coming" key={i} style={{ fontSize:'1.1rem' }}>Closing reflection coming soon.</p>;
          default:
            return null;
        }
      })}
    </div>
  );
}

const CB_CSS = `
.cblog{max-width:1320px;margin:0 auto;padding:0 5vw 6rem;}
.cb-head{display:flex;align-items:baseline;gap:1.4rem;margin:5.5rem 0 1.8rem;padding-top:3rem;border-top:1px solid var(--border);}
.cb-head:first-of-type{border-top:none;padding-top:0;margin-top:2rem;}
.cb-num{font-family:var(--ui);font-size:13px;letter-spacing:.14em;color:var(--gold);flex-shrink:0;}
.cb-title{font-family:var(--serif);font-weight:600;line-height:.98;font-size:clamp(2rem,4vw,3.4rem);letter-spacing:.01em;color:var(--text);}
.cb-title em{font-style:normal;color:var(--gold);}
.cb-prose{max-width:68ch;}
.cb-prose p{margin:0 0 1.2rem;color:#cbc8c1;font-size:1.06rem;line-height:1.75;}
.cb-coming{font-family:var(--ui);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);
  border-left:2px solid var(--border);padding:.4rem 0 .4rem 1rem;}
.cb-grid1{margin-top:2rem;}
.cb-grid2{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:2rem;}
.cb-grid3{display:grid;grid-template-columns:repeat(2,1fr);gap:6px;margin-top:2rem;}
.cb-maps{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:2rem;}
.cb-mt{margin-top:2rem;}
@media(max-width:720px){.cb-grid2,.cb-grid3,.cb-maps{grid-template-columns:1fr;}}
.cb-frame{position:relative;border:1px dashed rgba(201,169,110,.32);
  background:repeating-linear-gradient(45deg,rgba(201,169,110,.02) 0 14px,transparent 14px 28px),var(--bg2);
  display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:1.4rem;color:var(--muted);overflow:hidden;}
.cb-tag{position:absolute;top:0;left:0;font-family:var(--ui);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#000;background:var(--gold);padding:.3rem .65rem;z-index:2;}
.cb-cap{position:absolute;left:0;right:0;bottom:0;padding:1.2rem .8rem .6rem;font-family:var(--ui);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.75);background:linear-gradient(to top,rgba(6,6,6,.9),transparent);text-align:left;}
.cb-cap span{color:var(--muted);}
.cb-fl{font-family:var(--serif);font-size:1.3rem;color:var(--gold2);}
.cb-fs{font-family:var(--ui);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-top:.4rem;}
.cb-fh{font-family:var(--ui);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);margin-top:.9rem;}
.cb-play{width:50px;height:50px;border:1px solid var(--gold);border-radius:50%;margin-bottom:.9rem;position:relative;}
.cb-play::after{content:'';position:absolute;top:50%;left:54%;transform:translate(-50%,-50%);border-left:12px solid var(--gold);border-top:8px solid transparent;border-bottom:8px solid transparent;}
.cb-vt,.cb-lt{margin-top:2rem;border:1px solid var(--border);background:rgba(16,16,16,.72);backdrop-filter:blur(4px);overflow-x:auto;}
.cb-vt-cap{display:flex;align-items:center;gap:.8rem;padding:1rem 1.4rem;border-bottom:1px solid var(--border);font-family:var(--ui);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);}
.cb-chip{margin-left:auto;color:var(--gold);border:1px solid var(--border);padding:.2rem .6rem;font-size:10px;}
.cb-vt-row{display:grid;grid-template-columns:1.3fr 1fr;border-bottom:1px solid var(--border);}
.cb-vt-row:last-child{border-bottom:none;}
.cb-vt-row>div{padding:.8rem 1.4rem;font-family:var(--ui);font-size:13px;letter-spacing:.03em;}
.cb-k{color:var(--muted);}
.cb-v{color:var(--text);border-left:1px solid var(--border);}
.cb-dash{color:var(--dim);}
.cb-lt-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.2fr 1fr;min-width:680px;}
.cb-lt-grid>div{padding:.78rem 1.1rem;border-bottom:1px solid var(--border);border-right:1px solid var(--border);font-family:var(--ui);font-size:12.5px;letter-spacing:.03em;color:var(--text);}
.cb-lt-grid>div:nth-child(5n){border-right:none;}
.cb-h{color:var(--gold);font-size:10px !important;letter-spacing:.14em;text-transform:uppercase;background:rgba(201,169,110,.04);}
.cb-mut{color:var(--muted);}
.cb-callout{margin-top:2rem;border-left:2px solid var(--gold);background:rgba(201,169,110,.07);backdrop-filter:blur(2px);padding:1.5rem 1.7rem;}
.cb-ct{font-family:var(--ui);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:.7rem;}
.cb-chips{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:2rem;}
.cb-chips span{font-family:var(--ui);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);padding:.45rem .85rem;}
.cb-shot{cursor:zoom-in;outline:none;}
.cb-shot:focus-visible{outline:1px solid var(--gold);outline-offset:2px;}
.cb-zoom{position:absolute;top:.55rem;right:.55rem;z-index:3;display:flex;align-items:center;justify-content:center;
  width:34px;height:34px;border:1px solid rgba(201,169,110,.5);background:rgba(8,8,8,.55);backdrop-filter:blur(3px);
  color:var(--gold);transition:background .2s,color .2s,transform .2s;pointer-events:none;}
.cb-shot:hover .cb-zoom{background:var(--gold);color:#000;transform:scale(1.05);}
.cb-zoom svg{width:16px;height:16px;display:block;}
.cb-pq{font-family:var(--serif);font-weight:300;font-size:clamp(1.6rem,3vw,2.6rem);line-height:1.3;color:var(--text);max-width:26ch;margin:1rem 0;}
`;
