import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────
   CTA BACKGROUND · the black-and-gold silk loop, behind the
   "Have a project or a role in mind?" section.

   This is the clip that used to open the site on the enter gate.
   It moved down here when the gate took the gold ring instead.

   Three things keep it cheap:
     · it does not load at all until the section is close to the
       viewport, so it costs nothing on first paint
     · it pauses whenever the section scrolls away
     · with prefers-reduced-motion it never loads: the poster frame
       stands in, still, and that is the whole background

   The wash over it is what keeps the headline readable. The clip is
   already dark, so it is lighter than the one on the gate.
   ───────────────────────────────────────────────────────────── */

const isBrowser = typeof window !== 'undefined';
const small = isBrowser && window.matchMedia('(max-width: 900px)').matches;
const ext = (() => {
  if (!isBrowser) return 'mp4';
  const v = document.createElement('video');
  return v.canPlayType('video/mp4; codecs="avc1.640028"') ? 'mp4' : 'webm';
})();
const SRC = `/cta/cta-bg-${small ? '720' : '1080'}.${ext}`;
const POSTER = '/cta/cta-bg-poster.jpg';

const reduceMotion = () =>
  isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function CtaBackground() {
  const hostRef = useRef(null);
  const vidRef = useRef(null);
  /* Browsers without IntersectionObserver get the clip straight away;
     deciding that in the initial state rather than in the effect keeps
     it out of a synchronous setState on mount. */
  const [load, setLoad] = useState(
    () => isBrowser && !('IntersectionObserver' in window) && !reduceMotion());

  /* start loading a little before the section arrives, then play and
     pause it with visibility */
  useEffect(() => {
    const el = hostRef.current;
    if (!el || reduceMotion()) return;
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setLoad(true);
      const v = vidRef.current;
      if (!v) return;
      if (e.isIntersecting) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
      else v.pause();
    }, { rootMargin: '300px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="cta-bg" ref={hostRef} aria-hidden="true">
      <img className="cta-bg-poster" src={POSTER} alt="" />
      {load && (
        <video ref={vidRef} className="cta-bg-vid" src={SRC} poster={POSTER}
          autoPlay muted loop playsInline preload="metadata" />
      )}
      <div className="cta-bg-wash" />
    </div>
  );
}
