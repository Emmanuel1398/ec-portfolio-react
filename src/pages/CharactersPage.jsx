import { Link } from 'react-router-dom';
import { useIntersection } from '../hooks';
import { CHARACTER_BLOGS } from '../data/characterBlogs';

function CharCard({ char, index }) {
  const [r, v] = useIntersection();
  return (
    <Link to={`/characters/${char.slug}`} ref={r}
      className={`rv d${Math.min(index % 4, 3)} ${v ? 'in' : ''}`}
      style={{ textDecoration:'none', display:'block' }}>
      <div style={{ position:'relative', overflow:'hidden', background:'var(--bg2)', aspectRatio:'3/4',
        border: char.hero ? 'none' : '1px dashed rgba(201,169,110,.3)' }}
        onMouseEnter={e => { const i=e.currentTarget.querySelector('img'); if(i) i.style.transform='scale(1.05)';
          e.currentTarget.querySelector('.char-overlay').style.opacity='1'; }}
        onMouseLeave={e => { const i=e.currentTarget.querySelector('img'); if(i) i.style.transform='scale(1)';
          e.currentTarget.querySelector('.char-overlay').style.opacity='0'; }}>

        {char.hero
          ? <img src={char.hero} alt={char.name} loading="lazy"
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center',
                display:'block', transition:'transform 1s cubic-bezier(0.16,1,0.3,1)' }}/>
          : <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center', gap:'.6rem' }}>
              <div style={{ fontFamily:'var(--serif)', fontSize:'1.6rem', color:'var(--gold2)' }}>{char.name}</div>
              <div style={{ fontFamily:'var(--ui)', fontSize:'10px', letterSpacing:'.16em',
                textTransform:'uppercase', color:'var(--dim)' }}>render coming soon</div>
            </div>}

        <div className="char-overlay" style={{ position:'absolute', inset:0,
          background:'linear-gradient(to top, rgba(6,6,6,.97) 0%, rgba(6,6,6,.5) 45%, transparent 75%)',
          opacity:0, transition:'opacity .4s', display:'flex', flexDirection:'column',
          justifyContent:'flex-end', padding:'1.8rem 1.5rem' }}>
          <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
            textTransform:'uppercase', color:'var(--gold)', marginBottom:'.4rem' }}>{char.category}</div>
          <div style={{ fontFamily:'var(--serif)', fontSize:'1.6rem', fontWeight:600,
            lineHeight:1.1, color:'var(--text)' }}>
            {char.name}<br/>
            <span style={{ color:'var(--gold)', fontSize:'1.05rem' }}>{char.epithet}</span>
          </div>
          <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.14em',
            color:'rgba(255,255,255,.4)', marginTop:'.6rem', display:'flex', gap:'1rem' }}>
            <span>{char.year}</span>
            {char.specs && char.specs.software &&
              <><span style={{ color:'var(--dim)' }}>·</span><span>{char.specs.software.slice(0,3).join(' · ')}</span></>}
          </div>
          <div style={{ marginTop:'1rem', fontFamily:'var(--ui)', fontSize:'12px',
            letterSpacing:'.18em', textTransform:'uppercase', color:'var(--gold)' }}>
            Read the Breakdown →
          </div>
        </div>

        <div style={{ position:'absolute', top:'1rem', left:'1.2rem', fontFamily:'var(--ui)', fontSize:'12px',
          letterSpacing:'.2em', color:'rgba(255,255,255,.3)' }}>{String(index + 1).padStart(2, '0')}</div>
      </div>
    </Link>
  );
}

export default function CharactersPage() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ padding:'9rem 5vw 3rem', maxWidth:'1500px', margin:'0 auto' }}>
        <div className="cat-label">3D Characters<span className="cat-num">{CHARACTER_BLOGS.length} Breakdowns</span></div>
        <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(3rem,7vw,8rem)', fontWeight:600,
          lineHeight:.92, letterSpacing:'.01em', color:'var(--text)', marginBottom:'1.5rem' }}>
          3D <em style={{ fontStyle:'normal', color:'var(--gold)' }}>Characters</em>
        </h1>
        <div style={{ width:60, height:1, background:'var(--gold)', marginBottom:'2rem' }}/>
        <p style={{ fontFamily:'var(--body)', fontWeight:300, fontSize:'clamp(1rem,1.2vw,1.15rem)',
          color:'var(--muted)', lineHeight:1.9, maxWidth:'640px' }}>
          In-depth technical breakdowns of my hyperreal, stylized and creature work — sculpt to look-development,
          with a focus on rendering melanated skin honestly. Each breakdown is built out across upcoming sessions;
          some sections are still being filled in.
        </p>
      </div>

      <div style={{ padding:'2rem 5vw 8rem', maxWidth:'1500px', margin:'0 auto',
        display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%,440px),1fr))', gap:'2rem' }}>
        {CHARACTER_BLOGS.map((char, i) => <CharCard key={char.slug} char={char} index={i} />)}
      </div>
    </div>
  );
}
