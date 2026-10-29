import { useState, useEffect, useRef } from 'react';
import './EnterGate.css';

/* Module-level so the gate shows once per full page load (the click satisfies the
   browser's audio-activation requirement and starts the reel WITH sound), but does
   not reappear on in-app navigation back to Home. A real refresh resets it. */
let hasEntered = false;

/* Animated landing background (219-frame silk loop) and the Enter transition
   (120 frames played at 48fps = 2.5s) are encoded as MP4 in /public/landing.
   Small screens get the 720p versions. */
const isBrowser = typeof window !== 'undefined';
const small = isBrowser && window.matchMedia('(max-width: 900px)').matches;
/* MP4 (H.264) where supported, WebM (VP9) otherwise */
const ext = (() => {
  if (!isBrowser) return 'mp4';
  const v = document.createElement('video');
  return v.canPlayType('video/mp4; codecs="avc1.640028"') ? 'mp4' : 'webm';
})();
const size = small ? '720' : '1080';
const BG_SRC = `/landing/landing-bg-${size}.${ext}`;
const TR_SRC = `/landing/landing-transition-${size}.${ext}`;
const POSTER = '/landing/landing-bg-poster.jpg';

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function EnterGate() {
  const [show, setShow] = useState(!hasEntered);
  const [phase, setPhase] = useState('idle'); // idle → transition → leave
  const bgRef = useRef(null);
  const trRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [show]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  /* some browsers ignore autoplay until play() is called */
  useEffect(() => {
    const v = bgRef.current;
    if (v) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
  }, []);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const finish = () => { setShow(false); document.body.style.overflow = ''; };

  const leave = () => {
    setPhase('leave');                       // gate + transition fade out to the site
    later(finish, 900);
  };

  const enter = () => {
    if (phase !== 'idle') return;
    hasEntered = true;
    const tr = trRef.current;
    if (!tr || reduceMotion()) { leave(); return; }

    setPhase('transition');                  // content fades, transition fades in
    tr.currentTime = 0;
    const started = tr.play();
    let done = false;
    const end = () => { if (!done) { done = true; leave(); } };
    // begin the fade-out a little before the clip ends so it dissolves into the site
    const scheduleFromDuration = () => {
      const ms = Math.max(600, ((tr.duration || 2.5) - 0.55) * 1000);
      later(end, ms);
    };
    if (started && started.then) started.then(scheduleFromDuration).catch(end);
    else scheduleFromDuration();
    later(end, 4000);                        // safety net if the video stalls
  };

  if (!show) return null;

  return (
    <div className={`gate gate--${phase}`}>
      <video ref={bgRef} className="gate-bg" src={BG_SRC} poster={POSTER}
        autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
      <div className="gate-shade" aria-hidden="true" />

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

      <video ref={trRef} className="gate-transition" src={TR_SRC}
        muted playsInline preload="auto" aria-hidden="true" />
    </div>
  );
}
