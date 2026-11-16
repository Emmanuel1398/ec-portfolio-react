import { Link } from 'react-router-dom';
import s from './BackLink.module.css';

/* Back to the parent section from a single item page (a character, a work,
   a drone show, an illustration). A gold ring with an arrow, plus a small
   "Back to" line over the section name. On hover the ring fills gold, the
   arrow slides left and the name turns gold. */
export default function BackLink({ to, label, eyebrow = 'Back to', className = '', style }) {
  return (
    <Link to={to} className={`${s.back} ${className}`} style={style} aria-label={`${eyebrow} ${label}`}>
      <span className={s.ring} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 12H5M11 5l-7 7 7 7" />
        </svg>
      </span>
      <span className={s.text}>
        <span className={s.eyebrow}>{eyebrow}</span>
        <span className={s.label}>{label}</span>
      </span>
    </Link>
  );
}
