import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSeoContext } from '../providers/SeoProvider';
import { showreelSeo } from '../seo/pages';
import { REEL_SLIDES, OLDER_REELS } from '../data/portfolio';
import { useRevealAll } from '../hooks/useRevealAll';

const MAIN_REEL = REEL_SLIDES.find(s => s.youtubeId)?.youtubeId;
const embed = (id) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
const Play = ({ size = 26 }) => (
  <div className="hm-play"><svg width={size} height={size + 2} viewBox="0 0 10 12" aria-hidden="true"><path d="M0 0l10 6-10 6z"/></svg></div>
);

/* Main reel + previous reels. Nothing plays until the visitor presses play,
   so the reel starts with sound (the click is the browser's permission). */
export default function ShowreelPage() {
  const { updateSeo } = useSeoContext();
  const root = useRef(null);
  const [mainOn, setMainOn] = useState(false);
  const [olderOn, setOlderOn] = useState(null);

  useEffect(() => { updateSeo(showreelSeo()); }, [updateSeo]);
  useRevealAll(root);

  return (
    <div className="page hm" ref={root}>
      <header className="hm-pghead">
        <h1 className="hm-h2 hm-rv">Portfolio <em>Reel</em></h1>
        <p className="hm-lede hm-rv hm-d2" style={{ maxWidth: 'none' }}>2024 / 2025 · Characters, motion graphics and event work in one cut. Best with sound on.</p>
      </header>

      <section className="pg-wrap">
        <div className="hm-player hm-frame hm-rv">
          {mainOn ? (
            <iframe src={embed(MAIN_REEL)} title="Emmanuel Chege portfolio reel 2024 / 2025"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen />
          ) : (
            <>
              <img src="/home/reel-poster.jpg" alt="" />
              <button className="hm-gate" onClick={() => setMainOn(true)} aria-label="Play the showreel with sound">
                <Play size={26} /><span>Play with sound</span>
              </button>
            </>
          )}
        </div>
        <div className="hm-meta4 hm-rv">
          <div><span>Year</span>2024 / 2025</div>
          <div><span>Role</span>3D Generalist · Motion Design</div>
          <div><span>Core tools</span>Maya · Unreal · Arnold · AE</div>
          <div><span>Based in</span>Nairobi, Kenya</div>
        </div>
      </section>

      <section className="hm-sec">
        <div className="hm-rv"><div>Archive</div><h2 className="hm-h2">Previous <em>Reels</em></h2></div>
        <div className="hm-older hm-rv">
          {OLDER_REELS.map((r, i) => (
            <div key={r.youtubeId} className="hm-frame">
              {olderOn === i ? (
                <iframe src={embed(r.youtubeId)} title={r.title} allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen />
              ) : (
                <button onClick={() => setOlderOn(i)} aria-label={`Play ${r.title}`}>
                  <img src={r.img} alt="" loading="lazy" />
                  <Play size={18} />
                  <div className="cap"><small>{r.sub}</small>{r.title.replace('–', ' to ')}</div>
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="hm-ctabig" style={{ paddingTop: '4rem' }}>
        <h2 className="hm-h2" style={{ fontSize: 'clamp(2.6rem,5vw,4.6rem)' }}>Seen the reel? <em>Let's talk.</em></h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.6rem' }}>
          <Link to="/#work" className="hm-btn line" style={{ margin: 0 }}>See the Work</Link>
          <Link to="/contact" className="hm-btn gold" style={{ margin: 0 }}>Contact Me →</Link>
        </div>
      </section>
    </div>
  );
}
