import { useEffect } from 'react';

/* Bump a Google-Drive thumbnail URL to a larger size for the zoom view.
   Local/bundled images (no &sz=) pass through unchanged — they're already full-res. */
export const hiRes = (src) =>
  typeof src === 'string' ? src.replace(/([?&]sz=)w\d+/, '$1w2048') : src;

/* Small magnifier-plus badge shown in the corner of a zoomable image */
export const ZoomBadge = () => (
  <span className="cb-zoom" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  </span>
);

/* Full-screen overlay that shows an image at full resolution */
export default function Lightbox({ src, caption, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <div onClick={onClose}
      style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(6,6,6,.96)',
        display:'flex', alignItems:'center', justifyContent:'center', padding:'4vmin', cursor:'zoom-out' }}>

      <img src={src} alt={caption || ''} onClick={(e) => e.stopPropagation()}
        style={{ maxWidth:'96vw', maxHeight:'90vh', objectFit:'contain', display:'block',
          boxShadow:'0 30px 120px rgba(0,0,0,.8)', cursor:'default' }} />

      <button onClick={onClose} aria-label="Close"
        style={{ position:'fixed', top:'1.4rem', right:'1.6rem', width:'44px', height:'44px',
          border:'1px solid rgba(201,169,110,.5)', background:'rgba(8,8,8,.6)', color:'var(--gold)',
          fontSize:'18px', lineHeight:1, cursor:'pointer', borderRadius:'2px',
          backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>

      {caption && (
        <div onClick={(e) => e.stopPropagation()}
          style={{ position:'fixed', bottom:'1.6rem', left:0, right:0, textAlign:'center',
            fontFamily:'var(--ui)', fontSize:'11px', letterSpacing:'.16em', textTransform:'uppercase',
            color:'rgba(255,255,255,.65)', pointerEvents:'none' }}>{caption}</div>
      )}
    </div>
  );
}
