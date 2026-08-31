import { Link } from 'react-router-dom';
import { useIntersection } from '../hooks';
import { CHARACTER_BLOGS } from '../data/characterBlogs';

function CharCard({ char, index }) {
  const [r, v] = useIntersection();
  return (
    <Link to={`/characters/${char.slug}`} ref={r}
      className={`rv d${Math.min(index % 4, 3)} ${v ? 'in' : ''}`}
      style={{ textDecoration:'none', display:'block' }}>
      <div style={{ position:'relative', overflow:'hidden', background:'var(--bg2)', height:'100%',
        border: (char.thumb||char.hero) ? 'none' : '1px dashed rgba(201,169,110,.3)' }}
        onMouseEnter={e => { const i=e.currentTarget.querySelector('img'); if(i) i.style.transform='scale(1.05)';
          e.currentTarget.querySelector('.char-overlay').style.opacity='1';
          const b=e.currentTarget.querySelector('.char-status'); if(b) b.style.opacity='1'; }}
        onMouseLeave={e => { const i=e.currentTarget.querySelector('img'); if(i) i.style.transform='scale(1)';
          e.currentTarget.querySelector('.char-overlay').style.opacity='0';
          const b=e.currentTarget.querySelector('.char-status');
          if(b) b.style.opacity = char.statusAlways ? '1' : '0'; }}>

        {(char.thumb||char.hero)
          ? <img src={char.thumb||char.hero} alt={char.name} loading="lazy"
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
            color:'rgba(255,255,255,.4)', marginTop:'.6rem', display:'flex', gap:'.7rem',
            flexWrap:'wrap', lineHeight:1.7 }}>
            <span>{char.year}</span>
            {char.specs && char.specs.software &&
              <><span style={{ color:'var(--dim)' }}>·</span><span>{char.specs.software.join(' · ')}</span></>}
          </div>
          <div style={{ marginTop:'1rem', fontFamily:'var(--ui)', fontSize:'12px',
            letterSpacing:'.18em', textTransform:'uppercase', color:'var(--gold)' }}>
            Read the Breakdown →
          </div>
        </div>

        <div style={{ position:'absolute', top:'1rem', left:'1.2rem', fontFamily:'var(--ui)', fontSize:'12px',
          letterSpacing:'.2em', color:'rgba(255,255,255,.3)' }}>{String(index + 1).padStart(2, '0')}</div>
        {char.status && (
          <div className="char-status" style={{ opacity: char.statusAlways ? 1 : 0 }}>
            <span>{char.status}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

import { useEffect } from 'react';
import { useSeoContext } from '../providers/SeoProvider';
import site from '../config/site';

/* 8-slot mosaic: three tall columns, the two large centre slots reading down the middle */
const ORDER = ['arya','odungi-the-fairytale','lolungu-the-turkana','ndirangu-the-farmer',
  'moombi-the-angel','otugi-the-dragon','omolara-the-omo','afrezia-the-emerald'];

const MOSAIC_CSS = `
.char-mosaic{max-width:1760px;margin:0 auto;padding:2rem 3vw 8rem;display:grid;
  grid-template-columns:1fr 1.5fr 1fr;grid-template-rows:repeat(6,minmax(0,1fr));
  gap:14px;aspect-ratio:3.5/3;}
.char-mosaic>div{min-height:0;min-width:0;}
.cm-arya{grid-column:1;grid-row:1/3;}
.cm-ndirangu{grid-column:1;grid-row:3/5;}
.cm-omolara{grid-column:1;grid-row:5/7;}
.cm-odungi{grid-column:2;grid-row:1/4;}
.cm-otugi{grid-column:2;grid-row:4/7;}
.cm-lolungu{grid-column:3;grid-row:1/3;}
.cm-moombi{grid-column:3;grid-row:3/5;}
.cm-afrezia{grid-column:3;grid-row:5/7;}
.char-mosaic>div>a{display:block;height:100%;}
@media(max-width:900px){
  .char-mosaic{grid-template-columns:repeat(2,1fr);grid-template-rows:none;
    grid-auto-rows:1fr;aspect-ratio:auto;}
  .char-mosaic>div{grid-column:auto!important;grid-row:auto!important;aspect-ratio:1/1;}
}
@media(max-width:560px){.char-mosaic{grid-template-columns:1fr;}}
.char-status{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);
  z-index:3;pointer-events:none;display:flex;justify-content:center;
  padding:.75rem .6rem;transition:opacity .45s;}

.char-status span{font-family:var(--ui);font-weight:500;
  font-size:clamp(11px,1.15vw,17px);letter-spacing:.2em;text-transform:uppercase;
  color:var(--gold);text-align:center;line-height:1.35;
  text-shadow:0 2px 18px rgba(0,0,0,.95), 0 0 32px rgba(0,0,0,.75);}
@media(max-width:900px){.char-status span{font-size:clamp(11px,2.6vw,15px);}}
`;

export default function CharactersPage() {
  const { updateSeo } = useSeoContext();

  useEffect(() => {
    updateSeo({
      title: `3D Characters & Creatures | ${site.name}`,
      description: 'In-depth technical breakdowns of my hyperreal, stylized and creature work.',
      canonical: `${site.url}/characters`,
    });
  }, [updateSeo]);

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <style>{MOSAIC_CSS}</style>
      <div className="pg-head" style={{ padding:'9rem 3vw 3rem', maxWidth:'1760px', margin:'0 auto' }}>
        <div className="cat-label">3D Characters<span className="cat-num">{CHARACTER_BLOGS.length} Breakdowns</span></div>
        <h1 className="pg-title" style={{ fontFamily:'var(--serif)', fontSize:'clamp(3rem,7vw,8rem)', fontWeight:600,
          lineHeight:.92, letterSpacing:'.01em', color:'var(--text)', marginBottom:'1.5rem' }}>
          3D <em style={{ fontStyle:'normal', color:'var(--gold)' }}>Characters</em>
        </h1>
        <div style={{ width:60, height:1, background:'var(--gold)', marginBottom:'2rem' }}/>
        <p className="pg-intro" style={{ fontFamily:'var(--body)', fontWeight:300, fontSize:'clamp(1rem,1.2vw,1.15rem)',
          color:'var(--muted)', lineHeight:1.9, maxWidth:'none' }}>
          In-depth technical breakdowns of my hyperreal, stylized and creature work · sculpt to look-development,
          with a focus on rendering melanated skin honestly. Each breakdown is built out across upcoming sessions;
          some sections are still being filled in.
        </p>
      </div>

      <div className="char-mosaic">
        {ORDER.map((slug, i) => {
          const char = CHARACTER_BLOGS.find(c => c.slug === slug);
          if (!char) return null;
          return (
            <div key={slug} className={`cm-${slug.split('-')[0]}`}>
              <CharCard char={char} index={i} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
