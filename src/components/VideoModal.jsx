import { useEffect, useRef } from 'react';
import VolumeSlider from './VolumeSlider';

export default function VideoModal({ youtubeId, title, onClose }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // After iframe loads, set volume to 40% automatically
  const handleLoad = () => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    setTimeout(() => {
      win.postMessage(JSON.stringify({ event:'command', func:'unMute',    args:[] }), '*');
      win.postMessage(JSON.stringify({ event:'command', func:'setVolume', args:[40] }), '*');
    }, 800);
  };

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-frame" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {youtubeId ? (
          <>
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&controls=0&enablejsapi=1&modestbranding=1`}
              allowFullScreen
              allow="autoplay; encrypted-media"
              onLoad={handleLoad}
            />
            {/* Volume slider over the modal */}
            <div style={{ position:'absolute', bottom:'1rem', right:'1rem', zIndex:10 }}>
              <VolumeSlider iframeRef={iframeRef}/>
            </div>
          </>
        ) : (
          <div style={{
            width:'100%', height:'100%', background:'var(--bg2)',
            display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center',
            gap:'1rem', border:'1px solid var(--border)'
          }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:'1.5rem',
              fontWeight:300, color:'var(--muted)', textAlign:'center' }}>
              Video coming soon
            </div>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px',
              letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)' }}>
              {title}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
