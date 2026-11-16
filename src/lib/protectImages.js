/* ─────────────────────────────────────────────────────────────
   IMAGE PROTECTION · makes the renders awkward to lift

   Applies to every <img> and <video> on the site, so new blogs are
   covered the moment they are added. Three doors are closed:

     · right-click / long-press on an image (context menu suppressed,
       so "Save image as" and "Copy image" never appear)
     · dragging an image out of the page onto the desktop
     · text selection around an image, which is how a drag usually starts

   This stops casual saving only. A screenshot, the browser's dev tools
   and the network tab are all still there, and nothing in a browser can
   change that. The real protection is the copyright notice, the No AI Use
   page and the crawler rules in robots.txt; this just removes the easy path.

   Listeners are attached once, in the capture phase on the document, so
   nothing has to be re-bound when React swaps a page.
   ───────────────────────────────────────────────────────────── */

const isMedia = (el) => !!el && typeof el.closest === 'function'
  && !!el.closest('img,video,picture,.cb-shot,.fa-slot,.cb-frame,.hm-card .im');

/* The one place a context menu is still useful: links and form fields. */
const isInteractiveText = (el) => !!el && typeof el.closest === 'function'
  && !!el.closest('a[href],input,textarea,[contenteditable="true"]');

let installed = false;

export function protectImages() {
  if (installed || typeof document === 'undefined') return;
  installed = true;

  document.addEventListener('contextmenu', (e) => {
    if (isInteractiveText(e.target)) return;
    if (isMedia(e.target)) e.preventDefault();
  }, { capture: true });

  document.addEventListener('dragstart', (e) => {
    const t = e.target;
    if (t && (t.tagName === 'IMG' || t.tagName === 'VIDEO' || isMedia(t))) e.preventDefault();
  }, { capture: true });
}

export default protectImages;
