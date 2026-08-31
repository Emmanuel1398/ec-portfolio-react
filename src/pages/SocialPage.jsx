import { useEffect } from 'react';
import { useIntersection } from '../hooks';
import { HoverVideoCard } from '../components/VideoRow';
import { SOCIAL_MEDIA_ROW1, SOCIAL_MEDIA_ROW2 } from '../data/portfolio';
import { SEO } from '../providers/SeoProvider';
import site from '../config/site';
import './category.css';

const ALL = [...SOCIAL_MEDIA_ROW1, ...SOCIAL_MEDIA_ROW2];

export default function SocialPage() {
  const [r, v] = useIntersection();
  const [r2, v2] = useIntersection();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="page">
      <SEO
        title={`Social Media Content | ${site.name}`}
        description="Branded motion graphics, GIF animations and social-first visual storytelling by Emmanuel Chege."
        canonical={`${site.url}/social`}
      />
      <div ref={r} className={`rv ${v ? 'in' : ''}`} style={{ padding: 'clamp(7rem,13vh,10rem) 5vw 3rem' }}>
        <div className="cat-label">Social Media Content<span className="cat-num">{ALL.length} Works</span></div>
        <h2 className="sec-title">Social Media <em>Content</em></h2>
        <div className="sec-rule">
          <p>· Branded motion graphics, GIF animations and social-first visual storytelling.</p>
          <a href="https://www.instagram.com/arte_artorius/" target="_blank" rel="noreferrer" className="sec-link">Follow @arte_artorius</a>
        </div>
      </div>
      <div ref={r2} className={`rv-img ${v2 ? 'in' : ''} social-grid`} style={{ padding: '0 5vw 8rem' }}>
        {ALL.map((item, i) => (
          <div className="social-cell" key={i}>
            <div className="social-video">
              <HoverVideoCard thumbnail={item.img} youtubeId={item.youtubeId} title={item.title} sub={item.sub} width="100%" height="100%" minWidth="0" sound />
            </div>
            <div className="social-title">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
