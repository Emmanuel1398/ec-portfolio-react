import { useState, useRef } from 'react';
import { useIntersection } from '../hooks';
import VideoModal from '../components/VideoModal';
import { EVENTS_REAL } from '../data/portfolio';
import EventThumb from '../components/EventThumb';

/* Single event card */
function EventCard({ event, index }) {
  const [r, v] = useIntersection();
  const [modal, setModal] = useState(false);

  return (
    <div ref={r} className={`rv d${index % 2} ${v?'in':''}`}
      style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem',
        alignItems:'start', paddingBottom:'5rem', marginBottom:'5rem',
        borderBottom:'1px solid var(--border)' }}>

      {/* Thumbnail with hover-to-play */}
      <EventThumb event={event} onPlayFull={() => setModal(true)} />

      {/* Info */}
      <div>
        <div style={{ fontFamily:'var(--ui)', fontSize:'11px', letterSpacing:'.22em',
          textTransform:'uppercase', color:'var(--gold)', marginBottom:'.4rem' }}>
          {event.client}
        </div>

        <h3 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.4rem,2.2vw,2.2rem)',
          fontWeight:300, lineHeight:1.05, color:'var(--text)', marginBottom:'1rem',
          cursor:'pointer' }} onClick={() => setModal(true)}>
          {event.title}
        </h3>
        <p style={{ fontFamily:'var(--body)', fontSize:'.86rem', color:'var(--muted)',
          lineHeight:1.9, marginBottom:'1.8rem' }}>
          {event.description}
        </p>



        {/* Watch button */}
        <button onClick={() => setModal(true)}
          style={{ marginTop:'1.5rem', display:'inline-flex', alignItems:'center',
            gap:'.7rem', background:'transparent', border:'1px solid var(--border)',
            color:'var(--muted)', fontFamily:'var(--ui)', fontSize:'11px',
            letterSpacing:'.16em', textTransform:'uppercase', padding:'.7rem 1.4rem',
            cursor:'pointer', transition:'all .2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='var(--gold)'; e.currentTarget.style.color='var(--gold)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--muted)'; }}>
          <svg width="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          Watch Full Video
        </button>
      </div>

      {modal && <VideoModal youtubeId={event.youtubeId} title={event.title} onClose={() => setModal(false)}/>}
    </div>
  );
}

export default function EventVideosPage() {
  const [r, v] = useIntersection();

  return (
    <div style={{ minHeight:'100vh' }}>
      {/* Page header */}
      <div style={{ paddingTop:'11rem', paddingBottom:'5rem',
        paddingLeft:'5vw', paddingRight:'5vw',
        borderBottom:'1px solid var(--border)', background:'var(--bg)' }}>
        <div ref={r} className={`rv ${v?'in':''}`}>
          <div className="cat-label">
            Page 02 — Full Event Videos
            <span className="cat-num">{EVENTS_REAL.length} Events</span>
          </div>
          <h1 className="sec-title" style={{ fontSize:'clamp(3rem,6vw,7rem)' }}>
            Full Event <em>Videos</em>
          </h1>

          {/* Key statement */}
          <div style={{ marginTop:'2rem', padding:'1.6rem 2rem',
            borderLeft:'2px solid var(--gold)',
            background:'rgba(201,169,110,.04)' }}>
            <p style={{ fontFamily:'var(--serif)',
              fontSize:'clamp(1rem,1.6vw,1.3rem)', fontWeight:300,
              fontStyle:'italic', lineHeight:1.75, color:'var(--text)' }}>
              "Final videos I edited of the live event — complete post-production edits
              delivered to clients for broadcast, social media, archival and event documentation."
            </p>
            <div style={{ marginTop:'1rem', fontFamily:'var(--ui)', fontSize:'11px',
              letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)' }}>
              — Emmanuel Chege · Post-Production & Editing · Nairobi, Kenya
            </div>
          </div>

          {/* Stats row */}
          <div style={{ marginTop:'2.5rem', display:'grid',
            gridTemplateColumns:'repeat(3,1fr)', gap:'0',
            border:'1px solid var(--border)', background:'var(--border)' }}>
            {[
              [EVENTS_REAL.length, 'Events Documented'],
              ['Various DCC', 'Software Used'],
              ['Hover thumbnail', 'To preview video'],
            ].map(([n, l]) => (
              <div key={l} style={{ background:'var(--bg)', padding:'1.2rem 1.6rem' }}>
                <div style={{ fontFamily:'var(--serif)', fontSize:'1.8rem', fontWeight:300,
                  color:'var(--gold)', lineHeight:1, marginBottom:'.3rem' }}>{n}</div>
                <div style={{ fontFamily:'var(--ui)', fontSize:'11px', letterSpacing:'.14em',
                  textTransform:'uppercase', color:'var(--muted)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Events list */}
      <div style={{ padding:'7rem 5vw', background:'var(--bg)' }}>
        {EVENTS_REAL.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </div>
  );
}
