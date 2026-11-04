import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { rememberBack } from '../lib/backTo';

/* Gold transition between Home and any other page.
   On the home page, a click on any internal link to another page (except the
   Showreel, which opens straight away) plays the
   landing transition clip full screen; the new page is swapped in while the
   clip is at its brightest, then the clip fades away over it. */
const isBrowser = typeof window !== 'undefined';
const SRC = (() => {
  if (!isBrowser) return '';
  const small = window.matchMedia('(max-width: 900px)').matches;
  const v = document.createElement('video');
  const ext = v.canPlayType('video/mp4; codecs="avc1.640028"') ? 'mp4' : 'webm';
  return `/landing/landing-transition-${small ? '720' : '1080'}.${ext}`;
})();
const NO_TRANSITION = ['/showreel'];
const RATE = 1.2;            /* the 2.5 s clip plays in about 2.1 s */
const SWAP_AT = 1250;        /* ms: change page at the brightest moment */
const FADE_AT = 1650;        /* ms: start fading the clip out over the new page */

export default function PageTransition() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [phase, setPhase] = useState('idle');   // idle → on → out
  const vRef = useRef(null);
  const busy = useRef(false);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    if (pathname !== '/') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onClick = (e) => {
      if (busy.current || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (document.body.classList.contains('gate-open')) return;
      const a = e.target.closest('a[href]');
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === '/') return;   /* external, or stays on Home */
      if (NO_TRANSITION.includes(url.pathname)) return;                             /* the showreel opens directly */
      if (reduce) return;
      e.preventDefault(); e.stopPropagation();
      busy.current = true;
      if (a.dataset.backTo) rememberBack(url.pathname, a.dataset.backTo);
      window.dispatchEvent(new Event('ec:navstart'));   /* lets the mobile menu close */
      const to = url.pathname + url.search + url.hash;
      const v = vRef.current;
      if (v) { v.currentTime = 0; v.playbackRate = RATE; const p = v.play(); if (p && p.catch) p.catch(() => {}); }
      setPhase('on');
      const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
      later(() => navigate(to), SWAP_AT);
      later(() => setPhase('out'), FADE_AT);
      later(() => { setPhase('idle'); busy.current = false; }, FADE_AT + 750);
    };
    document.addEventListener('click', onClick, true);   /* capture: runs before the router's own link handling */
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname, navigate]);

  if (!SRC) return null;
  return (
    <div className={`hm-pt ${phase === 'on' ? 'on' : ''} ${phase === 'out' ? 'on out' : ''}`} aria-hidden="true">
      <video ref={vRef} src={SRC} muted playsInline preload={pathname === '/' ? 'auto' : 'none'} />
    </div>
  );
}
