import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CHARACTER_BLOGS, getCharacterBlog } from '../data/characterBlogs';
import BlockRenderer from '../components/BlockRenderer';
import Lightbox, { hiRes, ZoomBadge } from '../components/Lightbox';
import { useSeoContext, BreadcrumbSchema } from '../providers/SeoProvider';
import site from '../config/site';

const HERO_BG_CSS = `
.char-hero-bg{position:fixed;inset:0;z-index:0;pointer-events:none;
  background-position:center center;background-repeat:no-repeat;background-size:contain;
  filter:blur(3px) saturate(1.05);opacity:.30;}
.char-hero-bg::after{content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 70% 55% at 50% 18%, rgba(201,169,110,.06), transparent 60%),
    linear-gradient(180deg, rgba(8,8,8,.52) 0%, rgba(8,8,8,.72) 50%, rgba(8,8,8,.84) 100%);}
`;

export default function CharacterDetailPage() {
  const { slug } = useParams();
  const c = getCharacterBlog(slug);
  const { updateSeo } = useSeoContext();

  useEffect(() => {
    if (c) {
      updateSeo({
        title: `${c.name} | ${site.name}`,
        description: c.tagline || `3D Character breakdown: ${c.name}.`,
        canonical: `${site.url}/characters/${c.slug}`,
        image: c.hero || site.ogImage,
        type: 'article',
      });
    }
  }, [c, updateSeo]);

  if (!c) {
    return (
      <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center',
        justifyContent:'center', flexDirection:'column', gap:'1.5rem', color:'var(--muted)' }}>
        <div style={{ fontFamily:'var(--serif)', fontSize:'2rem', color:'var(--text)' }}>Character not found</div>
        <Link to="/characters" style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.18em',
          textTransform:'uppercase', color:'var(--gold)' }}>← All Characters</Link>
      </div>
    );
  }

  const [heroZoom, setHeroZoom] = useState(false);
  const idx = CHARACTER_BLOGS.findIndex(x => x.slug === slug);
  const next = CHARACTER_BLOGS[(idx + 1) % CHARACTER_BLOGS.length];

  return (
    <div style={{ minHeight:'100vh' }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: site.url },
        { name: 'Characters', url: `${site.url}/characters` },
        { name: c.name, url: `${site.url}/characters/${c.slug}` }
      ]} />
      <style>{HERO_BG_CSS}</style>


      {/* Dark base + faded full-fit hero render, fixed behind everything */}
      <div style={{ position:'fixed', inset:0, zIndex:0, background:'var(--bg)' }} />
      {(c.heroBg || c.hero) && (
        <div className="char-hero-bg"
          style={{ backgroundImage:`url(${c.heroBg || c.hero})`,
            backgroundSize: c.heroBg ? 'cover' : 'contain' }} />
      )}

      <div style={{ position:'relative', zIndex:1 }}>

        {/* Back nav */}
        <div className="pg-head" style={{ padding:'8rem 5vw 0' }}>
          <Link to="/characters" style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.18em',
            textTransform:'uppercase', color:'var(--muted)', textDecoration:'none' }}>← 3D Characters</Link>
        </div>

        {/* Hero */}
        <header style={{ maxWidth:'1320px', margin:'0 auto', padding:'2.5rem 5vw 0' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'1rem', fontFamily:'var(--ui)', fontSize:'12px',
            letterSpacing:'.22em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'1.3rem' }}>
            <span style={{ width:'2.2rem', height:1, background:'var(--gold)' }} />
            {c.category} · {c.year}
          </div>
          <h1 className="cd-name" style={{ fontFamily:'var(--serif)', fontWeight:600, lineHeight:.92, letterSpacing:'.01em',
            fontSize:'clamp(3rem,8vw,7rem)', color:'var(--text)' }}>
            {c.name}<br/><span style={{ color:'var(--gold)', fontSize:'.62em' }}>{c.epithet}</span>
          </h1>
          {c.tagline && (
            <p style={{ maxWidth:'60ch', marginTop:'1.8rem', fontFamily:'var(--body)', fontWeight:300,
              fontSize:'clamp(1.05rem,1.5vw,1.25rem)', color:'var(--muted)', lineHeight:1.7 }}>
              {c.tagline}
            </p>
          )}

          {/* Square hero render / placeholder */}
          <div className={c.hero ? 'cb-shot' : undefined}
            role={c.hero ? 'button' : undefined} tabIndex={c.hero ? 0 : undefined}
            aria-label={c.hero ? 'View hero render full size' : undefined}
            onClick={c.hero ? () => setHeroZoom(true) : undefined}
            onKeyDown={c.hero ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setHeroZoom(true); } } : undefined}
            style={{ maxWidth:'860px', margin:'3rem auto 0', position:'relative', aspectRatio:'1/1',
            overflow:'hidden', background:'var(--bg2)',
            border: c.hero ? 'none' : '1px dashed rgba(201,169,110,.32)',
            boxShadow: c.hero ? '0 40px 120px -40px rgba(0,0,0,.9)' : 'none',
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            {c.hero
              ? <>
                  <img src={c.hero} alt={c.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
                  <ZoomBadge />
                  <div style={{ position:'absolute', left:0, bottom:0, width:'100%', padding:'1.6rem 1.2rem .9rem',
                    fontFamily:'var(--ui)', fontSize:'11px', letterSpacing:'.14em', textTransform:'uppercase',
                    color:'rgba(255,255,255,.78)', background:'linear-gradient(to top,rgba(6,6,6,.85),transparent)' }}>
                    Final Hero Render
                  </div>
                </>
              : <div style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:'var(--serif)', fontSize:'1.5rem', color:'var(--gold2)' }}>Hero Render</div>
                  <div style={{ fontFamily:'var(--ui)', fontSize:'10px', letterSpacing:'.16em',
                    textTransform:'uppercase', color:'var(--dim)', marginTop:'.8rem' }}>asset coming soon</div>
                </div>}
          </div>

          {c.hero && heroZoom && <Lightbox src={hiRes(c.hero)} caption={`${c.name} \u2014 Final Hero Render`} onClose={() => setHeroZoom(false)} />}

          {/* Meta */}
          {c.specs && c.specs.software && (
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.6rem', marginTop:'1.9rem', justifyContent:'center' }}>
              {c.specs.software.map(s => (
                <span key={s} style={{ fontFamily:'var(--ui)', fontSize:'11px', letterSpacing:'.1em',
                  textTransform:'uppercase', color:'var(--muted)', border:'1px solid var(--border)', padding:'.45rem .85rem' }}>{s}</span>
              ))}
            </div>
          )}
        </header>

        {/* Breakdown blocks */}
        <div style={{ marginTop:'3.5rem' }}>
          <BlockRenderer blocks={c.blocks} />
        </div>

        {/* Next */}
        <div style={{ borderTop:'1px solid var(--border)', padding:'4rem 5vw', maxWidth:'1320px', margin:'0 auto' }}>
          <Link to={`/characters/${next.slug}`} style={{ textDecoration:'none', display:'block' }}>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em', textTransform:'uppercase',
              color:'var(--muted)', marginBottom:'.6rem' }}>Next Character →</div>
            <div style={{ fontFamily:'var(--serif)', fontWeight:600, fontSize:'clamp(1.8rem,3.5vw,3rem)', color:'var(--text)' }}>
              {next.name} <span style={{ color:'var(--gold)' }}>{next.epithet}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
