import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategory, getWork } from '../data/categories';
import './category.css';
import AutoVideo from '../components/AutoVideo';
import AnswerBlock from '../components/AnswerBlock';
import { useSeoContext } from '../providers/SeoProvider';
import { workSeo, relatedWorks } from '../seo/pages';
import NotFoundPage from './NotFoundPage';

export default function WorkBlogPage({ slug }) {
  const { slug: workSlug } = useParams();
  const cat = getCategory(slug);
  const w = getWork(slug, workSlug);
  const { updateSeo } = useSeoContext();

  useEffect(() => {
    if (cat && w) updateSeo(workSeo(cat, w));
  }, [cat, w, updateSeo]);

  if (!cat || !w) return <NotFoundPage />;
  const related = relatedWorks(cat, w);
  return (
    <article className="page">
      <div className="blog-wrap">
        <Link to={cat.route} className="blog-back">← {cat.label}</Link>
        {w.sub && <div className="cat-label" style={{ marginBottom: '1rem' }}>{w.sub}</div>}
        <h1 className="sec-title blog-title">{w.title}</h1>
        {[w.client, w.year, w.format].filter(Boolean).length > 0 && (
          <div className="blog-meta">{[w.client, w.year, w.format].filter(Boolean).map((m, i) => <span key={i}>{m}</span>)}</div>
        )}
        <AnswerBlock summary={w.summary} />

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
                <img src={typeof g === 'string' ? g : g.src} alt={typeof g === 'string' ? `${w.title} · image ${i + 1}` : (g.caption || `${w.title} · image ${i + 1}`)} loading="lazy" />
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

        <AnswerBlock faqs={w.faqs} />

        {related.length > 0 && (
          <section className="blog-related">
            <h2 className="cat-group">More {cat.label}</h2>
            <div className="cat-grid">
              {related.map((o) => (
                <Link key={o.slug} to={`${cat.route}/${o.slug}`} className="ilm-card">
                  <div className="ilm-card-media"><img src={o.img} alt={o.title} loading="lazy" /></div>
                  <div className="ilm-card-title">{o.title}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="blog-foot">
          <Link to={cat.route} className="blog-back">← Back to {cat.label}</Link>
          <Link to="/contact" className="blog-back">Discuss a project like this →</Link>
        </div>
      </div>
    </article>
  );
}
