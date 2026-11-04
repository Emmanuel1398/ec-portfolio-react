import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSeoContext } from '../providers/SeoProvider';
import { homeSeo } from '../seo/pages';
import { HOME_BIO, HOME_STATS, HOME_WORK, HOME_SOFTWARE } from '../data/home';
import { useRevealAll } from '../hooks/useRevealAll';
import EnterGate from '../components/EnterGate';
import { rememberBack, clearBack } from '../lib/backTo';

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/* ─────────────────────────────────────────────────────────────
   HOME · scroll triggers (one rAF-throttled scroll handler):
   1. the hero name lifts out and glides into the nav logo slot
   2. the showreel still is pinned and grows to fill the screen
   3. the portrait drifts slightly slower than the page
   4. the page colour shifts per section (cream for Software)
   ───────────────────────────────────────────────────────────── */
export default function HomePage() {
  const { updateSeo } = useSeoContext();
  const { hash, key } = useLocation();
  const root = useRef(null);

  useEffect(() => { updateSeo(homeSeo()); }, [updateSeo]);
  useEffect(() => { clearBack(); }, []);   /* a fresh visit to Home resets where the back arrow leads */
  useRevealAll(root);

  /* /#work from the nav: scroll to the work section (after App's scroll-to-top) */
  useEffect(() => {
    if (hash !== '#work') return;
    const t = setTimeout(() => {
      const el = document.getElementById('work');
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 40, behavior: 'smooth' });
    }, 80);
    return () => clearTimeout(t);
  }, [hash, key]);

  /* count-up stats (after the landing gate, when it is showing) */
  useEffect(() => {
    const els = root.current.querySelectorAll('[data-count]');
    let raf;
    const run = () => {
      const t1 = performance.now();
      const step = (now) => {
        const p = Math.min((now - t1) / 1400, 1);
        els.forEach(b => { b.firstChild.nodeValue = Math.round(+b.dataset.count * easeOut(p)); });
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const gated = document.body.classList.contains('gate-open');
    if (gated) window.addEventListener('ec:entered', run, { once: true }); else run();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('ec:entered', run); };
  }, []);

  /* scroll-driven animations */
  useEffect(() => {
    const $ = (id) => document.getElementById(id);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const words = [['hmBrandA', 'hmNameA', 'navSlotA'], ['hmBrandB', 'hmNameB', 'navSlotB']].map(ids => ids.map($));
    const brand = $('hmBrand'), tint = $('hmTint'), rev = $('hmReveal'), pImg = $('hmPortraitImg'), portrait = $('hmPortrait');
    let ticking = false;

    const frame = () => {
      ticking = false;
      const vh = window.innerHeight, vw = window.innerWidth;

      /* 1 · name → logo */
      const dist = Math.max(220, Math.min(380, vh * .36));
      const e = reduce ? 1 : easeOut(clamp(window.scrollY / dist));
      words.forEach(([b, h, s]) => {
        if (!b || !h || !s) return;
        const f = h.getBoundingClientRect(), t = s.getBoundingClientRect();
        const big = parseFloat(getComputedStyle(h).fontSize), small = parseFloat(getComputedStyle(s).fontSize);
        b.style.fontSize = lerp(big, small, e) + 'px';
        b.style.transform = `translate(${lerp(f.left, t.left, e)}px,${lerp(f.top, t.top, e)}px)`;
      });
      brand && brand.classList.add('ready');

      if (!reduce) {
        /* 2 · pinned reveal */
        if (rev) {
          const r = rev.getBoundingClientRect(), total = r.height - vh;
          const p = clamp(-r.top / total), k = easeOut(clamp(p / .75));
          rev.style.setProperty('--ci', lerp(22, 0, k) + '%');
          rev.style.setProperty('--cx', lerp(vw < 700 ? 8 : 30, 0, k) + '%');
          rev.style.setProperty('--cr', lerp(14, 0, k) + 'px');
          rev.style.setProperty('--sc', lerp(1.25, 1, k));
          rev.style.setProperty('--o', clamp((p - .55) / .3));
        }
        /* 3 · parallax */
        if (portrait && pImg) {
          const pr = portrait.getBoundingClientRect();
          pImg.style.transform = `translateY(${clamp((pr.top + pr.height / 2 - vh / 2) / vh, -1, 1) * -24}px)`;
        }
      }

      /* 4 · page colour per section */
      let col = 'rgba(6,6,6,0)';
      root.current?.querySelectorAll('[data-bg]').forEach(s => {
        if (s.getBoundingClientRect().top < vh * .55) col = s.dataset.bg;
      });
      if (tint) tint.style.backgroundColor = col;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    frame();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    document.fonts?.ready.then(onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  return (
    <div className="page hm" ref={root}>
      <EnterGate />
      <div className="hm-tint" id="hmTint" aria-hidden="true" />

      {/* the two words that fly into the nav logo */}
      <div className="hm-brand" id="hmBrand" aria-hidden="true">
        <span id="hmBrandA" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Emmanuel</span>
        <span id="hmBrandB" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Chege</span>
      </div>

      {/* 1 · HERO */}
      <section className="hm-hero" data-bg="rgba(6,6,6,0)">
        <div>
          <h1 className="hm-name"><span id="hmNameA">Emmanuel</span><span id="hmNameB">Chege</span></h1>
          <div className="hm-titles hm-rv"><span>3D Generalist</span><span>Motion Graphics Artist</span></div>
          <p className="hm-bio hm-rv hm-d1" dangerouslySetInnerHTML={{ __html: HOME_BIO }} />
          <div className="hm-cta hm-rv hm-d2">
            <Link to="/showreel" className="hm-btn gold">
              <svg width="9" height="11" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true"><path d="M0 0l10 6-10 6z"/></svg>
              Watch the Showreel
            </Link>
            <Link to="/#work" className="hm-btn line">See the Work</Link>
          </div>
          <div className="hm-stats hm-rv hm-d3">
            {HOME_STATS.map(s => (
              <div key={s.label}><b data-count={s.n}>0{s.plus && <em>+</em>}</b><span>{s.label}</span></div>
            ))}
          </div>
        </div>
        <figure className="hm-portrait hm-frame hm-rv hm-d1" id="hmPortrait">
          <img src="/home/portrait.jpg" alt="Emmanuel Chege, 3D generalist and motion graphics artist in Nairobi" id="hmPortraitImg" width="1100" height="1375" fetchpriority="high" />
          <span className="hm-corner tl" /><span className="hm-corner br" />
          <figcaption>Nairobi, Kenya</figcaption>
          <div className="hm-mask" />
        </figure>
      </section>

      {/* 2 · SHOWREEL REVEAL */}
      <section className="hm-reveal" id="hmReveal" data-bg="#050505">
        <div className="hm-pin">
          <div className="hm-media"><img src="/home/reel-poster.jpg" alt="" loading="lazy" /></div>
          <div className="hm-media-edge" aria-hidden="true" />
          <span className="hm-side l">Showreel</span><span className="hm-side r">2024 / 2025</span>
          <div className="hm-over">
            <div>Showreel 2024 / 2025</div>
            <h2 className="hm-h2">One cut. <em>Every craft.</em></h2>
            <Link to="/showreel" aria-label="Watch the showreel">
              <div className="hm-play"><svg width="24" height="26" viewBox="0 0 10 12" aria-hidden="true"><path d="M0 0l10 6-10 6z"/></svg></div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3 · WORK */}
      <section className="hm-sec hm-work" id="work" data-bg="#060606">
        <div className="hm-work-head">
          <div className="hm-rv">
            <div>Work</div>
            <h2 className="hm-h2 hm-one"><span className="hm-line"><span>Eight ways I <em>create</em></span></span></h2>
          </div>
          <p className="hm-lede hm-rv hm-d1" style={{ maxWidth: 360 }}>Every section of the portfolio, all in view. Choose one to open its page.</p>
        </div>
        <div className="hm-grid">
          {HOME_WORK.map((w, i) => (
            <Link key={w.to} to={w.to} className="hm-card hm-rv" data-back-to="/#work" onClick={() => rememberBack(w.to)}
              style={{ transitionDelay: `${(i % 2) * .12}s` }}>
              <div className="im">
                {w.remote && <div className="dots" />}
                <img src={w.img} alt={w.alt} loading="lazy" width="1000" height="1250"
                  onError={w.remote ? (e) => e.currentTarget.remove() : undefined} />
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="enter" aria-hidden="true">Enter Page <span>→</span></span>
              </div>
              <div className="meta"><h3>{w.title}</h3><span className="c">{w.count}</span></div>
              <p>{w.desc}</p>
              <span className="go">View page <span>→</span></span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4 · SOFTWARE & EXPERTISE */}
      <section className="hm-sec hm-light" data-bg="#0c0a07">{/* cream comes from the section itself, so the cards above never sit on cream */}
        <div className="hm-rv">
          <div>Capabilities</div>
          <h2 className="hm-h2 hm-one"><span className="hm-line"><span>Software &amp; <em>Expertise</em></span></span></h2>
        </div>
        <div className="hm-sw">
          {HOME_SOFTWARE.map((c, i) => (
            <div key={c.category} className="hm-rv" style={{ transitionDelay: `${(i % 4) * .1}s` }}>
              <div className="cat">{c.category}</div>
              <ul>{c.tools.map(t => <li key={t}>{t}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* 5 · CONTACT */}
      <section className="hm-ctabig" data-bg="#060606">
        <div className="hm-rv">Contact</div>
        <h2 className="hm-h2 hm-rv"><span className="hm-line"><span>Have a project</span></span><span className="hm-line"><span>or a role <em>in mind?</em></span></span></h2>
        <div className="hm-rv hm-d2"><Link to="/contact" className="hm-btn gold">Contact Me →</Link></div>
      </section>
    </div>
  );
}
