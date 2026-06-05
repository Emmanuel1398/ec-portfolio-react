import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useScrolled } from '../hooks';
import s from './Nav.module.css';

export default function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const links = [
    { to:'/',           label:'Portfolio'     },
    { to:'/characters', label:'3D Characters' },
    { to:'/events',     label:'Event Videos'  },
    { to:'/contact',    label:'About'       },
  ];

  return (
    <nav className={`${s.nav} ${scrolled ? s.s : ''}`}>
      <NavLink to="/" className={s.logo}>
        <span className={s.logoMain}>Emmanuel Chege</span>
        <span className={s.logoSub}>3D Artist · Motion Designer · Nairobi</span>
      </NavLink>

      <ul className={`${s.links} hide-mobile`}>
        {links.map(l => (
          <li key={l.to}>
            <NavLink to={l.to} end={l.to==='/'} className={({isActive})=>`${s.link} ${isActive?s.active:''}`}>
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <button className={s.burger} onClick={() => setOpen(!open)}>
        <span/><span/><span/>
      </button>

      {open && (
        <div className={s.mobileMenu} onClick={() => setOpen(false)}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to==='/'} className={s.mobileLink}
              onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
