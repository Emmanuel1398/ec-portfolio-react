import { Link } from 'react-router-dom';
import { useIntersection } from '../hooks';
import { CHARACTER_PROFILES } from '../data/portfolio';

/* Individual character card linking to detail page */
function CharCard({ char, index }) {
  const [r, v] = useIntersection();
  return (
    <Link to={`/characters/${char.slug}`}
      ref={r}
      className={`rv d${Math.min(index % 4, 3)} ${v ? 'in' : ''}`}
      style={{ textDecoration:'none', display:'block' }}>
      <div style={{ position:'relative', overflow:'hidden', background:'var(--bg2)', aspectRatio:'3/4' }}
        onMouseEnter={e => {
          e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
          e.currentTarget.querySelector('.char-overlay').style.opacity = '1';
        }}
        onMouseLeave={e => {
          e.currentTarget.querySelector('img').style.transform = 'scale(1)';
          e.currentTarget.querySelector('.char-overlay').style.opacity = '0';
        }}>
        <img src={char.heroImg} alt={char.name} loading="lazy"
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center',
            display:'block', transition:'transform 1s cubic-bezier(0.16,1,0.3,1)' }}/>

        {/* Gradient info overlay */}
        <div className="char-overlay"
          style={{ position:'absolute', inset:0,
            background:'linear-gradient(to top, rgba(6,6,6,.97) 0%, rgba(6,6,6,.5) 45%, transparent 75%)',
            opacity:0, transition:'opacity .4s', display:'flex', flexDirection:'column',
            justifyContent:'flex-end', padding:'1.8rem 1.5rem' }}>
          <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
            textTransform:'uppercase', color:'var(--gold)', marginBottom:'.4rem' }}>
            {char.category}
          </div>
          <div style={{ fontFamily:'var(--serif)', fontSize:'1.5rem', fontWeight:300,
            lineHeight:1.1, color:'var(--text)', marginBottom:'.4rem' }}>
            {char.name}<br/>
            <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.6)', fontSize:'1.1rem' }}>{char.subtitle}</em>
          </div>
          <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.14em',
            color:'rgba(255,255,255,.4)', marginTop:'.5rem', display:'flex', gap:'1rem' }}>
            <span>{char.year}</span>
            <span style={{ color:'var(--dim)' }}>·</span>
            <span>{char.specs.software.slice(0,3).join(' · ')}</span>
          </div>
          <div style={{ marginTop:'1rem', fontFamily:'var(--ui)', fontSize:'12px',
            letterSpacing:'.18em', textTransform:'uppercase', color:'var(--gold)',
            display:'flex', alignItems:'center', gap:'.4rem' }}>
            View Character →
          </div>
        </div>

        {/* Always-visible index */}
        <div style={{ position:'absolute', top:'1rem', left:'1.2rem',
          fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
          color:'rgba(255,255,255,.25)' }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Video indicator */}
        {char.videos.length > 0 && (
          <div style={{ position:'absolute', top:'1rem', right:'1.2rem',
            fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.14em',
            color:'rgba(201,169,110,.7)', background:'rgba(6,6,6,.7)',
            padding:'.2rem .5rem', backdropFilter:'blur(4px)' }}>
            {char.videos.length} VIDEO{char.videos.length > 1 ? 'S' : ''}
          </div>
        )}
      </div>
    </Link>
  );
}

export default function CharactersPage() {
  const [r, v] = useIntersection();
  return (
    <div style={{ minHeight:'100vh' }}>
      {/* Page header */}
      <div style={{ paddingTop:'11rem', paddingBottom:'5rem', paddingLeft:'5vw', paddingRight:'5vw',
        borderBottom:'1px solid var(--border)', background:'var(--bg)' }}>
        <div ref={r} className={`rv ${v ? 'in' : ''}`}>
          <div className="cat-label">Page 04 — 3D Character Archive
            <span className="cat-num">{CHARACTER_PROFILES.length} Characters</span>
          </div>
          <h1 className="sec-title" style={{ fontSize:'clamp(3rem,6vw,7rem)' }}>
            3D Character <em>Archive</em>
          </h1>
          <div style={{ marginTop:'1.5rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'end' }}>
            <p style={{ fontFamily:'var(--body)', fontSize:'1rem', color:'var(--muted)', lineHeight:1.9 }}>
              A complete catalogue of hyperrealistic characters, creatures and sculpts produced
              from 2023 to present. Each entry includes a full production write-up, sculpting
              process videos, wireframes, texture maps and technical specifications.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'1px',
              border:'1px solid var(--border)', background:'var(--border)' }}>
              {[['17+','Total Characters'],['5+','Years Production'],['Unreal 5 · ZBrush','Core Pipeline']].map(([n,l])=>(
                <div key={l} style={{ background:'var(--bg)', padding:'1.2rem 1rem' }}>
                  <div style={{ fontFamily:'var(--serif)', fontSize:'1.6rem', fontWeight:300,
                    color:'var(--text)', lineHeight:1 }}>
                    <em style={{ fontStyle:'normal', color:'var(--gold)' }}>{n}</em>
                  </div>
                  <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.16em',
                    textTransform:'uppercase', color:'var(--muted)', marginTop:'.3rem' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Characters grid */}
      <div style={{ padding:'5rem 5vw 8rem', background:'var(--bg)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'3px' }}>
          {CHARACTER_PROFILES.map((char, i) => (
            <CharCard key={char.slug} char={char} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
