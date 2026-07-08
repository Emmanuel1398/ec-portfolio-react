import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { DRONE_SHOWS } from '../data/portfolio';

function useIntersection(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Drone Formation Canvas ── */
function ConstellationCanvas({ fullPage = false }) {
  const cvRef = useRef(null);
  useEffect(() => {
    const cv = cvRef.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    let W, H, raf;
    const N = 90;

    // Each drone: current pos, velocity for hover effect
    let drones = [];
    let targets = [];
    let phase = 0;       // 0=forming, 1=holding, 2=dispersing
    let phaseTime = 0;
    let formIdx = 0;
    let lastTs = 0;

    const FORM_MS  = 3200;
    const HOLD_MS  = 3500;
    const DISP_MS  = 1200;

    const resize = () => {
      W = cv.width  = cv.offsetWidth;
      H = cv.height = cv.offsetHeight;
    };

    const initDrones = () => {
      drones = Array.from({ length: N }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        pulse: Math.random() * Math.PI * 2,
        ps: Math.random() * 0.012 + 0.004,
        r: Math.random() * 1.4 + 0.5,
      }));
    };

    const randomTargets = () =>
      Array.from({ length: N }, () => ({ tx: Math.random() * W, ty: Math.random() * H }));

    // Formation generators
    const formations = [
      // 0: Circle
      () => {
        const cx = W / 2, cy = H / 2, r = Math.min(W, H) * 0.3;
        return Array.from({ length: N }, (_, i) => {
          const a = (i / N) * Math.PI * 2 - Math.PI / 2;
          return { tx: cx + Math.cos(a) * r, ty: cy + Math.sin(a) * r };
        });
      },
      // 1: Star (5-pointed)
      () => {
        const cx = W / 2, cy = H / 2;
        const ro = Math.min(W, H) * 0.3, ri = ro * 0.42;
        const perSegment = Math.floor(N / 10);
        const pts = [];
        for (let s = 0; s < 10; s++) {
          const a1 = (s / 10) * Math.PI * 2 - Math.PI / 2;
          const a2 = ((s + 1) / 10) * Math.PI * 2 - Math.PI / 2;
          const r1 = s % 2 === 0 ? ro : ri;
          const r2 = s % 2 === 0 ? ri : ro;
          const x1 = cx + Math.cos(a1) * r1, y1 = cy + Math.sin(a1) * r1;
          const x2 = cx + Math.cos(a2) * r2, y2 = cy + Math.sin(a2) * r2;
          for (let i = 0; i < perSegment; i++) {
            const t = i / perSegment;
            pts.push({ tx: x1 + (x2 - x1) * t, ty: y1 + (y2 - y1) * t });
          }
        }
        while (pts.length < N) pts.push({ tx: cx, ty: cy });
        return pts;
      },
      // 2: Diamond
      () => {
        const cx = W / 2, cy = H / 2, size = Math.min(W, H) * 0.28;
        const corners = [
          { x: cx, y: cy - size }, { x: cx + size, y: cy },
          { x: cx, y: cy + size }, { x: cx - size, y: cy },
        ];
        const pps = Math.floor(N / 4);
        return Array.from({ length: N }, (_, i) => {
          const s = Math.floor(i / pps) % 4;
          const t = (i % pps) / pps;
          const a = corners[s], b = corners[(s + 1) % 4];
          return { tx: a.x + (b.x - a.x) * t, ty: a.y + (b.y - a.y) * t };
        });
      },
      // 3: Arrow →
      () => {
        const pts = [];
        const shaftN = Math.floor(N * 0.55);
        const headN = N - shaftN;
        for (let i = 0; i < shaftN; i++) {
          const t = i / shaftN;
          pts.push({ tx: W * 0.18 + t * W * 0.44, ty: H * 0.5 });
        }
        for (let i = 0; i < headN; i++) {
          const t = i / headN;
          if (t < 0.5) {
            const s = t * 2;
            pts.push({ tx: W * 0.62 + s * W * 0.2, ty: H * 0.5 - s * H * 0.24 });
          } else {
            const s = (t - 0.5) * 2;
            pts.push({ tx: W * 0.82 - s * W * 0.2, ty: H * 0.26 + s * H * 0.24 });
          }
        }
        return pts;
      },
      // 4: Hexagon
      () => {
        const cx = W / 2, cy = H / 2, r = Math.min(W, H) * 0.28;
        const pps = Math.floor(N / 6);
        return Array.from({ length: N }, (_, i) => {
          const s = Math.floor(i / pps) % 6;
          const t = (i % pps) / pps;
          const a1 = (s / 6) * Math.PI * 2 - Math.PI / 6;
          const a2 = ((s + 1) / 6) * Math.PI * 2 - Math.PI / 6;
          return {
            tx: cx + (Math.cos(a1) + (Math.cos(a2) - Math.cos(a1)) * t) * r,
            ty: cy + (Math.sin(a1) + (Math.sin(a2) - Math.sin(a1)) * t) * r,
          };
        });
      },
    ];

    const setFormation = (idx) => {
      targets = formations[idx % formations.length]();
    };

    const draw = (ts) => {
      const dt = lastTs ? Math.min(ts - lastTs, 50) : 16;
      lastTs = ts;
      phaseTime += dt;

      // Phase transitions
      if (phase === 0 && phaseTime > FORM_MS) { phase = 1; phaseTime = 0; }
      else if (phase === 1 && phaseTime > HOLD_MS) {
        phase = 2; phaseTime = 0;
        targets = randomTargets();
      }
      else if (phase === 2 && phaseTime > DISP_MS) {
        phase = 0; phaseTime = 0;
        formIdx = (formIdx + 1) % formations.length;
        setFormation(formIdx);
      }

      ctx.clearRect(0, 0, W, H);

      const lerpSpeed = phase === 0 ? 0.03 : phase === 2 ? 0.09 : 0.002;
      const inFormation = phase === 1;

      drones.forEach((d, i) => {
        const tgt = targets[i] || { tx: d.x, ty: d.y };
        d.x += (tgt.tx - d.x) * lerpSpeed;
        d.y += (tgt.ty - d.y) * lerpSpeed;
        if (inFormation) {
          d.x += Math.sin(ts * 0.0008 + i * 0.6) * 0.35;
          d.y += Math.cos(ts * 0.0009 + i * 0.8) * 0.35;
        }
        d.pulse += d.ps;
        const glow = 0.5 + Math.sin(d.pulse) * 0.5;

        // Connection lines when in/forming formation
        if (inFormation || (phase === 0 && phaseTime > FORM_MS * 0.65)) {
          for (let j = i + 1; j < Math.min(N, i + 10); j++) {
            const dx = drones[j].x - d.x, dy = drones[j].y - d.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 65) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(201,169,110,${(1 - dist / 65) * 0.18})`;
              ctx.lineWidth = 0.4;
              ctx.moveTo(d.x, d.y);
              ctx.lineTo(drones[j].x, drones[j].y);
              ctx.stroke();
            }
          }
        }

        // Drone dot
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * (1 + glow * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,169,110,${glow * 0.88})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    const onResize = () => { resize(); setFormation(formIdx); initDrones(); };
    window.addEventListener('resize', onResize);
    resize();
    initDrones();
    setFormation(formIdx);
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf); };
  }, []);

  return (
    <canvas ref={cvRef}
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', display:'block' }}/>
  );
}


function ShowCard({ show, index }) {
  const [r, v] = useIntersection();
  const [hover, setHover] = useState(false);
  const thumb = `https://img.youtube.com/vi/${show.conceptYoutubeId}/maxresdefault.jpg`;

  return (
    <div ref={r} style={{
      opacity: v ? 1 : 0,
      transform: v ? 'none' : 'translateY(40px)',
      transition: `opacity .8s ease ${index * 0.12}s, transform .8s ease ${index * 0.12}s`,
      height:'100%',
    }}>
      <Link to={`/drone-shows/${show.slug}`} style={{ textDecoration:'none', color:'inherit', display:'block', height:'100%' }}>
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            position:'relative', overflow:'hidden', background:'var(--bg2)',
            cursor:'pointer', height:'100%', display:'flex', flexDirection:'column',
          }}>

          {/* Thumbnail */}
          <div style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden', flexShrink:0 }}>
            <img src={thumb} alt={show.title}
              style={{ width:'100%', height:'100%', objectFit:'cover', display:'block',
                filter:`brightness(${hover ? .3 : .45}) saturate(.7)`,
                transform: hover ? 'scale(1.04)' : 'scale(1)',
                transition:'filter .5s ease, transform .9s var(--ease-out)' }}/>

            {/* Status badge */}
            <div style={{ position:'absolute', top:'1rem', left:'1rem',
              fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
              textTransform:'uppercase', padding:'.2rem .7rem',
              background: show.status === 'completed' ? 'rgba(201,169,110,.15)' : 'rgba(255,255,255,.08)',
              border: `1px solid ${show.status === 'completed' ? 'rgba(201,169,110,.5)' : 'rgba(255,255,255,.2)'}`,
              color: show.status === 'completed' ? 'var(--gold)' : 'rgba(255,255,255,.5)' }}>
              {show.status === 'completed' ? 'Produced' : 'Concept'}
            </div>

            {/* Index number */}
            <div style={{ position:'absolute', top:'1rem', right:'1rem',
              fontFamily:'var(--serif)', fontSize:'clamp(2rem,4vw,4rem)',
              fontWeight:300, color:'rgba(255,255,255,.08)', lineHeight:1 }}>
              0{index + 1}
            </div>

            {/* Hover overlay */}
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center',
              justifyContent:'center', flexDirection:'column', gap:'1rem',
              opacity: hover ? 1 : 0, transition:'opacity .35s ease' }}>
              <div style={{ width:60, height:60, border:'1px solid rgba(201,169,110,.7)',
                borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                background:'rgba(6,6,6,.4)' }}>
                <svg width="20" viewBox="0 0 24 24" fill="var(--gold)"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
                textTransform:'uppercase', color:'rgba(255,255,255,.6)' }}>
                View Blog
              </div>
            </div>
          </div>

          {/* Card info */}
          <div style={{ padding:'1.5rem 1.8rem 1.8rem', borderTop:'1px solid var(--border)', flex:1, display:'flex', flexDirection:'column' }}>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.18em',
              textTransform:'uppercase', color:'var(--gold)', marginBottom:'.5rem' }}>
              {show.client} · {show.year}
            </div>
            <h3 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.2rem,1.8vw,1.8rem)',
              fontWeight:300, color:'var(--text)', lineHeight:1.1, marginBottom:'.7rem' }}>
              {show.title}
            </h3>
            <p style={{ fontFamily:'var(--body)', fontSize:'1rem', color:'var(--muted)',
              lineHeight:1.7, fontStyle:'italic' }}>
              {show.tagline}
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:'.5rem', marginTop:'auto', paddingTop:'1.2rem',
              fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.18em',
              textTransform:'uppercase',
              color: hover ? 'var(--gold)' : 'var(--muted)',
              transition:'color .3s' }}>
              Read the story
              <svg width="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

import { useSeoContext } from '../providers/SeoProvider';
import site from '../config/site';

export default function DroneShowsPage() {
  const [rH, vH] = useIntersection(0.05);
  const { updateSeo } = useSeoContext();

  useEffect(() => {
    updateSeo({
      title: `Drone Show Concepts | ${site.name}`,
      description: 'Each drone show begins as a narrative written on paper — a story, a script, a sequence of formations designed to tell a message in the night sky.',
      canonical: `${site.url}/drone-shows`,
    });
  }, [updateSeo]);

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', position:'relative', overflow:'hidden' }}>

      {/* Starfield hero background — fills the whole header area */}
      <div style={{ position:'absolute', inset:0, top:0, left:0, right:0,
        height:'100vh', pointerEvents:'none', zIndex:0 }}>
        <ConstellationCanvas fullPage={true}/>
        {/* "Formation · Flight · Light" watermark */}
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center',
          justifyContent:'center', pointerEvents:'none' }}>
          <div style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.2rem,2.5vw,2rem)',
            fontWeight:300, fontStyle:'italic', color:'rgba(201,169,110,.15)',
            letterSpacing:'.06em', userSelect:'none' }}>
            Formation · Flight · Light
          </div>
        </div>
      </div>

      {/* Header */}
      <div ref={rH} className="pg-head" style={{ position:'relative', zIndex:1, padding:'10rem 5vw 5rem',
        opacity: vH ? 1 : 0, transform: vH ? 'none' : 'translateY(30px)',
        transition:'opacity 1s ease, transform 1s ease' }}>
        <div className="cat-label">
          Drone Show Concepts
          <span className="cat-num">{DRONE_SHOWS.length} Productions</span>
        </div>
        <h1 className="pg-title" style={{ fontFamily:'var(--serif)', fontSize:'clamp(3rem,7vw,8rem)',
          fontWeight:600, lineHeight:.92, letterSpacing:'.01em',
          color:'var(--text)', marginBottom:'1.5rem' }}>
          Drone<br/><em style={{ color:'var(--gold)', fontStyle:'italic' }}>Shows</em>
        </h1>
        <div style={{ width:60, height:1, background:'var(--gold)', marginBottom:'2rem' }}/>
        <p className="pg-intro" style={{ fontFamily:'var(--body)', fontSize:'clamp(1rem,1.2vw,1.15rem)',
          color:'var(--muted)', lineHeight:1.95, maxWidth:'640px' }}>
          Each drone show begins as a narrative written on paper — a story, a script, a sequence
          of formations designed to tell a message in the night sky. These are those stories,
          from initial concept through storyboard to final computerised formation visual.
          My role is to translate ideas into compelling visual narratives. This involves developing
          the artistic and creative concept, writing the show script, designing the key imagery,
          and crafting the narration and voice-over that bring meaning to each formation and
          transition. Once the creative vision is fully defined, it is handed over to the drone
          show programmers, who transform the concept into a synchronized aerial performance.
        </p>
      </div>

      {/* Rule */}
      <div style={{ borderTop:'1px solid var(--border)', margin:'0 5vw' }}/>

      {/* Show grid */}
      <div style={{ padding:'5rem 5vw 10rem',
        display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%,500px),1fr))',
        gap:'3px' }}>
        {DRONE_SHOWS.map((show, i) => (
          <ShowCard key={show.id} show={show} index={i}/>
        ))}
      </div>
    </div>
  );
}
