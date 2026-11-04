import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DroneFormations from '../components/DroneFormations';
import { DRONE_SHOWS } from '../data/portfolio';
import './category.css';

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
      <Link to={`/drone-shows/${show.slug}`} className="ilm-card" style={{ height:'100%' }}>
        <div className="ilm-card-media"><img src={thumb} alt={show.title} loading="lazy" /></div>
        <div className="ilm-card-title">{show.title}</div>
      </Link>
    </div>
  );
}

import { useSeoContext } from '../providers/SeoProvider';
import { droneShowsSeo } from '../seo/pages';

export default function DroneShowsPage() {
  const [rH, vH] = useIntersection(0.05);
  const { updateSeo } = useSeoContext();

  useEffect(() => { updateSeo(droneShowsSeo()); }, [updateSeo]);

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', position:'relative', overflow:'hidden' }}>

      {/* Header */}
      <div ref={rH} className="pg-head wk-head" style={{ position:'relative', zIndex:1,
        opacity: vH ? 1 : 0, transform: vH ? 'none' : 'translateY(30px)',
        transition:'opacity 1s ease, transform 1s ease' }}>
        <h1 className="pg-title wk-title" style={{ fontFamily:'var(--serif)',
          fontWeight:600, letterSpacing:'.01em',
          color:'var(--text)', marginBottom:'.9rem' }}>
          Drone <em style={{ color:'var(--gold)', fontStyle:'italic' }}>Shows</em>
        </h1>
        <p className="pg-intro wk-intro">
          Each drone show begins as a narrative written on paper · a story, a script, a sequence
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
      <div style={{ padding:'2rem 5vw 5rem',
        display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%,500px),1fr))',
        gap:'3px' }}>
        {DRONE_SHOWS.map((show, i) => (
          <ShowCard key={show.id} show={show} index={i}/>
        ))}
      </div>

      {/* Drone formation animation · "Formation · Flight · Light" · bottom of the page */}
      <div style={{ padding:'0 5vw 10rem' }}>
        <div style={{ position:'relative', height:'clamp(380px,72vh,760px)', overflow:'hidden',
          border:'1px solid rgba(201,169,110,.25)', pointerEvents:'none',
          /* night sky: deep blue overhead, a faint glow on the horizon, dark sea below */
          background:'radial-gradient(120% 60% at 50% 88%, rgba(255,170,90,.14), transparent 60%),'
            + 'linear-gradient(180deg, #02040b 0%, #050b1d 38%, #0b1834 72%, #101c33 86%, #03060d 87%, #050a16 100%)',
          boxShadow:'0 40px 100px -40px rgba(0,0,0,.9)' }} aria-hidden="true">
          <DroneFormations />
          <div style={{ position:'absolute', left:0, right:0, top:'5%', display:'flex', justifyContent:'center' }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.2rem,2.5vw,2rem)',
              fontWeight:300, fontStyle:'italic', color:'rgba(232,213,168,.55)',
              letterSpacing:'.08em', userSelect:'none',
              textShadow:'0 0 18px rgba(201,169,110,.55), 0 0 40px rgba(201,169,110,.25)' }}>
              Formation · Flight · Light
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
