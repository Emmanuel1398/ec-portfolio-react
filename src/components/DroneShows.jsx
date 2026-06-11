import { useEffect, useRef } from 'react';
import { useIntersection } from '../hooks';
import { DRONE_PROJECTS, IMAGES } from '../data/portfolio';
import HorizontalRow from './HorizontalRow';

const droneItems = [
  { img: IMAGES.drone_1, title: 'EU-Kenya Diplomatic Show',   sub: 'Aerial Formation' },
  { img: IMAGES.drone_2, title: 'HFCK Formation Show',        sub: 'Light Choreography' },
  { img: IMAGES.drone_3, title: 'NRP Campaign Show',          sub: 'Drone Concept' },
  { img: IMAGES.drone_4, title: 'Mashariki Conference',       sub: 'Multi-nation Formation' },
  { img: IMAGES.drone_1, title: 'Museveni Ceremony',          sub: 'State Ceremonial' },
  { img: IMAGES.drone_2, title: 'La Mada Premium Event',      sub: 'Hospitality Aerial' },
];

function ConstellationCanvas() {
  const cvRef = useRef(null);
  useEffect(() => {
    const cv = cvRef.current; if (!cv) return;
    const cx = cv.getContext('2d');
    let W, H, pts = [], raf;
    const resize = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; };
    const init = () => { pts = []; for (let i = 0; i < 80; i++) pts.push({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-.5)*.22, vy: (Math.random()-.5)*.22, r: Math.random()*1.5+.3, p: Math.random()*Math.PI*2, ps: Math.random()*.015+.004 }); };
    const draw = () => {
      cx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) for (let j = i+1; j < pts.length; j++) {
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if (d < 115) { cx.beginPath(); cx.strokeStyle=`rgba(201,169,110,${(.85-d/115)*.1})`; cx.lineWidth=.4; cx.moveTo(pts[i].x,pts[i].y); cx.lineTo(pts[j].x,pts[j].y); cx.stroke(); }
      }
      pts.forEach(p => {
        p.p += p.ps; const g = .5+Math.sin(p.p)*.5;
        cx.beginPath(); cx.arc(p.x,p.y,p.r*(1+g*.4),0,Math.PI*2);
        cx.fillStyle=`rgba(201,169,110,${g*.75})`; cx.fill();
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
      });
      raf = requestAnimationFrame(draw);
    };
    const onResize = () => { resize(); init(); };
    window.addEventListener('resize', onResize);
    resize(); init(); draw();
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div style={{ position:'relative', width:'100%', height:'220px', overflow:'hidden', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
      <canvas ref={cvRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} />
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
        <div style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.5rem,3vw,2.2rem)', fontWeight:300, fontStyle:'italic', color:'rgba(201,169,110,0.25)', letterSpacing:'0.04em', textAlign:'center' }}>
          Formation · Flight · Light
        </div>
      </div>
    </div>
  );
}

export default function DroneShows() {
  const [r1, v1] = useIntersection();
  const [r2, v2] = useIntersection();
  const [r3, v3] = useIntersection();
  return (
    <section id="drone" style={{ padding:'8rem 0 0', background:'var(--bg2)' }}>
      <div ref={r1} className={`rv ${v1?'in':''}`} style={{ padding:'0 5vw 3rem' }}>
        <div className="s-label">Portfolio / 06<span className="s-num">6 Clients</span></div>
        <h2 className="s-head">Drone Show<br/><em>Concepts</em></h2>
        <div style={{ marginTop:'1.5rem', borderTop:'1px solid var(--border)', paddingTop:'1rem' }}>
          <p style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.16em', color:'var(--muted)' }}>
            — EU-Kenya · HFCK · NRP · Museveni · Mashariki · La Mada
          </p>
        </div>
      </div>

      {/* Constellation canvas */}
      <div ref={r2} className={`rv-img d1 ${v2?'in':''}`}>
        <ConstellationCanvas />
      </div>

      {/* Drone project list — single row */}
      <div style={{ padding:'3rem 5vw', display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:'1px', borderBottom:'1px solid var(--border)' }}>
        {DRONE_PROJECTS.map((p, i) => (
          <div key={p.n} ref={i===0?r3:undefined} className={`rv d${Math.min(i,4)} ${v3?'in':''}`}
            style={{ padding:'1.8rem 1.2rem', borderRight: i<5?'1px solid var(--border)':'none', cursor:'pointer', transition:'background 0.25s' }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.02)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.2em', color:'var(--gold)', marginBottom:'0.8rem' }}>{p.n}</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:'1.05rem', fontWeight:300, lineHeight:1.2, color:'var(--text)', marginBottom:'0.5rem' }}>{p.title}</div>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.12em', color:'var(--muted)', lineHeight:1.7 }}>{p.desc.substring(0,80)}…</div>
          </div>
        ))}
      </div>

      {/* Drone images row */}
      <div className="rv-img" style={{ opacity: v2 ? 1 : 0, transition:'opacity 1.8s var(--ease)' }}>
        <HorizontalRow items={droneItems} height="55vh" itemWidth="32vw" minWidth="280px" />
      </div>
    </section>
  );
}
