import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DRONE_SHOWS } from '../data/portfolio';
import AutoVideo from '../components/AutoVideo';
import BackLink from '../components/BackLink';
import AnswerBlock from '../components/AnswerBlock';
import { useSeoContext } from '../providers/SeoProvider';
import { droneSeo } from '../seo/pages';
import NotFoundPage from './NotFoundPage';
import './category.css';

export default function DroneShowDetailPage() {
  const { slug } = useParams();
  const show = DRONE_SHOWS.find(s => s.slug === slug);
  const currentIndex = DRONE_SHOWS.findIndex(s => s.slug === slug);
  const prevShow = DRONE_SHOWS[currentIndex - 1] || null;
  const nextShow = DRONE_SHOWS[currentIndex + 1] || null;
  const relatedShows = DRONE_SHOWS.filter(s => s.slug !== slug).slice(0, 3);
  const { updateSeo } = useSeoContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (show) updateSeo(droneSeo(show));
  }, [slug, show, updateSeo]);

  if (!show) return <NotFoundPage />;

  const primaryVideoId = show.visualizerYoutubeId || show.conceptYoutubeId || null;
  const hasSecondaryVideo = show.visualizerYoutubeId && show.conceptYoutubeId;

  return (
    <article className="page">
      <div className="blog-wrap">
        {/* Back navigation */}
        <BackLink to="/drone-shows" label="Drone Shows" className="blog-backlink" />

        {/* Category & Scope Eyebrow */}
        <div className="cat-label" style={{ marginBottom: '1rem' }}>
          <span>{show.client}</span>
          <span>·</span>
          <span>{show.location}</span>
          <span>·</span>
          <span>{show.year}</span>
          {show.drones && (
            <>
              <span>·</span>
              <span>{show.drones} Drones</span>
            </>
          )}
        </div>

        {/* Project Title */}
        <h1 className="sec-title blog-title">{show.title}</h1>

        {/* Metadata Row */}
        <div className="blog-meta">
          <span>{show.client}</span>
          <span>{show.location}</span>
          <span>{show.year}</span>
          {show.drones && <span>{show.drones} Drones Fleet</span>}
          <span>{show.status === 'completed' ? 'Produced Show' : 'Concept Proposal'}</span>
        </div>

        {/* SEO Summary */}
        <AnswerBlock summary={show.summary} />

        {/* Primary Lead Video */}
        {primaryVideoId ? (
          <AutoVideo
            youtubeId={primaryVideoId}
            title={show.visualizerYoutubeId ? `${show.title} · Formation Visual` : `${show.title} · Concept Video`}
            className="blog-video"
          />
        ) : (
          <div className="blog-video" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'var(--bg3)', border: '1px dashed rgba(201,169,110,.3)'
          }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', color: 'var(--gold)' }}>
              Formation Visual
            </div>
            <div style={{ fontFamily: 'var(--ui)', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '.5rem' }}>
              Concept in development
            </div>
          </div>
        )}

        {/* Role & Tagline */}
        {show.tagline && (
          <div className="blog-role">
            <span className="blog-role-k">Narrative &amp; Creative Direction</span>
            <p>{show.tagline}</p>
          </div>
        )}

        {/* Description Body */}
        {show.description && (
          <div className="blog-body">
            {show.description.split('\n').filter(Boolean).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {/* Secondary Concept Video (when both visualizer and concept videos exist) */}
        {hasSecondaryVideo && (
          <div className="blog-extra">
            <div className="blog-extra-label">Aerial Formation Concept Visual</div>
            <AutoVideo youtubeId={show.conceptYoutubeId} title={`${show.title} · Concept`} className="blog-video" />
          </div>
        )}

        {/* ── NARRATION / V.O. SCRIPT SECTION ── */}
        {show.script && show.script.length > 0 && (
          <section className="drone-script-wrap">
            <div className="drone-script-head">
              <div className="drone-script-kicker">02 · Narration / V.O. Script</div>
              <h2 className="drone-script-h">The <em>Script</em></h2>
              <p className="drone-script-note">
                The narration voice-over written to accompany the live performance — each section corresponding to a synchronized drone formation in the night sky.
              </p>
            </div>
            <div className="drone-script-list">
              {show.script.map((block, i) => (
                <div key={i} className="drone-script-card">
                  {block.section && (
                    <div className="drone-script-sec">
                      {String(i + 1).padStart(2, '0')} · {block.section}
                    </div>
                  )}
                  <p className="drone-script-text">{block.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <AnswerBlock faqs={show.faqs} />

        {/* ── MORE DRONE SHOWS (matching screenshot 1 style) ── */}
        {relatedShows.length > 0 && (
          <section className="blog-related">
            <h2 className="cat-group">More Drone Shows</h2>
            <div className="cat-grid">
              {relatedShows.map((other) => {
                const thumb = other.thumb || (other.conceptYoutubeId ? `https://img.youtube.com/vi/${other.conceptYoutubeId}/hqdefault.jpg` : null);
                return (
                  <Link key={other.slug} to={`/drone-shows/${other.slug}`} className="ilm-card">
                    <div className="ilm-card-media">
                      <img src={thumb} alt={other.title} loading="lazy" />
                    </div>
                    <div className="ilm-card-title">{other.title}</div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ── FOOTER ACTIONS ── */}
        <div className="blog-foot">
          <BackLink to="/drone-shows" label="Drone Shows" />
          <Link to="/contact" className="blog-back">Discuss a drone show concept →</Link>
        </div>

        {/* ── PREV / NEXT SHOW NAVIGATION ── */}
        <div className="blog-nav-row">
          {prevShow ? (
            <Link to={`/drone-shows/${prevShow.slug}`} className="blog-nav-link prev">
              <span className="blog-nav-dir">← Previous Show</span>
              <span className="blog-nav-title">{prevShow.title}</span>
            </Link>
          ) : <div />}
          {nextShow ? (
            <Link to={`/drone-shows/${nextShow.slug}`} className="blog-nav-link next">
              <span className="blog-nav-dir">Next Show →</span>
              <span className="blog-nav-title">{nextShow.title}</span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </article>
  );
}
