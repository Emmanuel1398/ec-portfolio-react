import { useState, useRef, useEffect } from 'react';
import { useIntersection } from '../hooks';
import HorizontalRow from '../components/HorizontalRow';
import VideoModal from '../components/VideoModal';
import {
  REEL_SLIDES, CHARACTERS, DRONE_PROJECTS, DRONE_IMAGES,
  EVENT_VIZ_REAL, HOLOGRAM_REAL, PRODUCT_VIZ_REAL, PROJECTION_REAL,
  SOCIAL_CONTENT, IMAGES
} from '../data/portfolio';

/* ── Hover-to-play video card ── */
function HoverVideoCard({ thumbnail, youtubeId, title, sub, num, width, height, minWidth }) {
  const [showVideo, setShowVideo] = useState(false);
  const timer = useRef(null);

  const onEnter = () => {
    clearTimeout(timer.current);
    if (youtubeId) timer.current = setTimeout(() => setShowVideo(true), 250);
  };
  const onLeave = () => {
    clearTimeout(timer.current);
    setShowVideo(false);
  };

  return (
    <div className="h-item" style={{ width, minWidth, height, flexShrink:0, position:'relative' }}
      onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <img src={thumbnail} alt={title} loading="lazy" draggable="false"
        style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top',
          display:'block', transition:'opacity .4s, transform 1.1s var(--ease-out)',
          transform: showVideo ? 'scale(1.04)' : 'scale(1)',
          opacity: showVideo ? 0 : 1 }}/>
      {showVideo && youtubeId && (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=${youtubeId}`}
          allow="autoplay"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%',
            border:'none', opacity: showVideo ? 1 : 0, transition:'opacity .4s' }}/>
      )}
      <div className="h-item__info">
        {num && <div className="h-item__num">{num}</div>}
        <div className="h-item__title">{title}</div>
        {sub && <div className="h-item__sub">{sub}</div>}
      </div>
    </div>
  );
}

/* ── Section head ── */
function SectionHead({ label, total, title, sub, children }) {
  const [r, v] = useIntersection();
  return (
    <div ref={r} className={`rv ${v?'in':''}`} style={{ padding:'0 5vw 3rem' }}>
      <div className="cat-label">{label}{total && <span className="cat-num">{total}</span>}</div>
      <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: title }}/>
      <div className="sec-rule"><p>{sub}</p>{children}</div>
    </div>
  );
}

/* ── HERO ── */
function HeroReel() {
  const [cur, setCur] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const auto = useRef(null);
  const total = REEL_SLIDES.length;

  const goTo = (n) => { setPlaying(false); setCur((n+total)%total); resetAuto(); };
  const resetAuto = () => {
    clearInterval(auto.current);
    auto.current = setInterval(() => setCur(p=>(p+1)%total), 8000);
  };
  useEffect(() => {
    resetAuto();
    // Entrance animation trigger
    const t = setTimeout(() => setLoaded(true), 100);
    return () => { clearInterval(auto.current); clearTimeout(t); };
  }, []);

  const slide = REEL_SLIDES[cur];

  return (
    <section id="reels" style={{ position:'relative', width:'100%', height:'100vh', overflow:'hidden' }}>

      {/* AUTO-PLAY MUTED VIDEO BACKGROUND */}
      <div style={{ position:'absolute', inset:0, zIndex:1, overflow:'hidden' }}>
        <iframe
          src="https://www.youtube.com/embed/gmiQ0bNoPgQ?autoplay=1&mute=1&loop=1&playlist=gmiQ0bNoPgQ&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          allow="autoplay; encrypted-media"
          style={{ position:'absolute', top:'50%', left:'50%',
            transform:'translate(-50%,-50%) scale(1.15)',
            width:'100%', height:'100%', minWidth:'100%', minHeight:'100%',
            border:'none', pointerEvents:'none' }}/>
        {/* Scrim over video */}
        <div style={{ position:'absolute', inset:0,
          background:'linear-gradient(to bottom, rgba(6,6,6,.65) 0%, rgba(6,6,6,.3) 40%, rgba(6,6,6,.78) 78%, rgba(6,6,6,1) 100%)' }}/>
      </div>

      {/* Still image layers for inactive slides */}
      {REEL_SLIDES.map((sl,i) => i !== 0 && (
        <div key={sl.id} style={{ position:'absolute', inset:0,
          opacity: i===cur ? 1 : 0,
          transition:'opacity 1.8s cubic-bezier(0,0,0.2,1)', zIndex:0 }}>
          <img src={sl.bg} alt=""
            style={{ position:'absolute', inset:0, width:'100%', height:'100%',
              objectFit:'cover', filter:'brightness(.35) saturate(.6)' }}/>
          <div style={{ position:'absolute', inset:0,
            background:'linear-gradient(to bottom,rgba(6,6,6,.6) 0%,rgba(6,6,6,.3) 40%,rgba(6,6,6,.78) 78%,rgba(6,6,6,1) 100%)' }}/>
        </div>
      ))}

      {/* Full-screen playback override */}
      {playing && slide.youtubeId && (
        <div style={{ position:'absolute', inset:0, zIndex:20, background:'#000' }}>
          <iframe style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }}
            src={`https://www.youtube.com/embed/${slide.youtubeId}?autoplay=1&rel=0&controls=0`}
            allowFullScreen allow="autoplay; encrypted-media"/>
          <button onClick={() => setPlaying(false)}
            style={{ position:'absolute', top:'1.5rem', right:'1.5rem', zIndex:30,
              width:42, height:42, borderRadius:'50%', border:'1px solid rgba(255,255,255,.25)',
              background:'rgba(6,6,6,.7)', color:'var(--text)', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s' }}>
            <svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      )}

      {/* CONTENT — entrance animation */}
      {!playing && (
        <div style={{ position:'relative', zIndex:5, height:'100%',
          display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'0 5vw' }}>



          {/* Center play */}
          {slide.youtubeId && (
            <button onClick={() => { setPlaying(true); clearInterval(auto.current); }}
              style={{ position:'absolute', top:'50%', left:'50%',
                transform:'translate(-50%,-56%)', display:'flex', flexDirection:'column',
                alignItems:'center', gap:'1rem', background:'none', border:'none',
                cursor:'pointer', color:'var(--text)',
                opacity: loaded ? 1 : 0, transition:'opacity 1.2s ease .5s' }}>
              <div style={{ width:90, height:90, border:'1px solid rgba(255,255,255,.45)',
                borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                transition:'all .4s var(--ease-out)', background:'rgba(6,6,6,.25)' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='var(--gold)'; e.currentTarget.style.borderColor='var(--gold)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(6,6,6,.25)'; e.currentTarget.style.borderColor='rgba(255,255,255,.45)'; }}>
                <svg width="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <span style={{ fontFamily:'var(--ui)', fontSize:'clamp(11px,.8vw,14px)',
                letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(255,255,255,.45)' }}>
                Watch Full Reel
              </span>
            </button>
          )}

          {/* Bottom-right: small title + compact controls */}
          <div style={{
            position:'absolute', bottom:'2.5rem', right:'5vw', zIndex:6,
            display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'.8rem',
            opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)',
            transition:'opacity 1.4s ease .5s, transform 1.4s ease .5s',
          }}>
            {/* Small title — fades out when video is playing */}
            {!playing && (
              <div style={{ textAlign:'right' }}>
                <div style={{ fontFamily:'var(--serif)', fontSize:'clamp(1rem,1.5vw,1.6rem)',
                  fontWeight:300, lineHeight:1.05, color:'rgba(255,255,255,.7)',
                  letterSpacing:'.01em' }}>
                  {slide.title}
                </div>
                <div style={{ fontFamily:'var(--serif)', fontSize:'clamp(.85rem,1.2vw,1.2rem)',
                  fontWeight:300, fontStyle:'italic', color:'var(--gold)',
                  lineHeight:1, marginTop:'.2rem' }}>
                  {slide.subtitle}
                </div>
              </div>
            )}
            {/* Compact slider controls */}
            <div style={{ display:'flex', alignItems:'center', gap:'.8rem' }}>
              <button onClick={()=>goTo(cur-1)} style={{ width:28, height:28, borderRadius:'50%',
                border:'1px solid rgba(255,255,255,.15)', background:'rgba(6,6,6,.5)',
                color:'rgba(255,255,255,.45)', cursor:'pointer', display:'flex',
                alignItems:'center', justifyContent:'center', transition:'all .2s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.15)';e.currentTarget.style.color='rgba(255,255,255,.45)';}}>
                <svg width="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <div style={{ display:'flex', gap:'.5rem' }}>
                {REEL_SLIDES.map((_,i)=>(
                  <button key={i} onClick={()=>goTo(i)} style={{ width:5, height:5, borderRadius:'50%',
                    border:'none', cursor:'pointer', transition:'all .3s',
                    background: i===cur ? 'var(--gold)' : 'rgba(255,255,255,.2)',
                    transform: i===cur ? 'scale(1.3)' : 'scale(1)' }}/>
                ))}
              </div>
              <button onClick={()=>goTo(cur+1)} style={{ width:28, height:28, borderRadius:'50%',
                border:'1px solid rgba(255,255,255,.15)', background:'rgba(6,6,6,.5)',
                color:'rgba(255,255,255,.45)', cursor:'pointer', display:'flex',
                alignItems:'center', justifyContent:'center', transition:'all .2s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.15)';e.currentTarget.style.color='rgba(255,255,255,.45)';}}>
                <svg width="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}


    </section>
  );
}

/* ── CHARACTERS ── */
function CharactersSection() {
  const [r,v] = useIntersection();
  const items = CHARACTERS.map(c=>({ img:c.img, title:c.title, sub:c.tags, num:c.id, youtubeId:null }));
  return (
    <section id="characters" style={{ padding:'8rem 0 0', background:'var(--bg)' }}>
      <SectionHead label="3D Characters" total="17 Works" title="3D Characters &amp;<br/><em>Creatures</em>"
        sub="— Hyperrealistic sculpts. Every detail intentional."/>
      <div ref={r} className={`rv-img ${v?'in':''}`}>
        <div className="h-row" style={{ height:'72vh' }}>
          {items.map((item,i)=>(
            <HoverVideoCard key={i} thumbnail={item.img} youtubeId={item.youtubeId}
              title={item.title} sub={item.sub} num={item.num}
              width="26vw" height="72vh" minWidth="220px"/>
          ))}
          <div style={{ position:'absolute', right:0, top:0, bottom:0, width:70,
            background:'linear-gradient(to left,rgba(6,6,6,.6),transparent)',
            pointerEvents:'none', zIndex:2, display:'flex', alignItems:'center',
            justifyContent:'flex-end', paddingRight:'1rem' }}>
            <span style={{ fontFamily:'var(--ui)', fontSize:'11px', letterSpacing:'.2em',
              color:'rgba(255,255,255,.28)', writingMode:'vertical-rl' }}>DRAG →</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PORTFOLIO REEL FEATURED ── */
function PortfolioReelSection() {
  const [r,v] = useIntersection();
  const [playing, setPlaying] = useState(false);
  return (
    <section id="portfolio-reel" style={{ padding:'8rem 5vw', background:'var(--bg2)' }}>
      <div ref={r} className={`rv ${v?'in':''}`} style={{ marginBottom:'3rem' }}>
        <div className="cat-label">Portfolio Reel<span className="cat-num">2024–2025</span></div>
        <h2 className="sec-title">Main Portfolio <em>Showreel</em></h2>
        <div className="sec-rule"><p>— Full production reel showcasing all disciplines</p></div>
      </div>
      <div style={{ position:'relative', aspectRatio:'16/9', background:'var(--bg3)',
        overflow:'hidden', cursor:'pointer', maxHeight:'75vh' }}
        onClick={() => setPlaying(true)}
        onMouseEnter={e => { if(!playing) e.currentTarget.querySelector('img').style.transform='scale(1.04)'; }}
        onMouseLeave={e => { if(!playing) e.currentTarget.querySelector('img').style.transform='scale(1)'; }}>
        <img src={IMAGES.odungi_main} alt="Portfolio Reel"
          style={{ width:'100%', height:'100%', objectFit:'cover',
            filter:'brightness(.35) saturate(.7)', transition:'transform .8s var(--ease-out)' }}/>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center', gap:'1.5rem' }}>
          <div style={{ width:96, height:96, border:'1px solid rgba(201,169,110,.55)',
            borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
            background:'rgba(6,6,6,.3)', transition:'all .4s var(--ease-out)' }}
            onMouseEnter={e=>{e.currentTarget.style.background='var(--gold)';e.currentTarget.style.borderColor='var(--gold)';}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(6,6,6,.3)';e.currentTarget.style.borderColor='rgba(201,169,110,.55)';}}>
            <svg width="30" viewBox="0 0 24 24" fill="var(--gold)"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <div style={{ fontFamily:'var(--ui)', fontSize:'clamp(11px,.85vw,14px)',
            letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(255,255,255,.5)' }}>
            Emmanuel Chege · 2024 / 2025
          </div>
        </div>
      </div>
      {playing && <VideoModal youtubeId="gmiQ0bNoPgQ" title="Portfolio Reel 2024/2025" onClose={()=>setPlaying(false)}/>}
    </section>
  );
}

/* ── DRONE ── */
function DroneSection() {
  const [r,v] = useIntersection();
  const [r2,v2] = useIntersection();
  const cvRef = useRef(null);
  useEffect(() => {
    const cv=cvRef.current; if(!cv)return;
    const cx=cv.getContext('2d'); let W,H,pts=[],raf;
    const rz=()=>{W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;};
    const init=()=>{pts=[];for(let i=0;i<80;i++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.4+.3,p:Math.random()*Math.PI*2,ps:Math.random()*.015+.004});};
    const draw=()=>{
      cx.clearRect(0,0,W,H);
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<110){cx.beginPath();cx.strokeStyle=`rgba(201,169,110,${(.85-d/110)*.1})`;cx.lineWidth=.4;cx.moveTo(pts[i].x,pts[i].y);cx.lineTo(pts[j].x,pts[j].y);cx.stroke();}}
      pts.forEach(p=>{p.p+=p.ps;const g=.5+Math.sin(p.p)*.5;cx.beginPath();cx.arc(p.x,p.y,p.r*(1+g*.4),0,Math.PI*2);cx.fillStyle=`rgba(201,169,110,${g*.7})`;cx.fill();p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;});
      raf=requestAnimationFrame(draw);
    };
    const onR=()=>{rz();init();}; window.addEventListener('resize',onR); rz();init();draw();
    return()=>{window.removeEventListener('resize',onR);cancelAnimationFrame(raf);};
  },[]);

  return (
    <section id="drone" style={{ padding:'8rem 0 0', background:'var(--bg)' }}>
      <SectionHead label="Drone Show Concepts" total="6 Clients" title="Drone Show <em>Concepts</em>"
        sub="— EU-Kenya · HFCK · NRP · Museveni · Mashariki · La Mada"/>
      <div style={{ position:'relative', width:'100%', height:200,
        borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)',
        overflow:'hidden', background:'var(--bg2)' }}>
        <canvas ref={cvRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}/>
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center',
          justifyContent:'center', pointerEvents:'none' }}>
          <p style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.2rem,2.2vw,2rem)',
            fontWeight:300, fontStyle:'italic', color:'rgba(201,169,110,.22)', letterSpacing:'.04em' }}>
            Formation · Flight · Light
          </p>
        </div>
      </div>
      <div ref={r} className={`rv ${v?'in':''}`}
        style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', borderBottom:'1px solid var(--border)' }}>
        {DRONE_PROJECTS.map((p,i)=>(
          <div key={p.n} className={`rv d${Math.min(i,4)} ${v?'in':''}`}
            style={{ padding:'2rem 1.4rem', borderRight: i<5?'1px solid var(--border)':'none',
              cursor:'default', transition:'background .25s' }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.02)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <div style={{ fontFamily:'var(--ui)', fontSize:'11px', letterSpacing:'.18em', color:'var(--gold)', marginBottom:'.7rem' }}>{p.n}</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:'1.05rem', fontWeight:300, lineHeight:1.2, color:'var(--text)', marginBottom:'.4rem' }}>{p.title}</div>
            <div style={{ fontFamily:'var(--ui)', fontSize:'11px', letterSpacing:'.1em', color:'var(--muted)', lineHeight:1.7 }}>{p.desc.substring(0,80)}…</div>
          </div>
        ))}
      </div>
      <div ref={r2} className={`rv-img ${v2?'in':''}`}>
        <div className="h-row" style={{ height:'52vh' }}>
          {DRONE_IMAGES.map((item,i)=>(
            <HoverVideoCard key={i} thumbnail={item.img} youtubeId={null}
              title={item.title} sub={item.sub}
              width="30vw" height="52vh" minWidth="260px"/>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── GENERIC VIDEO ROW SECTION ── */
function VideoRowSection({ id, label, title, sub, items, height='60vh', itemWidth='32vw', bg='var(--bg)' }) {
  const [r,v] = useIntersection();
  const [r2,v2] = useIntersection();
  const [modal, setModal] = useState(null);
  return (
    <section id={id} style={{ padding:'8rem 0 0', background:bg }}>
      <div ref={r} className={`rv ${v?'in':''}`} style={{ padding:'0 5vw 3rem' }}>
        <div className="cat-label">{label}<span className="cat-num">{`${items.length} Works`}</span></div>
        <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: title }}/>
        <div className="sec-rule"><p>— {sub}</p></div>
      </div>
      <div ref={r2} className={`rv-img ${v2?'in':''}`}>
        <div className="h-row" style={{ height, position:'relative' }}>
          {items.map((item,i)=>(
            <HoverVideoCard key={i} thumbnail={item.img} youtubeId={item.youtubeId}
              title={item.title} sub={item.sub}
              width={itemWidth} height={height} minWidth="240px"/>
          ))}
          <div style={{ position:'absolute', right:0, top:0, bottom:0, width:70,
            background:'linear-gradient(to left,rgba(6,6,6,.6),transparent)',
            pointerEvents:'none', zIndex:2, display:'flex', alignItems:'center',
            justifyContent:'flex-end', paddingRight:'1rem' }}>
            <span style={{ fontFamily:'var(--ui)', fontSize:'11px', letterSpacing:'.2em',
              color:'rgba(255,255,255,.28)', writingMode:'vertical-rl' }}>DRAG →</span>
          </div>
        </div>
      </div>
      {modal && <VideoModal youtubeId={modal.youtubeId} title={modal.title} onClose={()=>setModal(null)}/>}
    </section>
  );
}

/* ── SOCIAL GRID ── */
function SocialSection() {
  const [r,v] = useIntersection();
  const [r2,v2] = useIntersection();
  return (
    <section id="social" style={{ padding:'8rem 0 0', background:'var(--bg)' }}>
      <div ref={r} className={`rv ${v?'in':''}`} style={{ padding:'0 5vw 3rem' }}>
        <div className="cat-label">Social Media Content<span className="cat-num">12 Works</span></div>
        <h2 className="sec-title">Social Media <em>Content</em></h2>
        <div className="sec-rule">
          <p>— Branded 3D motion, campaign graphics and social-first visual storytelling.</p>
          <a href="https://www.instagram.com/arte_artorius/" target="_blank" rel="noreferrer" className="sec-link">Follow @arte_artorius</a>
        </div>
      </div>
      <div ref={r2} className={`rv-img ${v2?'in':''}`} style={{ padding:'0 5vw 8rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'3px' }}>
          {SOCIAL_CONTENT.map((item,i)=>(
            <div key={i} style={{ position:'relative', aspectRatio:'1', overflow:'hidden', cursor:'pointer', background:'var(--bg2)' }}
              onMouseEnter={e=>{ e.currentTarget.querySelector('img').style.transform='scale(1.07)'; e.currentTarget.querySelector('.soc-ov').style.opacity='1'; }}
              onMouseLeave={e=>{ e.currentTarget.querySelector('img').style.transform='scale(1)'; e.currentTarget.querySelector('.soc-ov').style.opacity='0'; }}>
              <img src={item.img} alt={item.title} loading="lazy"
                style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform .7s var(--ease-out)' }}/>
              <div className="soc-ov" style={{ position:'absolute', inset:0, background:'rgba(6,6,6,.72)',
                display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column',
                gap:'.4rem', opacity:0, transition:'opacity .3s' }}>
                <div style={{ fontFamily:'var(--ui)', fontSize:'11px', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)' }}>{item.sub}</div>
                <div style={{ fontFamily:'var(--serif)', fontSize:'1rem', fontWeight:300, textAlign:'center', padding:'0 .8rem' }}>{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="page">
      <HeroReel/>
      <CharactersSection/>
      <PortfolioReelSection/>
      <DroneSection/>
      <VideoRowSection id="event-viz" bg="var(--bg2)" label="Event Visualization Videos"
        title="Event Visualization <em>Videos</em>"
        sub="These are the 3D visualizations of some event setups. A pre-visual to guide those setting up and the client on what their implemented vision may look like."
        items={EVENT_VIZ_REAL} height="60vh" itemWidth="32vw"/>
      <VideoRowSection id="hologram" bg="var(--bg)" label="Hologram Video Content"
        title="Hologram <em>Content</em>"
        sub="These are the raw videos and BTS of holograms I have edited before projection."
        items={HOLOGRAM_REAL} height="60vh" itemWidth="38vw"/>
      <VideoRowSection id="products" bg="var(--bg2)" label="Product Visualization"
        title="Product <em>Visualization</em>"
        sub="3D product renders, architectural and vehicle visualizations."
        items={PRODUCT_VIZ_REAL} height="62vh" itemWidth="30vw"/>
      <VideoRowSection id="projection" bg="var(--bg)" label="Projection Mapping Videos"
        title="Projection <em>Mapping</em>"
        sub="Architectural building projections, object mapping and event screen content across Nairobi and beyond."
        items={PROJECTION_REAL} height="62vh" itemWidth="30vw"/>
      <SocialSection/>
    </div>
  );
}
