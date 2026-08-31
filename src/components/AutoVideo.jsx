import { useEffect, useRef } from 'react';
import { isAudioActivated } from '../lib/audioActivation';

/* Site standard for portfolio videos:
   - autoplays on load (muted first, so the browser never blocks it)
   - unmutes automatically once the visitor has interacted with the site
   - on pages with several videos, only the one in view plays sound (orderly);
     scrolling to the next hands the audio over and mutes the previous
   - full controls, so it can be paused or muted manually */
export default function AutoVideo({ youtubeId, title = '', className, style, portrait = false, loop = false }) {
  const iframeRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    if (!youtubeId || !boxRef.current) return;
    let inView = false;
    const cmd = (func, args = []) => {
      try { iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), '*'); } catch (e) {}
    };
    const apply = () => {
      if (!isAudioActivated()) return;
      if (inView) { cmd('unMute'); cmd('setVolume', [70]); } else { cmd('mute'); }
    };
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; apply(); }, { threshold: 0.5 });
    io.observe(boxRef.current);
    // retry so the command lands once the YouTube player is ready
    const t1 = setTimeout(apply, 700);
    const t2 = setTimeout(apply, 1600);
    return () => { io.disconnect(); clearTimeout(t1); clearTimeout(t2); };
  }, [youtubeId]);

  const loopArgs = loop ? `&loop=1&playlist=${youtubeId}` : '';
  const src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1&vq=hd1080&enablejsapi=1${loopArgs}`;
  return (
    <div ref={boxRef} className={className}
      style={{ position: 'relative', aspectRatio: portrait ? '9/16' : '16/9',
        maxWidth: portrait ? 'min(420px, 100%)' : undefined,
        overflow: 'hidden', background: '#000', ...(style || {}) }}>
      <iframe ref={iframeRef} src={src} title={title} frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
    </div>
  );
}
