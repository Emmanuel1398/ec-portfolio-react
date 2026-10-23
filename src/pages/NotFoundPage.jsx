import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSeoContext } from '../providers/SeoProvider';
import { notFoundSeo } from '../seo/pages';
import { NAV_LINKS } from '../data/nav';
import './category.css';

/* Unknown URLs: noindex, plus links back into the site.
   Vercel serves dist/404.html (with a real 404 status) for paths
   that have no prerendered page; this renders inside it. */
export default function NotFoundPage() {
  const { updateSeo } = useSeoContext();
  useEffect(() => { updateSeo(notFoundSeo()); }, [updateSeo]);
  return (
    <div className="page">
      <div className="blog-wrap">
        <h1 className="sec-title">Page not <em>found</em></h1>
        <p style={{ color:'var(--muted)', marginTop:'1.5rem' }}>This page does not exist.</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'1rem 1.8rem', marginTop:'2.5rem' }}>
          {NAV_LINKS.map(l => <Link key={l.to} to={l.to} className="blog-back">{l.label}</Link>)}
        </div>
      </div>
    </div>
  );
}
