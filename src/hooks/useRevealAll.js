import { useEffect } from 'react';

/* Adds .in to every .hm-rv inside root when it scrolls into view (once). */
export function useRevealAll(root, deps = []) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = el.querySelectorAll('.hm-rv');
    if (!('IntersectionObserver' in window)) { items.forEach(i => i.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .15, rootMargin: '0px 0px -8% 0px' });
    items.forEach(i => io.observe(i));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
