import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useCursor } from './hooks';
import Nav from './components/Nav';
import HomePage from './pages/HomePage';
import CharactersPage from './pages/CharactersPage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import EventVideosPage from './pages/EventVideosPage';
import ContactPage from './pages/ContactPage';
import DroneShowsPage from './pages/DroneShowsPage';
import DroneShowDetailPage from './pages/DroneShowDetailPage';
import './styles/globals.css';
import './styles/mobile.css';
import './App.css';

const TICKER_ITEMS = [
  {t:'Yearly Portfolio Reels', g:true }, {t:'3D Characters',           g:false},
  {t:'Drone Show Concepts',    g:true }, {t:'Event Visualization',     g:false},
  {t:'Hologram Video Content', g:true }, {t:'Product Visualization',   g:false},
  {t:'Projection Mapping',     g:true }, {t:'Social Media Content',    g:false},
  {t:'emmanuelchege.com',      g:true },
];

function Ticker() {
  const all = [...TICKER_ITEMS,...TICKER_ITEMS];
  return (
    <div className="ticker">
      <div className="ticker-t">
        {all.map((item,i) => <span key={i} className={`t-item${item.g?' g':''}`}>{item.t}</span>)}
      </div>
    </div>
  );
}

function GlobalFooter() {
  const loc = useLocation();
  if (loc.pathname === '/contact') return null;
  return (
    <footer style={{ padding:'2.2rem 5vw', borderTop:'1px solid var(--border)',
      display:'grid', gridTemplateColumns:'1fr auto 1fr',
      alignItems:'center', gap:'2rem', background:'var(--bg)' }}>
      <div style={{ fontFamily:'var(--serif)', fontSize:'1.1rem', fontWeight:600,
        letterSpacing:'.1em', color:'var(--muted)' }}>
        Emmanuel <em style={{ fontStyle:'normal', color:'var(--gold)' }}>Chege</em>
      </div>
      <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.16em',
        textTransform:'uppercase', color:'var(--dim)', textAlign:'center' }}>
        © 2025 · emmanuelchege.com · Nairobi, Kenya
      </div>
      <div style={{ display:'flex', gap:'1.8rem', justifyContent:'flex-end' }}>
        {[['Instagram','https://www.instagram.com/arte_artorius/'],['ArtStation','https://www.artstation.com/emmanuel_chege'],['LinkedIn','https://www.linkedin.com/in/emmanuelchegekamau'],['YouTube','https://youtu.be/gmiQ0bNoPgQ']].map(([l,h])=>(
          <a key={l} href={h} target="_blank" rel="noreferrer"
            style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.16em',
              textTransform:'uppercase', color:'var(--muted)', textDecoration:'none', transition:'color .2s' }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'}
            onMouseLeave={e=>e.currentTarget.style.color='var(--muted)'}>{l}</a>
        ))}
      </div>
    </footer>
  );
}

function BottomStrip() {
  return <Ticker />;
}

export default function App() {
  const { dotRef, ringRef, hovered, setHovered } = useCursor();
  const loc = useLocation();

  useEffect(() => { window.scrollTo(0, 0); }, [loc.pathname]);

  // Google Analytics: register a page_view on every SPA route change
  // (the gtag snippet in index.html only fires on the first load).
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: loc.pathname + loc.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [loc.pathname, loc.search]);

  useEffect(() => {
    const over = () => setHovered(true);
    const out  = () => setHovered(false);
    const attach = () => {
      document.querySelectorAll('a,button,.h-item,.video-card').forEach(el => {
        el.removeEventListener('mouseenter', over);
        el.removeEventListener('mouseleave', out);
        el.addEventListener('mouseenter', over);
        el.addEventListener('mouseleave', out);
      });
    };
    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList:true, subtree:true });
    return () => obs.disconnect();
  }, [setHovered, loc.pathname]);

  return (
    <>
      <div ref={dotRef} className="c-dot"/>
      <div ref={ringRef} className={`c-ring${hovered?' on':''}`}/>
      <Nav />
      <Routes>
        <Route path="/"                       element={<HomePage />} />
        <Route path="/characters"             element={<CharactersPage />} />
        <Route path="/characters/:slug"       element={<CharacterDetailPage />} />
        <Route path="/events"                 element={<EventVideosPage />} />
        <Route path="/contact"                element={<ContactPage />} />
        <Route path="/drone-shows"            element={<DroneShowsPage />} />
        <Route path="/drone-shows/:slug"      element={<DroneShowDetailPage />} />
      </Routes>
      <BottomStrip />
      <GlobalFooter />
    </>
  );
}
