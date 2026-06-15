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
        <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.22em',
          textTransform:'uppercase', color:'var(--gold)', marginBottom:'.4rem' }}>
          {event.client}
        </div>

        <h3 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.4rem,2.2vw,2.2rem)',
          fontWeight:300, lineHeight:1.05, color:'var(--text)', marginBottom:'1rem',
          cursor:'pointer' }} onClick={() => setModal(true)}>
          {event.title}
        </h3>
        <p style={{ fontFamily:'var(--body)', fontSize:'1rem', color:'var(--muted)',
          lineHeight:1.9, marginBottom:'1.8rem' }}>
          {event.description}
        </p>



        {/* Watch button */}
        <button onClick={() => setModal(true)}
          style={{ marginTop:'1.5rem', display:'inline-flex', alignItems:'center',
            gap:'.7rem', background:'transparent', border:'1px solid var(--border)',
            color:'var(--muted)', fontFamily:'var(--ui)', fontSize:'12px',
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
              "These are final event films and animations delivered to clients for broadcast, social media, documentation, and archival purposes. My process spans the entire production pipeline: concept development, research, storyboarding, 3D modelling, simulation, texturing, look development, rigging, animation, lighting, rendering, visual effects, compositing, editing, sound design, and colour grading. Working across Maya, Unreal Engine, Twinmotion, Substance 3D Painter, Mari, Houdini, EmberGen, LiquiGen, After Effects, Nuke, Premiere Pro, and DaVinci Resolve. The result is a complete production pipeline — from initial concept to final delivery — designed to create compelling visual experiences that communicate, engage, and leave a lasting impression."
            </p>
            <div style={{ marginTop:'1rem', fontFamily:'var(--ui)', fontSize:'12px',
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
                <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.14em',
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

      {/* ── EASTER EGG ── */}
      <EventEasterEgg/>
    </div>
  );
}

/* ── EASTER EGG — hidden bonus video ── */
function EventEasterEgg() {
  const [revealed, setRevealed] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <div style={{ background:'var(--bg2)', borderTop:'1px solid var(--border)',
      padding:'6rem 5vw' }}>
      <style>{`
        @keyframes eggBreath {
          0%,100% { transform:scale(1);    opacity:0.4; }
          50%      { transform:scale(1.04); opacity:0.75; }
        }
        @keyframes eggShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      {!revealed && (
        <div style={{ textAlign:'center', cursor:'pointer' }}
          onClick={() => setRevealed(true)}>
          <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.35em',
            textTransform:'uppercase', color:'var(--dim)', marginBottom:'1rem' }}>
            — One more thing —
          </div>
          <div style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.2rem,2vw,2rem)',
            fontWeight:300, fontStyle:'italic', lineHeight:1.4, marginBottom:'1.5rem',
            background:'linear-gradient(90deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,.22) 40%, rgba(201,169,110,.55) 50%, rgba(255,255,255,.22) 60%, rgba(255,255,255,.22) 100%)',
            backgroundSize:'200% auto',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            backgroundClip:'text',
            animation:'eggShimmer 7s ease-in-out infinite' }}>
            Not every video makes it onto the main reel.
          </div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'.6rem',
            fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
            textTransform:'uppercase', color:'rgba(201,169,110,.45)',
            border:'1px dashed rgba(201,169,110,.2)', padding:'.5rem 1.2rem',
            animation:'eggBreath 3s ease-in-out infinite',
            transition:'color .3s, border-color .3s' }}
            onMouseEnter={e=>{e.currentTarget.style.color='var(--gold)';e.currentTarget.style.borderColor='rgba(201,169,110,.5)';e.currentTarget.style.animationPlayState='paused';}}
            onMouseLeave={e=>{e.currentTarget.style.color='rgba(201,169,110,.45)';e.currentTarget.style.borderColor='rgba(201,169,110,.2)';e.currentTarget.style.animationPlayState='running';}}>
            <span>🎬</span> Click to reveal
          </div>
        </div>
      )}

      {revealed && (
        <div>
          <div style={{ marginBottom:'2.5rem', textAlign:'center' }}>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.35em',
              textTransform:'uppercase', color:'var(--gold)', marginBottom:'.5rem' }}>
              🎬 Bonus Cut
            </div>
            <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(2rem,3.5vw,4rem)',
              fontWeight:300, lineHeight:1, color:'var(--text)' }}>
              An Extra <em style={{ color:'var(--gold)', fontStyle:'italic' }}>Cut</em>
            </h2>
          </div>

          <div style={{ maxWidth:'900px', margin:'0 auto', position:'relative',
            aspectRatio:'16/9', overflow:'hidden', cursor:'pointer', background:'var(--bg3)' }}
            onClick={() => setModal(true)}
            onMouseEnter={e=>e.currentTarget.querySelector('.egg-img').style.transform='scale(1.04)'}
            onMouseLeave={e=>e.currentTarget.querySelector('.egg-img').style.transform='scale(1)'}>
            <img className="egg-img" src="https://img.youtube.com/vi/G2H2RBNbDSI/maxresdefault.jpg" alt="Bonus video"
              style={{ width:'100%', height:'100%', objectFit:'cover',
                filter:'brightness(.4) saturate(.7)', transition:'transform .8s var(--ease-out)' }}/>
            <div style={{ position:'absolute', inset:0, display:'flex',
              alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:70, height:70, border:'1px solid rgba(201,169,110,.55)',
                borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                background:'rgba(6,6,6,.35)' }}>
                <svg width="22" viewBox="0 0 24 24" fill="var(--gold)"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {modal && <VideoModal youtubeId="G2H2RBNbDSI" title="Bonus Cut" onClose={()=>setModal(false)}/>}
    </div>
  );
}
