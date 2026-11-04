import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useScrolled } from '../hooks';
import { WORK_LINKS } from '../data/nav';
import { backTarget } from '../lib/backTo';
import s from './Nav.module.css';

/* Home · Showreel · Work (dropdown) · Contact Me
   On the home page the logo text is hidden: the big hero name flies into
   this exact spot as you scroll (see HomePage), so the slot only reserves
   the space and gives the animation its target. */
export default function Nav() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('ec:navstart', close);
    return () => window.removeEventListener('ec:navstart', close);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const linkCls = ({ isActive }) => `${s.link} ${isActive ? s.active : ''}`;

  return (
    <>
      <nav className={`${s.nav} ${scrolled ? s.solid : ''}`}>
        <div className={s.left}>
          {!isHome && (
            <Link to={backTarget(pathname)} className={s.back} aria-label="Back to the home page" title="Back to Home">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M19 12H5M11 5l-7 7 7 7"/></svg>
            </Link>
          )}
          <Link to="/" className={s.logo} aria-label="Emmanuel Chege, home" style={{ visibility: isHome ? 'hidden' : 'visible' }}>
            <span id="navSlotA">Emmanuel</span> <span id="navSlotB" className={s.gold}>Chege</span>
          </Link>
        </div>

        <div className={s.links}>
          <NavLink to="/" end className={linkCls}>Home</NavLink>
          <NavLink to="/showreel" className={linkCls}>Showreel</NavLink>
          <div className={s.dd}>
            <Link to="/#work" className={s.link}>Work<span className={s.car}>▼</span></Link>
            <div className={s.menu}>
              {WORK_LINKS.map(l => (
                <NavLink key={l.to} to={l.to} className={({ isActive }) => `${s.menuLink} ${isActive ? s.menuOn : ''}`}>{l.short || l.label}</NavLink>
              ))}
            </div>
          </div>
          <Link to="/contact" className={s.cta}>Contact Me</Link>
        </div>

        <button className={s.burger} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span/><span/><span/>
        </button>
      </nav>

      {open && (
        <div className={s.mobile} onClick={(e) => { if (e.target.closest('a')) setOpen(false); }}>
          <button className={s.close} aria-label="Close menu" onClick={() => setOpen(false)}>×</button>
          <Link to="/" className={s.mBig}>Home</Link>
          <Link to="/showreel" className={s.mBig}>Showreel</Link>
          <Link to="/#work" className={s.mBig}>Work</Link>
          <div className={s.mSub}>
            {WORK_LINKS.map(l => <Link key={l.to} to={l.to}>{l.short || l.label}</Link>)}
          </div>
          <Link to="/contact" className={s.cta} style={{ alignSelf:'flex-start', marginTop:'1rem' }}>Contact Me</Link>
        </div>
      )}
    </>
  );
}
