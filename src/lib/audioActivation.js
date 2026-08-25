/* Browsers block audio until the user makes a genuine gesture (click / key / tap).
   Calling unMute() before that gesture PAUSES the video — which is what caused the
   frozen hero + play button. This tracks the first real gesture so videos stay muted
   (and playing) until then, and can unmute safely afterwards. Scroll and mousemove
   are deliberately NOT counted — they are not valid activation gestures. */
let activated = false;
const listeners = new Set();
const EVENTS = ['pointerdown', 'keydown', 'touchstart'];

function fire() {
  if (activated) return;
  activated = true;
  listeners.forEach((fn) => { try { fn(); } catch (e) {} });
  listeners.clear();
  EVENTS.forEach((e) => window.removeEventListener(e, fire));
}

if (typeof window !== 'undefined') {
  EVENTS.forEach((e) => window.addEventListener(e, fire, { passive: true }));
}

export function isAudioActivated() { return activated; }
export function onAudioActivated(fn) {
  if (activated) { fn(); return () => {}; }
  listeners.add(fn);
  return () => listeners.delete(fn);
}
