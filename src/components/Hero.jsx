import { useState, useRef, useEffect } from 'react';
import { REEL_SLIDES } from '../data/portfolio';
import s from './Hero.module.css';

export default function Hero() {
  const [cur, setCur] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const auto = useRef(null);
  const total = REEL_SLIDES.length;

  const goTo = (n) => {
    if (transitioning) return;
    setPlaying(false);
    setTransitioning(true);
    setTimeout(() => {
      setCur((n + total) % total);
      setTransitioning(false);
    }, 50);
    resetAuto();
  };

  const resetAuto = () => {
    clearInterval(auto.current);
    auto.current = setInterval(() => setCur(p => (p + 1) % total), 8000);
  };

  useEffect(() => { resetAuto(); return () => clearInterval(auto.current); }, []);

  const slide = REEL_SLIDES[cur];

  return (
    <section id="hero" className={s.hero}>
      {/* Background layers */}
      {REEL_SLIDES.map((sl, i) => (
        <div key={sl.id} className={`${s.bg} ${i === cur ? s.bgActive : ''}`}>
          <img src={sl.bg} alt="" className={s.bgImg} />
          <div className={s.bgScrim} />
        </div>
      ))}

      {/* Video iframe */}
      {playing && slide.youtubeId && (
        <div className={s.videoWrap}>
          <iframe
            className={s.iframe}
            src={`https://www.youtube.com/embed/${slide.youtubeId}?autoplay=1&rel=0&controls=0`}
            allowFullScreen allow="autoplay; encrypted-media"
          />
          <button className={s.close} onClick={() => setPlaying(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      )}

      {/* Content overlay */}
      {!playing && (
        <div className={s.content}>
          {/* Top left info */}
          <div className={s.topLeft}>
            <div className={s.slideLabel}>{slide.subtitle}</div>
            <div className={s.slideYear}>{slide.sub}</div>
          </div>

          {/* Center play */}
          {slide.youtubeId && (
            <button className={s.playBtn} onClick={() => { setPlaying(true); clearInterval(auto.current); }}>
              <div className={s.playCircle}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span className={s.playLabel}>Play Reel</span>
            </button>
          )}

          {!slide.youtubeId && slide.link && (
            <a href={slide.link} className={`btn-g ${s.viewAll}`}>View Characters</a>
          )}

          {/* Bottom title */}
          <div className={s.bottom}>
            <h1 className={s.mainTitle}>
              <span>{slide.title}</span>
              {slide.subtitle && <em>{slide.subtitle}</em>}
            </h1>
            <div className={s.controls}>
              <button className={s.arrow} onClick={() => goTo(cur - 1)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <div className={s.dots}>
                {REEL_SLIDES.map((_, i) => (
                  <button key={i} className={`${s.dot} ${i === cur ? s.dotOn : ''}`} onClick={() => goTo(i)} />
                ))}
              </div>
              <button className={s.arrow} onClick={() => goTo(cur + 1)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scroll hint */}
      {!playing && (
        <div className={s.scrollHint}>
          <span>Scroll</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      )}

      {/* Bottom info bar */}
      <div className={s.bar}>
        {['Nairobi, Kenya', 'Remote & Freelance', 'Characters · Drone · Projection', 'Maya · ZBrush · Unreal 5'].map(t => (
          <div key={t} className={s.barItem}>
            <span className={s.barDot}/>
            {t}
          </div>
        ))}
      </div>
    </section>
  );
}
