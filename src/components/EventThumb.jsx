import { useState, useRef } from 'react';

/**
 * Thumbnail that plays a muted YouTube preview on hover.
 * Shows a speaker icon — clicking it unmutes at 40% volume.
 * Clicking anywhere else opens the full video modal.
 */
export default function EventThumb({ event, onPlayFull }) {
  const [showVideo, setShowVideo] = useState(false);
  const [muted, setMuted]         = useState(true);
  const iframeRef                 = useRef(null);
  const timer                     = useRef(null);

  const onEnter = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setShowVideo(true);
      setMuted(true); // reset mute state on each hover
    }, 300);
  };

  const onLeave = () => {
    clearTimeout(timer.current);
    setShowVideo(false);
    setMuted(true);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!iframeRef.current) return;
    const iframe = iframeRef.current;
    if (muted) {
      // Unmute and set to 40% volume
      iframe.contentWindow.postMessage(
        JSON.stringify({ event:'command', func:'unMute',    args:[] }), '*'
      );
      iframe.contentWindow.postMessage(
        JSON.stringify({ event:'command', func:'setVolume', args:[40] }), '*'
      );
    } else {
      iframe.contentWindow.postMessage(
        JSON.stringify({ event:'command', func:'mute', args:[] }), '*'
      );
    }
    setMuted(m => !m);
  };

  const embedSrc = `https://www.youtube.com/embed/${event.youtubeId}` +
    `?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1` +
    `&loop=1&playlist=${event.youtubeId}&enablejsapi=1&playsinline=1`;

  return (
    <div
      style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden',
        background:'var(--bg2)', cursor:'pointer' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={() => onPlayFull(event)}
    >
      {/* Static thumbnail */}
      <img
        src={event.thumb} alt={event.title} loading="lazy"
        style={{ position:'absolute', inset:0, width:'100%', height:'100%',
          objectFit:'cover', display:'block',
          transition:'opacity .5s ease, transform .8s var(--ease-out)',
          opacity: showVideo ? 0 : 1,
          transform: showVideo ? 'scale(1.04)' : 'scale(1)',
          pointerEvents:'none' }}
      />

      {/* Muted autoplay preview */}
      {showVideo && (
        <iframe
          ref={iframeRef}
          src={embedSrc}
          allow="autoplay; encrypted-media"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%',
            border:'none', opacity: showVideo ? 1 : 0, transition:'opacity .5s ease' }}
        />
      )}

      {/* Play icon (only when thumbnail showing) */}
      {!showVideo && (
        <div style={{ position:'absolute', inset:0, display:'flex',
          alignItems:'center', justifyContent:'center',
          background:'rgba(6,6,6,.25)', pointerEvents:'none' }}>
          <div style={{ width:52, height:52, border:'1px solid rgba(201,169,110,.6)',
            borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
            background:'rgba(6,6,6,.4)' }}>
            <svg width="18" viewBox="0 0 24 24" fill="var(--gold)">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      )}

      {/* Volume toggle (only while video is previewing) */}
      {showVideo && (
        <button
          onClick={toggleMute}
          title={muted ? 'Unmute (40%)' : 'Mute'}
          style={{ position:'absolute', bottom:'.7rem', right:'.7rem', zIndex:10,
            width:36, height:36, borderRadius:'50%',
            border:`1px solid ${muted ? 'rgba(255,255,255,.3)' : 'rgba(201,169,110,.7)'}`,
            background: muted ? 'rgba(6,6,6,.7)' : 'rgba(201,169,110,.15)',
            color: muted ? 'rgba(255,255,255,.6)' : 'var(--gold)',
            cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all .2s', backdropFilter:'blur(4px)' }}>
          {muted ? (
            /* Muted speaker icon */
            <svg width="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            /* Speaker with waves icon */
            <svg width="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
          )}
        </button>
      )}

      {/* Category tags */}
      <div style={{ position:'absolute', top:'.7rem', left:'.7rem',
        display:'flex', gap:'.35rem', flexWrap:'wrap',
        opacity: showVideo ? 0 : 1, transition:'opacity .3s', pointerEvents:'none' }}>
        {event.category.split(' · ').slice(0,2).map(tag => (
          <span key={tag} style={{ fontFamily:'var(--ui)', fontSize:'10px',
            letterSpacing:'.12em', textTransform:'uppercase',
            background:'rgba(6,6,6,.85)', color:'var(--gold)',
            padding:'.15rem .45rem' }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Hover hint (thumbnail only) */}
      {!showVideo && (
        <div style={{ position:'absolute', bottom:'.7rem', right:'.7rem',
          fontFamily:'var(--ui)', fontSize:'10px', letterSpacing:'.14em',
          textTransform:'uppercase', color:'rgba(255,255,255,.45)',
          background:'rgba(6,6,6,.7)', padding:'.15rem .45rem',
          pointerEvents:'none' }}>
          Hover to preview
        </div>
      )}
    </div>
  );
}
