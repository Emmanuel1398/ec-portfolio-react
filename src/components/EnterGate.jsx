import { useState, useEffect } from 'react';
import './EnterGate.css';

/* Module-level so the gate shows once per full page load (the click satisfies the
   browser's audio-activation requirement and starts the reel WITH sound), but does
   not reappear on in-app navigation back to Home. A real refresh resets it. */
let hasEntered = false;

export default function EnterGate() {
  const [show, setShow] = useState(!hasEntered);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [show]);

  const enter = () => {
    hasEntered = true;
    setLeaving(true);
    setTimeout(() => { setShow(false); document.body.style.overflow = ''; }, 750);
  };

  if (!show) return null;

  return (
    <div className={`gate ${leaving ? 'gate--leave' : ''}`}>
      <div className="gate-inner">
        <div className="gate-eyebrow">Portfolio</div>
        <h1 className="gate-name">Emmanuel Chege</h1>
        <div className="gate-sub">3D Generalist · Motion Graphics Artist · Nairobi</div>
        <button className="gate-btn" onClick={enter}>
          <span>Enter</span>
          <svg width="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <div className="gate-hint">
          <svg width="12" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
          Best experienced with sound on
        </div>
      </div>
    </div>
  );
}
