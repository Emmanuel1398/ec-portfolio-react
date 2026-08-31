import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategory, getWork } from '../data/categories';
import './category.css';
import AutoVideo from '../components/AutoVideo';
import { SEO, BreadcrumbSchema } from '../providers/SeoProvider';
import site from '../config/site';

export default function WorkBlogPage({ slug }) {
  const { slug: workSlug } = useParams();
  const cat = getCategory(slug);
  const w = getWork(slug, workSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug, workSlug]);

  if (!cat || !w) return <div className="page"><div className="blog-wrap"><h1 className="sec-title">Not found</h1></div></div>;

  const pageTitle = `${w.title} | ${cat.label} | ${site.name}`;
  const canonicalUrl = `${site.url}${cat.route}/${w.slug}`;
  const metaDesc = w.description
    ? w.description.slice(0, 160).replace(/\n/g, ' ')
    : `${w.title} - ${cat.label} project by ${site.name}.`;
  const shareImage = w.img
    || (w.gallery?.[0] ? (typeof w.gallery[0] === 'string' ? w.gallery[0] : w.gallery[0].src) : null)
    || (w.youtubeId ? `https://img.youtube.com/vi/${w.youtubeId}/maxresdefault.jpg` : site.ogImage);

  return (
    <article className="page">
      <SEO
        title={pageTitle}
        description={metaDesc}
        canonical={canonicalUrl}
        image={shareImage}
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: site.url },
        { name: cat.label, url: `${site.url}${cat.route}` },
        { name: w.title, url: canonicalUrl }
      ]} />
      <div className="blog-wrap">
        <Link to={cat.route} className="blog-back">← {cat.label}</Link>
        {w.sub && <div className="cat-label" style={{ marginBottom: '1rem' }}>{w.sub}</div>}
        <h1 className="sec-title blog-title">{w.title}</h1>
        {[w.client, w.year, w.format].filter(Boolean).length > 0 && (
          <div className="blog-meta">{[w.client, w.year, w.format].filter(Boolean).map((m, i) => <span key={i}>{m}</span>)}</div>
        )}

        {w.youtubeId && (
          <AutoVideo youtubeId={w.youtubeId} title={w.title} className="blog-video" />
        )}

        {w.role && (<div className="blog-role"><span className="blog-role-k">My role</span><p>{w.role}</p></div>)}

        {w.description && (
          <div className="blog-body">
            {w.description.split('\n').filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
          </div>
        )}

        {w.extraVideos && w.extraVideos.length > 0 && w.extraVideos.map((ev, i) => (
          <div key={i} className="blog-extra">
            {ev.label && <div className="blog-extra-label">{ev.label}</div>}
            <AutoVideo youtubeId={ev.youtubeId} title={ev.label || w.title} className="blog-video" />
          </div>
        ))}

        {w.gallery && w.gallery.length > 0 && (
          <div className="blog-gallery">
            {w.gallery.map((g, i) => (
              <figure key={i}>
                <img src={typeof g === 'string' ? g : g.src} alt={typeof g === 'string' ? '' : (g.caption || '')} loading="lazy" />
                {g.caption && <figcaption>{g.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        {w.siteInstall && (
          <section className="blog-site">
            <h2 className="blog-site-h">{w.siteInstall.label || 'Site Installation Preview'}</h2>
            {(w.siteInstall.event || w.siteInstall.location) && (
              <div className="blog-site-meta">
                {[w.siteInstall.event, w.siteInstall.location].filter(Boolean).map((m, i) => <span key={i}>{m}</span>)}
              </div>
            )}
            <p className="blog-site-note">{w.siteInstall.note || 'Proof for client preview · the projection installed and running on site.'}</p>
            <div className="blog-site-row">
              {w.siteInstall.videos && w.siteInstall.videos.map((vid, i) => (
                <div key={'v' + i} className="blog-site-cell video">
                  <iframe src={`https://www.youtube.com/embed/${vid}?rel=0&modestbranding=1&controls=1&playsinline=1`}
                    title={`${w.title} · site installation`} frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              ))}
              {w.siteInstall.images && w.siteInstall.images.map((src, i) => (
                <figure key={'i' + i} className="blog-site-cell"><img src={src} alt={`${w.title} · site installation`} loading="lazy" /></figure>
              ))}
            </div>
          </section>
        )}

        <div className="blog-foot"><Link to={cat.route} className="blog-back">← Back to {cat.label}</Link></div>
      </div>
    </article>
  );
}
