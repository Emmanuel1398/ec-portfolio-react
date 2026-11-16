import { Link, useLocation } from 'react-router-dom';
import { POLICY_FOOTER_LINKS } from '../data/policies';

/* ─────────────────────────────────────────────────────────────
   RIGHTS FOOTNOTE · the centred row of notice links that sits on
   the very last line of the site footer, under the copyright.

   It is rendered once, by <SiteFooter/>, and only on the pages
   that carry rights language:

     · 3D Characters, and every character breakdown
     · Drawings & Illustrations (the landing page only)
     · Asili Homes visualization
     · Lamborghini visualization

   Everything else is fully commissioned work and shows no notice
   links at all. The cracker blogs under /drawings-illustrations/
   are commissioned, so the landing page is matched exactly while
   its child routes are not.
   ───────────────────────────────────────────────────────────── */

const EXACT = ['/drawings-illustrations'];
const PREFIX = ['/characters'];                       /* the page and its blogs */
const WORKS = [
  '/visualization/asili-homes-3d-visualization',
  '/visualization/lamborghini-3d-visualization',
];

function pathCarriesRights(pathname = '') {
  const p = pathname.replace(/\/+$/, '') || '/';
  if (EXACT.includes(p) || WORKS.includes(p)) return true;
  return PREFIX.some(s => p === s || p.startsWith(s + '/'));
}

export default function RightsFootnote() {
  const { pathname } = useLocation();
  if (!pathCarriesRights(pathname)) return null;
  /* the <style> stays outside the row: inside, it would be a flex item
     and the centring would count it as one more gap */
  return (
    <>
      <style>{RT_CSS}</style>
      <nav className="rt-foot" aria-label="Rights and policies">
        <span className="rt-t">Rights &amp; Policies</span>
        {POLICY_FOOTER_LINKS.map(p => (
          <Link key={p.slug} to={`/${p.slug}`}>{p.label}</Link>
        ))}
      </nav>
    </>
  );
}

const RT_CSS = `
.rt-foot{margin-top:1.1rem;padding-top:1.1rem;border-top:1px solid var(--border);
  display:flex;flex-wrap:wrap;align-items:baseline;justify-content:center;
  gap:.55rem 1.4rem;text-align:center;}
.rt-foot .rt-t{font-family:var(--ui);font-size:10px;letter-spacing:.2em;
  text-transform:uppercase;color:var(--dim);}
.rt-foot a{font-family:var(--ui);font-size:10px;letter-spacing:.16em;text-transform:uppercase;
  color:var(--muted);text-decoration:none;border-bottom:1px solid transparent;
  transition:color .25s,border-color .25s;}
.rt-foot a:hover{color:var(--gold);border-bottom-color:var(--gold);}
@media(max-width:720px){.rt-foot{gap:.5rem 1rem;}}
`;
