/* Where the top-left back arrow leads.
   A work card on the home page records its section; while the visitor stays
   inside that section (its page or any of its blogs) the arrow returns to the
   Work section of the home page instead of the top of Home. */
const KEY = 'ec:back';

export function rememberBack(section, to = '/#work') {
  try { sessionStorage.setItem(KEY, JSON.stringify({ section, to })); } catch { /* storage blocked */ }
}
export function clearBack() {
  try { sessionStorage.removeItem(KEY); } catch { /* storage blocked */ }
}
export function backTarget(pathname) {
  try {
    const b = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    if (b && (pathname === b.section || pathname.startsWith(b.section + '/'))) return b.to;
  } catch { /* storage blocked */ }
  return '/';
}
