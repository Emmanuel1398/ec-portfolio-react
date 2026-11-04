import { useLayoutEffect } from 'react';

/* Layout offset from the top of the document. offsetTop ignores CSS transforms,
   so reveal animations (translateY until an element is in view) don't skew it. */
function docTop(el) {
  let y = 0;
  for (let n = el; n; n = n.offsetParent) y += n.offsetTop;
  return y;
}

/* Work-page first fold: size the header so the fold ends `gap` px below the bottom
   of the first row of images. The images keep their size; only the header's
   min-height changes, so its content should be pinned to the bottom (.wk-head).
   Desktop only: below `minWidth` the header keeps its natural height.

   headRef   the header element
   scopeRef  element holding the images (watched for size changes)
   selector  the image elements; those starting highest form the first row
   key       re-run when this changes (e.g. a route slug that swaps the grid) */
export function useFoldFit(headRef, scopeRef, selector, { gap = 10, minWidth = 901, key } = {}) {
  useLayoutEffect(() => {
    const head = headRef.current, scope = scopeRef.current;
    if (!head || !scope) return;
    let live = true;
    const fit = () => {
      if (!live) return;
      const imgs = [...scope.querySelectorAll(selector)];
      if (window.innerWidth < minWidth || !imgs.length) { head.style.minHeight = ''; return; }
      const tops = imgs.map(docTop);
      const top = Math.min(...tops);
      const bottom = Math.max(...imgs.filter((_, i) => tops[i] - top < 2)
        .map((el) => docTop(el) + el.offsetHeight));
      const headTop = docTop(head);
      const below = bottom - (headTop + head.offsetHeight);   /* independent of the header's height */
      const h = document.documentElement.clientHeight - gap - below - headTop;
      head.style.minHeight = h > 0 ? `${h}px` : '';
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(scope);
    window.addEventListener('resize', fit);
    document.fonts?.ready.then(fit);
    return () => { live = false; ro.disconnect(); window.removeEventListener('resize', fit); };
  }, [headRef, scopeRef, selector, gap, minWidth, key]);
}
