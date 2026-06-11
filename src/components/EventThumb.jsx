import { useState, useRef } from 'react';
import VolumeSlider from './VolumeSlider';

const isMobile = typeof window !== 'undefined' &&
  !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export default function EventThumb({ event, onPlayFull }) {
  const [showVideo, setShowVideo] = useState(false);
  const iframeRef = useRef(null);
  const timer = useRef(null);

  // Mobile: tap → full modal directly
  if (isMobile) {
    return (
      <div style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden',
        background:'var(--bg2)', cursor:'pointer' }}
        onClick={() => onPlayFull(event)}>
        <img src={event.thumb} alt={event.title} loading="lazy"
          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block',
            filter:'brightness(.65) saturate(.8)' }}/>
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center',
          justifyContent:'center', background:'rgba(6,6,6,.2)' }}>
          <div style={{ width:52, height:52, border:'1px solid rgba(201,169,110,.6)',
            borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
            background:'rgba(6,6,6,.4)' }}>
            <svg width="18" viewBox="0 0 24 24" fill="var(--gold)"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div style={{ position:'absolute', bottom:'.7rem', right:'.7rem',
          fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.14em',
          textTransform:'uppercase', color:'rgba(255,255,255,.45)',
          background:'rgba(6,6,6,.7)', padding:'.15rem .45rem' }}>
          Tap to watch
        </div>
        {event.category && (
          <div style={{ position:'absolute', top:'.7rem', left:'.7rem', display:'flex', gap:'.35rem' }}>
            {event.category.split(' · ').slice(0,2).map(tag=>(
              <span key={tag} style={{ fontFamily:'var(--ui)', fontSize:'12px',
                letterSpacing:'.12em', textTransform:'uppercase',
                background:'rgba(6,6,6,.85)', color:'var(--gold)', padding:'.15rem .45rem' }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop: hover-to-preview
  const onEnter = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShowVideo(true), 300);
  };
  const onLeave = () => {
    clearTimeout(timer.current);
    setShowVideo(false);
  };

  const embedSrc = `https://www.youtube.com/embed/${event.youtubeId}` +
    `?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=${event.youtubeId}&enablejsapi=1&playsinline=1`;

  return (
    <div style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden',
      background:'var(--bg2)', cursor:'pointer' }}
      onMouseEnter={onEnter} onMouseLeave={onLeave}
      onClick={() => onPlayFull(event)}>

      <img src={event.thumb} alt={event.title} loading="lazy"
        style={{ position:'absolute', inset:0, width:'100%', height:'100%',
          objectFit:'cover', display:'block',
          transition:'opacity .5s ease, transform .8s var(--ease-out)',
          opacity: showVideo ? 0 : 1,
          transform: showVideo ? 'scale(1.04)' : 'scale(1)', pointerEvents:'none' }}/>

      {showVideo && (
        <iframe ref={iframeRef} src={embedSrc} allow="autoplay; encrypted-media"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%',
            border:'none', opacity:1, transition:'opacity .5s ease' }}/>
      )}

      {/* Play icon when thumbnail showing */}
      {!showVideo && (
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center',
          justifyContent:'center', background:'rgba(6,6,6,.22)', pointerEvents:'none' }}>
          <div style={{ width:52, height:52, border:'1px solid rgba(201,169,110,.6)',
            borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
            background:'rgba(6,6,6,.4)' }}>
            <svg width="18" viewBox="0 0 24 24" fill="var(--gold)"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      )}

      {/* Volume slider — visible when video is playing */}
      {showVideo && (
        <div style={{ position:'absolute', bottom:'.7rem', right:'.7rem', zIndex:10 }}
          onClick={e => e.stopPropagation()}>
          <VolumeSlider iframeRef={iframeRef}/>
        </div>
      )}

      {/* Category tags */}
      {event.category && (
        <div style={{ position:'absolute', top:'.7rem', left:'.7rem',
          display:'flex', gap:'.35rem', flexWrap:'wrap',
          opacity: showVideo ? 0 : 1, transition:'opacity .3s', pointerEvents:'none' }}>
          {event.category.split(' · ').slice(0,2).map(tag=>(
            <span key={tag} style={{ fontFamily:'var(--ui)', fontSize:'12px',
              letterSpacing:'.12em', textTransform:'uppercase',
              background:'rgba(6,6,6,.85)', color:'var(--gold)', padding:'.15rem .45rem' }}>
              {tag}
            </span>
          ))}
        </div>
      )}
      {!showVideo && (
        <div style={{ position:'absolute', bottom:'.7rem', right:'.7rem',
          fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.14em',
          textTransform:'uppercase', color:'rgba(255,255,255,.45)',
          background:'rgba(6,6,6,.7)', padding:'.15rem .45rem', pointerEvents:'none' }}>
          Hover to preview
        </div>
      )}
    </div>
  );
}
