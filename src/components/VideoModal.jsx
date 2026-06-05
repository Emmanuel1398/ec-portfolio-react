import { useEffect, useRef } from 'react';

/**
 * Full-screen YouTube modal.
 * Starts playback at 40% volume via the iframe API.
 */
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

  // Once iframe loads, set volume to 40% via YouTube iframe API
  const handleLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    // Small delay so the player is fully initialised
    setTimeout(() => {
      try {
        iframe.contentWindow.postMessage(
          JSON.stringify({ event:'command', func:'unMute',    args:[] }), '*'
        );
        iframe.contentWindow.postMessage(
          JSON.stringify({ event:'command', func:'setVolume', args:[40] }), '*'
        );
      } catch (_) {}
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
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&controls=0&enablejsapi=1&modestbranding=1`}
            allowFullScreen
            allow="autoplay; encrypted-media"
            onLoad={handleLoad}
          />
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
            <div style={{ fontFamily:'var(--ui)', fontSize:'11px',
              letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)' }}>
              {title}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
