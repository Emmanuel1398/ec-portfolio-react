import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useCursor } from './hooks';
import Nav from './components/Nav';
import { useSeoContext } from './providers/SeoProvider';
import HomePage from './pages/HomePage';
import ShowreelPage from './pages/ShowreelPage';
import SiteFooter from './components/SiteFooter';
import PageTransition from './components/PageTransition';
import CharactersPage from './pages/CharactersPage';
import DrawingsIllustrationsPage from './pages/DrawingsIllustrationsPage';
import IllustrationDetailPage from './pages/IllustrationDetailPage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import DroneShowsPage from './pages/DroneShowsPage';
import CategoryPage from './pages/CategoryPage';
import WorkBlogPage from './pages/WorkBlogPage';
import SocialPage from './pages/SocialPage';
import DroneShowDetailPage from './pages/DroneShowDetailPage';
import './styles/globals.css';
import './styles/mobile.css';
import './App.css';
import './styles/home.css';

/* Silk background behind every page: red for characters, projection,
   hologram and social; black-and-gold everywhere else. */
const RED_SECTIONS = ['/characters', '/projection', '/hologram', '/social'];
function SiteBackground() {
  const { pathname } = useLocation();
  const red = RED_SECTIONS.some(s => pathname === s || pathname.startsWith(s + '/'));
  const sharp = !red && pathname.replace(/\/$/, '') === '/contact'; // About & Contact keeps the unblurred silk
  return (
    <div className={`site-bg site-bg--${red ? 'red' : 'gold'}${sharp ? ' site-bg--sharp' : ''}`} aria-hidden="true">
      <div className="site-bg__img" />
      <div className="site-bg__shade" />
    </div>
  );
}

function GlobalFooter() {
  const loc = useLocation();
  if (loc.pathname === '/contact') return null;   /* About & Contact has its own footer */
  return <SiteFooter />;
}

export default function App() {
  const { dotRef, ringRef, hovered, setHovered } = useCursor();
  const loc = useLocation();
  const { seo } = useSeoContext();
  const lastView = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, [loc.pathname]);

  // Google Analytics: register a page_view on every SPA route change
  // (the gtag snippet in index.html only fires on the first load).
  // Waits until the new page has called updateSeo (seo.path matches), so
  // page_title is this page's title, not the previous one's.
  useEffect(() => {
    if (typeof window.gtag !== 'function' || seo.path !== loc.pathname) return;
    const key = loc.pathname + loc.search;
    if (lastView.current === key) return;
    lastView.current = key;
    window.gtag('event', 'page_view', {
      page_path: key,
      page_location: window.location.href,
      page_title: seo.title,
    });
  }, [seo.path, seo.title, loc.pathname, loc.search]);

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
      <SiteBackground />
      <Nav />
      <Routes>
        <Route path="/"                       element={<HomePage />} />
        <Route path="/showreel"               element={<ShowreelPage />} />
        <Route path="/characters"             element={<CharactersPage />} />
        <Route path="/characters/:slug"       element={<CharacterDetailPage />} />
        <Route path="/events"                 element={<CategoryPage slug="events" />} />
        <Route path="/events/:slug"           element={<WorkBlogPage slug="events" />} />
        <Route path="/contact"                element={<ContactPage />} />
        <Route path="/drone-shows"            element={<DroneShowsPage />} />
        <Route path="/drone-shows/:slug"      element={<DroneShowDetailPage />} />
        <Route path="/projection"            element={<CategoryPage slug="projection" />} />
        <Route path="/projection/:slug"      element={<WorkBlogPage slug="projection" />} />
        <Route path="/visualization"         element={<CategoryPage slug="visualization" />} />
        <Route path="/visualization/:slug"   element={<WorkBlogPage slug="visualization" />} />
        <Route path="/hologram"              element={<CategoryPage slug="hologram" />} />
        <Route path="/hologram/:slug"        element={<WorkBlogPage slug="hologram" />} />
        <Route path="/drawings-illustrations" element={<DrawingsIllustrationsPage />} />
        <Route path="/drawings-illustrations/:slug" element={<IllustrationDetailPage />} />
        <Route path="/social"                element={<SocialPage />} />
        <Route path="*"                      element={<NotFoundPage />} />
      </Routes>
      <GlobalFooter />
      <PageTransition />
    </>
  );
}
