/* Browsers block audio until the user makes a genuine gesture (click / key / tap).
   Calling unMute() before that gesture PAUSES the video — which is what caused the
   frozen hero + play button. This tracks the first real gesture so videos stay muted
   (and playing) until then, and can unmute safely afterwards. Scroll and mousemove
   are deliberately NOT counted — they are not valid activation gestures.
   While the landing gate is up, sound is held: stray clicks on it don't start the
   reel's audio — only its Enter button (releaseAudio) does. */
let activated = false;
let held = false;
const listeners = new Set();
const EVENTS = ['pointerdown', 'keydown', 'touchstart'];

const ready = () => activated && !held;

function fire() {
  if (!activated) {
    activated = true;
    EVENTS.forEach((e) => window.removeEventListener(e, fire));
  }
  if (!ready()) return;
  listeners.forEach((fn) => { try { fn(); } catch (e) {} });
  listeners.clear();
}

if (typeof window !== 'undefined') {
  EVENTS.forEach((e) => window.addEventListener(e, fire, { passive: true }));
}

export function isAudioActivated() { return ready(); }
export function onAudioActivated(fn) {
  if (ready()) { fn(); return () => {}; }
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/* Returns an undo that lifts the hold without starting sound (gate left without Enter) */
export function holdAudio() {
  held = true;
  return () => { held = false; };
}
/* The Enter click is itself the gesture: lift the hold and start sound */
export function releaseAudio() { held = false; fire(); }
