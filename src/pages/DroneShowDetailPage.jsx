import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DRONE_SHOWS } from '../data/portfolio';
import VideoModal from '../components/VideoModal';

function useIntersection(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function ScriptBlock({ block, index }) {
  const [r, v] = useIntersection();
  return (
    <div ref={r} style={{
      padding:'2.5rem 0', borderBottom:'1px solid rgba(255,255,255,.06)',
      opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(24px)',
      transition:`opacity .7s ease ${Math.min(index*.07,.4)}s, transform .7s ease ${Math.min(index*.07,.4)}s`,
    }}>
      {block.section && (
        <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.28em',
          textTransform:'uppercase', color:'var(--gold)', marginBottom:'1rem',
          display:'flex', alignItems:'center', gap:'1rem' }}>
          <span style={{ width:20, height:1, background:'var(--gold)', flexShrink:0 }}/>
          {block.section}
        </div>
      )}
      <p style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.05rem,1.4vw,1.35rem)',
        fontWeight:300, lineHeight:1.85, color:'rgba(237,237,234,.75)',
        whiteSpace:'pre-line', fontStyle:'italic', paddingLeft: block.section ? '2.2rem' : 0 }}>
        {block.text}
      </p>
    </div>
  );
}

const isMobile = typeof window !== 'undefined' &&
  !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function VideoBlock({ label, youtubeId, fallbackMsg }) {
  const [modal, setModal] = useState(false);
  const [r, v] = useIntersection();
  const [hover, setHover] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const timer = useRef(null);
  const containerRef = useRef(null);
  const thumb = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  useEffect(() => {
    if (!isMobile || !youtubeId || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowVideo(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [youtubeId]);

  // No video yet → static fallback
  if (!youtubeId) {
    return (
      <div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(30px)',
        transition:'opacity .9s ease, transform .9s ease' }}>
        <div style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden',
          background:'var(--bg3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
            textTransform:'uppercase', color:'var(--muted)', textAlign:'center', padding:'1rem' }}>
            {fallbackMsg || `${label} — coming soon`}
          </div>
        </div>
      </div>
    );
  }

  const onEnter = () => {
    setHover(true);
    if (isMobile) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShowVideo(true), 300);
  };
  const onLeave = () => {
    setHover(false);
    if (isMobile) return;
    clearTimeout(timer.current);
    setShowVideo(false);
  };

  const embedSrc = `https://www.youtube.com/embed/${youtubeId}` +
    `?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=${youtubeId}&enablejsapi=1&playsinline=1`;

  return (
    <div ref={r} style={{
      opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(30px)',
      transition:'opacity .9s ease, transform .9s ease'
    }}>
      <div ref={containerRef} onClick={() => setModal(true)}
        onMouseEnter={onEnter} onMouseLeave={onLeave}
        style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden',
          cursor:'pointer', background:'var(--bg3)' }}>

        <img src={thumb} alt={label}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover',
            filter:`brightness(${hover ? .25 : .4}) saturate(.6)`,
            opacity: showVideo ? 0 : 1,
            transform: hover ? 'scale(1.03)' : 'scale(1)',
            transition:'filter .5s, opacity .5s ease, transform .9s var(--ease-out)',
            pointerEvents:'none' }}/>

        {showVideo && (
          <iframe src={embedSrc} allow="autoplay; encrypted-media"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%',
              border:'none', pointerEvents: isMobile ? 'none' : 'auto' }}/>
        )}

        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center', gap:'1.2rem', pointerEvents:'none',
          opacity: showVideo ? 0 : 1, transition: 'opacity .4s' }}>
          <div style={{ width:72, height:72,
            border:`1px solid ${hover ? 'var(--gold)' : 'rgba(201,169,110,.55)'}`,
            borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
            background: hover ? 'var(--gold)' : 'rgba(6,6,6,.35)',
            transition:'all .35s var(--ease-out)' }}>
            <svg width="24" viewBox="0 0 24 24" fill={hover ? '#000' : 'var(--gold)'}>
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
            textTransform:'uppercase', color:'rgba(255,255,255,.6)' }}>
            {isMobile ? 'Tap to watch' : 'Hover to preview'} · {label}
          </div>
        </div>
      </div>
      {modal && <VideoModal youtubeId={youtubeId} title={label} onClose={() => setModal(false)}/>}
    </div>
  );
}

import { useSeoContext, BreadcrumbSchema } from '../providers/SeoProvider';
import site from '../config/site';

export default function DroneShowDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const show = DRONE_SHOWS.find(s => s.slug === slug);

  const currentIndex = DRONE_SHOWS.findIndex(s => s.slug === slug);
  const prevShow = DRONE_SHOWS[currentIndex - 1] || null;
  const nextShow = DRONE_SHOWS[currentIndex + 1] || null;

  const [rH, vH] = useIntersection(0.05);
  const [rS, vS] = useIntersection(0.05);
  const [rV, vV] = useIntersection(0.05);
  const { updateSeo } = useSeoContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!show) {
      navigate('/drone-shows');
      return;
    }
    updateSeo({
      title: `${show.title} | ${site.name}`,
      description: show.tagline || `Drone show concept: ${show.title}.`,
      canonical: `${site.url}/drone-shows/${show.slug}`,
      image: `https://img.youtube.com/vi/${show.conceptYoutubeId}/maxresdefault.jpg`,
      type: 'article',
    });
  }, [slug, show, navigate, updateSeo]);

  if (!show) return null;

  const conceptThumb = `https://img.youtube.com/vi/${show.conceptYoutubeId}/maxresdefault.jpg`;

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: site.url },
        { name: 'Drone Shows', url: `${site.url}/drone-shows` },
        { name: show.title, url: `${site.url}/drone-shows/${show.slug}` }
      ]} />

      {/* ── HERO HEADER ── */}
      <div ref={rH} style={{
        position:'relative', minHeight:'70vh', display:'flex', flexDirection:'column',
        justifyContent:'flex-end', overflow:'hidden',
        opacity: vH ? 1 : 0, transition:'opacity 1s ease .1s'
      }}>
        {/* Background image */}
        <div style={{ position:'absolute', inset:0 }}>
          <img src={conceptThumb} alt={show.title}
            style={{ width:'100%', height:'100%', objectFit:'cover',
              filter:'brightness(.2) saturate(.6)' }}/>
          <div style={{ position:'absolute', inset:0,
            background:'linear-gradient(to top, var(--bg) 30%, transparent 80%)' }}/>
        </div>

        {/* Back link */}
        <div style={{ position:'absolute', top:'7rem', left:'5vw', zIndex:2 }}>
          <Link to="/drone-shows" style={{ fontFamily:'var(--ui)', fontSize:'12px',
            letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.4)',
            textDecoration:'none', display:'flex', alignItems:'center', gap:'.5rem',
            transition:'color .2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.4)'}>
            <svg width="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            All Drone Shows
          </Link>
        </div>

        {/* Content */}
        <div style={{ position:'relative', zIndex:2, padding:'0 5vw 5rem' }}>
          <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.28em',
            textTransform:'uppercase', color:'var(--gold)', marginBottom:'1rem',
            display:'flex', alignItems:'center', gap:'1rem', flexWrap:'wrap' }}>
            {show.client}
            <span style={{ color:'var(--border)' }}>·</span>
            {show.location}
            <span style={{ color:'var(--border)' }}>·</span>
            {show.year}
            <span style={{ padding:'.15rem .6rem', fontSize:'12px',
              background: show.status === 'completed' ? 'rgba(201,169,110,.1)' : 'rgba(255,255,255,.05)',
              border: `1px solid ${show.status === 'completed' ? 'rgba(201,169,110,.4)' : 'rgba(255,255,255,.15)'}`,
              color: show.status === 'completed' ? 'var(--gold)' : 'rgba(255,255,255,.4)' }}>
              {show.status === 'completed' ? 'Produced' : 'Concept Only'}
            </span>
          </div>
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(2.2rem,5.5vw,6.5rem)',
            fontWeight:300, lineHeight:.92, color:'var(--text)', maxWidth:'900px' }}>
            {show.title}
          </h1>
          <div style={{ width:60, height:1, background:'var(--gold)', margin:'1.8rem 0' }}/>
          <p style={{ fontFamily:'var(--body)', fontSize:'clamp(.95rem,1.2vw,1.1rem)',
            color:'var(--muted)', lineHeight:1.9, maxWidth:'600px', fontStyle:'italic' }}>
            {show.tagline}
          </p>
        </div>
      </div>

      {/* ── DESCRIPTION ── */}
      <div style={{ padding:'4rem 5vw', borderBottom:'1px solid var(--border)' }}>
        <p style={{ fontFamily:'var(--body)', fontSize:'clamp(.95rem,1.15vw,1.08rem)',
          color:'var(--muted)', lineHeight:1.95, maxWidth:'680px' }}>
          {show.description}
        </p>
      </div>

      {/* ── SECTION 1: THE CONCEPT VIDEO ── */}
      <div style={{ padding:'6rem 5vw' }}>
        <div ref={rH} style={{ marginBottom:'3rem' }}>
          <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.3em',
            textTransform:'uppercase', color:'var(--gold)', marginBottom:'.6rem',
            display:'flex', alignItems:'center', gap:'1.2rem' }}>
            <span>01</span>
            <span style={{ width:40, height:1, background:'var(--gold)' }}/>
            The Concept
          </div>
          <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.8rem,3vw,3.5rem)',
            fontWeight:300, color:'var(--text)' }}>
            Formation <em style={{ color:'var(--gold)', fontStyle:'italic' }}>Concept</em>
          </h2>
        </div>
        <VideoBlock
          label="Concept Video"
          youtubeId={show.conceptYoutubeId}
          fallbackMsg="Concept video coming soon"
        />
      </div>

      {/* ── SECTION 2: NARRATION / V.O. SCRIPT ── */}
      <div style={{ background:'var(--bg2)', padding:'6rem 5vw' }}>
        <div ref={rS} style={{
          marginBottom:'3.5rem',
          opacity: vS ? 1 : 0, transform: vS ? 'none' : 'translateY(20px)',
          transition:'opacity .8s ease, transform .8s ease'
        }}>
          <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.3em',
            textTransform:'uppercase', color:'var(--gold)', marginBottom:'.6rem',
            display:'flex', alignItems:'center', gap:'1.2rem' }}>
            <span>02</span>
            <span style={{ width:40, height:1, background:'var(--gold)' }}/>
            Narration / V.O. Script
          </div>
          <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.8rem,3vw,3.5rem)',
            fontWeight:300, color:'var(--text)', marginBottom:'.8rem' }}>
            The <em style={{ color:'var(--gold)', fontStyle:'italic' }}>Script</em>
          </h2>
          <p style={{ fontFamily:'var(--body)', fontSize:'1rem', color:'var(--dim)',
            lineHeight:1.7, maxWidth:'480px' }}>
            The narration voice-over delivered during the live show — each section
            corresponding to a drone formation sequence in the sky above.
          </p>
        </div>

        <div style={{ maxWidth:'760px' }}>
          {show.script.map((block, i) => (
            <ScriptBlock key={i} block={block} index={i}/>
          ))}
        </div>
      </div>

      {/* ── SECTION 3: VISUALIZER ── */}
      <div style={{ padding:'6rem 5vw' }}>
        <div ref={rV} style={{
          marginBottom:'3rem',
          opacity: vV ? 1 : 0, transform: vV ? 'none' : 'translateY(20px)',
          transition:'opacity .8s ease, transform .8s ease'
        }}>
          <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.3em',
            textTransform:'uppercase', color:'var(--gold)', marginBottom:'.6rem',
            display:'flex', alignItems:'center', gap:'1.2rem' }}>
            <span>03</span>
            <span style={{ width:40, height:1, background:'var(--gold)' }}/>
            Drone Show Visualizer
          </div>
          <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.8rem,3vw,3.5rem)',
            fontWeight:300, color:'var(--text)' }}>
            Formation <em style={{ color:'var(--gold)', fontStyle:'italic' }}>Visual</em>
          </h2>
        </div>

        {show.visualizerYoutubeId ? (
          <VideoBlock label="Drone Formation Visual" youtubeId={show.visualizerYoutubeId}/>
        ) : (
          <div style={{ aspectRatio:'16/9', background:'var(--bg2)',
            border:'1px solid var(--border)', display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center', gap:'1.2rem' }}>
            <div style={{ width:1, height:60, background:'var(--border)' }}/>
            <div style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.2rem,2vw,2rem)',
              fontWeight:300, color:'rgba(255,255,255,.2)', textAlign:'center' }}>
              Awaiting Production
            </div>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
              textTransform:'uppercase', color:'rgba(201,169,110,.35)',
              border:'1px dashed rgba(201,169,110,.15)', padding:'.4rem 1rem' }}>
              Concept Only — Show Not Yet Produced
            </div>
          </div>
        )}
      </div>

      {/* ── PREV / NEXT NAVIGATION ── */}
      <div style={{ borderTop:'1px solid var(--border)', display:'grid',
        gridTemplateColumns:'1fr 1fr' }}>
        {prevShow ? (
          <Link to={`/drone-shows/${prevShow.slug}`} style={{ textDecoration:'none',
            padding:'2.5rem 5vw', borderRight:'1px solid var(--border)',
            display:'flex', flexDirection:'column', gap:'.4rem', transition:'background .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.18em',
              textTransform:'uppercase', color:'var(--muted)',
              display:'flex', alignItems:'center', gap:'.5rem' }}>
              <svg width="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Previous
            </div>
            <div style={{ fontFamily:'var(--serif)', fontSize:'clamp(1rem,1.4vw,1.4rem)',
              fontWeight:300, color:'var(--text)' }}>{prevShow.title}</div>
          </Link>
        ) : <div/>}

        {nextShow ? (
          <Link to={`/drone-shows/${nextShow.slug}`} style={{ textDecoration:'none',
            padding:'2.5rem 5vw', textAlign:'right',
            display:'flex', flexDirection:'column', gap:'.4rem', transition:'background .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.18em',
              textTransform:'uppercase', color:'var(--muted)',
              display:'flex', alignItems:'center', justifyContent:'flex-end', gap:'.5rem' }}>
              Next
              <svg width="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div style={{ fontFamily:'var(--serif)', fontSize:'clamp(1rem,1.4vw,1.4rem)',
              fontWeight:300, color:'var(--text)' }}>{nextShow.title}</div>
          </Link>
        ) : <div/>}
      </div>

    </div>
  );
}
