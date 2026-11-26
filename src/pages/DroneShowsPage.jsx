import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DroneFormations from '../components/DroneFormations';
import { DRONE_SHOWS } from '../data/portfolio';
import { useIntersection } from '../hooks';
import { useSeoContext } from '../providers/SeoProvider';
import { droneShowsSeo } from '../seo/pages';
import './category.css';

export default function DroneShowsPage() {
  const [r, v] = useIntersection();
  const [readMore, setReadMore] = useState(false);
  const { updateSeo } = useSeoContext();

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { updateSeo(droneShowsSeo()); }, [updateSeo]);

  return (
    <div className="page">
      {/* ── HEADER (matching Projection Mapping & category hubs) ── */}
      <div ref={r} className={`wk-head rv ${v ? 'in' : ''}`}>
        <h1 className="sec-title wk-title">
          Drone <em>Shows</em>
        </h1>
        <div className="sec-rule">
          <p>· Aerial formation concepts and show narratives for state, cultural and brand events.</p>
        </div>
      </div>

      {/* ── EDITORIAL INTRO WITH READ MORE (matching Drawings & Illustrations) ── */}
      <div className="pg-wrap" style={{ paddingBottom: '2.5rem' }}>
        <div className="wk-intro" style={{ maxWidth: '840px' }}>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.8 }}>
            Each drone show begins as a narrative written on paper · a story, a script, a sequence
            of formations designed to tell a message in the night sky. These are those stories,
            from initial concept through storyboard to final computerised formation visual.
          </p>
          {readMore && (
            <p style={{ marginTop: '1.2rem', color: 'var(--muted)', lineHeight: 1.8 }}>
              My role is to translate ideas into compelling visual narratives. This involves developing
              the artistic and creative concept, writing the show script, designing the key imagery,
              and crafting the narration and voice-over that bring meaning to each formation and
              transition. Once the creative vision is fully defined, it is handed over to the drone
              show programmers, who transform the concept into a synchronized aerial performance.
            </p>
          )}
          <button
            type="button"
            className="fa-read-more"
            onClick={() => setReadMore(val => !val)}
            style={{
              marginTop: '1.2rem', background: 'none', border: 'none',
              fontFamily: 'var(--ui)', fontSize: '11px', letterSpacing: '.18em',
              textTransform: 'uppercase', color: 'var(--gold)', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '.4rem'
            }}
            aria-expanded={readMore}
          >
            {readMore ? 'Read less ↑' : 'Read more ↓'}
          </button>
        </div>
      </div>

      {/* ── 3-COLUMN ILM SHOW GRID (matching Projection Mapping screenshot) ── */}
      <div className="pg-wrap" style={{ paddingBottom: '6rem' }}>
        <div className="cat-grid">
          {DRONE_SHOWS.map((show) => {
            const thumb = show.thumb || (show.conceptYoutubeId ? `https://img.youtube.com/vi/${show.conceptYoutubeId}/hqdefault.jpg` : null);
            return (
              <Link key={show.id} to={`/drone-shows/${show.slug}`} className="ilm-card">
                <div className="ilm-card-media">
                  <img src={thumb} alt={show.title} loading="lazy" />
                </div>
                <div className="ilm-card-title">{show.title}</div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── DRONE FORMATION ANIMATION FEATURE ── */}
      <div className="pg-wrap" style={{ paddingBottom: '8rem' }}>
        <div style={{
          position: 'relative', height: 'clamp(320px, 50vh, 560px)', overflow: 'hidden',
          border: '1px solid rgba(201,169,110,.25)', pointerEvents: 'none',
          background: 'radial-gradient(120% 60% at 50% 88%, rgba(255,170,90,.12), transparent 60%),'
            + 'linear-gradient(180deg, #02040b 0%, #050b1d 38%, #0b1834 72%, #101c33 86%, #03060d 87%, #050a16 100%)',
          boxShadow: '0 40px 100px -40px rgba(0,0,0,.9)'
        }} aria-hidden="true">
          <DroneFormations />
          <div style={{ position: 'absolute', left: 0, right: 0, top: '7%', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
              fontWeight: 400, color: 'rgba(232,213,168,.65)',
              letterSpacing: '.1em', userSelect: 'none',
              textShadow: '0 0 18px rgba(201,169,110,.55), 0 0 40px rgba(201,169,110,.25)'
            }}>
              Formation · Flight · Light
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
