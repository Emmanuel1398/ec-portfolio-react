import { SOCIAL } from '../data/portfolio';
import RightsFootnote from './RightsFootnote';

const SOCIALS = [
  ['Instagram', SOCIAL.instagram], ['TikTok', SOCIAL.tiktok], ['ArtStation', SOCIAL.artstation],
  ['LinkedIn', SOCIAL.linkedin], ['YouTube', SOCIAL.youtube],
];

/* socials on the left, name on the right */
export default function SiteFooter() {
  return (
    <footer className="hm-footer">
      <div className="hm-ft">
        <div className="hm-ft-soc">
          {SOCIALS.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>)}
        </div>
        <div className="hm-ft-name">Emmanuel <em>Chege</em><small>3D Generalist · Motion Graphics Artist</small></div>
      </div>
      <div className="hm-ft-base"><span>© {new Date().getFullYear()} · emmanuelchege.com</span><span>Nairobi, Kenya</span></div>
      {/* Notice links, centred on the last line. Renders itself only on
          the pages that carry rights language (see RightsFootnote). */}
      <RightsFootnote />
    </footer>
  );
}
