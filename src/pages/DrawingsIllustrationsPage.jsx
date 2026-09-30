import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ILLUSTRATION_BLOGS } from '../data/illustrationBlogs';
import Lightbox from '../components/Lightbox';
import { useSeoContext } from '../providers/SeoProvider';
import site from '../config/site';

const A = (n) => `/fine-art/${n}.jpg`;
const T = (n) => `/fine-art/${n}-thumb.jpg`;

/* 17 tiles laid into a 6 x 6 square.
   slot letters map to the grid areas defined in MOSAIC_CSS below. */
const WORKS = [
  { slot:'a', key:'myriad',                 title:'Myriad',                 size:'A3' },
  { slot:'b', key:'hope-from-broken',       title:'Hope From Broken',       size:'A2' },
  { slot:'c', key:'fixate-on-you',          title:'Fixate On You',          size:'A3' },
  { slot:'d', key:'iguana',                 title:'Iguana',                 size:'A3' },
  { slot:'e', key:'the-flower',             title:'The Flower',             size:'A3' },
  { slot:'f', key:'the-splash',             title:'The Splash',             size:'A3' },
  { slot:'g', key:'snake',                  title:'Snake',                  size:'A3' },
  { slot:'h', key:'betta-fish',             title:'Betta Fish',             size:'A3' },
  { slot:'i', key:'dew-on-flower',          title:'Dew On Flower',          size:'A3' },
  { slot:'j', key:'the-eye',                title:'The Eye',                size:'A3' },
  { slot:'k', key:'the-ladybug',            title:'The Ladybug',            size:'A5' },
  { slot:'l', key:'through-the-glass',      title:'Through The Glass',      size:'A3' },
  { slot:'m', key:'bloom',                  title:'Bloom',                  size:'A5' },
  { slot:'n', key:'highlight-the-darkness', title:'Highlight The Darkness', size:'A3 · charcoal study' },
  { slot:'o', key:'story-of-the-rain',      title:'Story Of The Rain',      size:'animation · Photoshop', video:true },
  { slot:'p', key:'stippling-study',        title:'A Stippling Study',      size:'A3' },
  { slot:'q', key:'eye-study',              title:'Eye Study',              size:'A5' },
];

const MOSAIC_CSS = `
.fa-mosaic{max-width:1760px;margin:0 auto;padding:1rem 3vw 7rem;
  display:grid;grid-template-columns:repeat(6,1fr);grid-template-rows:repeat(6,1fr);
  gap:10px;aspect-ratio:1/1;
  grid-template-areas:
    "a a b c d d"
    "a a b c d d"
    "e f g g h i"
    "e f j j h i"
    "k l m n o o"
    "p q m n o o";}
.fa-slot{position:relative;overflow:hidden;background:var(--bg2);min-width:0;min-height:0;
  cursor:pointer;border:1px solid rgba(201,169,110,.14);}
.fa-slot img,.fa-slot video{width:100%;height:100%;object-fit:cover;display:block;
  transition:transform 1.1s cubic-bezier(0.16,1,0.3,1),opacity .5s;}
.fa-slot:hover img,.fa-slot:hover video{transform:scale(1.06);}
.fa-cap{position:absolute;left:0;right:0;bottom:0;padding:1.5rem .85rem .7rem;
  background:linear-gradient(to top,rgba(6,6,6,.94),rgba(6,6,6,.55) 55%,transparent);
  opacity:0;transition:opacity .35s;pointer-events:none;}
.fa-slot:hover .fa-cap{opacity:1;}
.fa-t{font-family:var(--serif);font-size:clamp(.85rem,1vw,1.15rem);color:var(--text);line-height:1.2;}
.fa-s{font-family:var(--ui);font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;
  color:var(--gold);margin-top:.3rem;}
.fa-zoom{position:absolute;top:.6rem;right:.6rem;width:26px;height:26px;border:1px solid rgba(201,169,110,.5);
  display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:13px;
  background:rgba(6,6,6,.55);opacity:0;transition:opacity .35s;}
.fa-slot:hover .fa-zoom{opacity:1;}
.fa-play{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;}
.fa-play span{width:54px;height:54px;border:1px solid var(--gold);border-radius:50%;position:relative;
  background:rgba(6,6,6,.4);}
.fa-play span::after{content:'';position:absolute;top:50%;left:54%;transform:translate(-50%,-50%);
  border-left:13px solid var(--gold);border-top:9px solid transparent;border-bottom:9px solid transparent;}
@media(max-width:900px){
  .fa-mosaic{grid-template-columns:repeat(2,1fr);grid-template-rows:none;grid-auto-rows:1fr;
    grid-template-areas:none;aspect-ratio:auto;gap:8px;}
  .fa-slot{grid-area:auto!important;aspect-ratio:1/1;}
}
@media(max-width:520px){.fa-mosaic{grid-template-columns:1fr;}}
.fa-sec{max-width:1760px;margin:0 auto;padding:3.5rem 3vw 0;}
.fa-sec-rule{width:2.2rem;height:1px;background:var(--gold);margin-bottom:1.1rem;}
.fa-sec-t{font-family:var(--serif);font-weight:300;font-size:clamp(1.9rem,3.6vw,3rem);
  color:var(--text);margin:0 0 1.4rem;line-height:1;}
.fa-sec-copy{font-family:var(--body);font-weight:300;font-size:clamp(1rem,1.15vw,1.1rem);
  color:var(--muted);line-height:1.9;}
.fa-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,520px),1fr));
  gap:18px;margin-top:2.4rem;padding-bottom:7rem;}
.fa-card{display:grid;grid-template-columns:1fr 1fr;text-decoration:none;
  border:1px solid rgba(201,169,110,.18);background:var(--bg2);overflow:hidden;
  transition:border-color .35s;}
.fa-card:hover{border-color:rgba(201,169,110,.5);}
.fa-card-img{position:relative;overflow:hidden;aspect-ratio:1/1;background:#0b0b0b;}
.fa-card-img img{width:100%;height:100%;object-fit:cover;display:block;
  transition:transform 1s cubic-bezier(0.16,1,0.3,1);}
.fa-card:hover .fa-card-img img{transform:scale(1.05);}
.fa-card-body{padding:1.6rem 1.5rem;display:flex;flex-direction:column;justify-content:center;gap:.45rem;}
.fa-card-cat{font-family:var(--ui);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);}
.fa-card-name{font-family:var(--serif);font-size:clamp(1.3rem,1.8vw,1.8rem);color:var(--text);line-height:1.1;}
.fa-card-ep{font-family:var(--serif);font-size:.98rem;color:var(--gold2);}
.fa-card-meta{font-family:var(--ui);font-size:11px;letter-spacing:.1em;color:var(--dim);margin-top:.5rem;}
.fa-card-cta{font-family:var(--ui);font-size:11px;letter-spacing:.18em;text-transform:uppercase;
  color:var(--gold);margin-top:1rem;}
@media(max-width:620px){.fa-card{grid-template-columns:1fr;}}
`;

export default function DrawingsIllustrationsPage() {
  const [zoom, setZoom] = useState(null);
  const [playing, setPlaying] = useState(false);

  const { updateSeo } = useSeoContext();

  useEffect(() => {
    updateSeo({
      title: `Drawings & Illustrations | ${site.name}`,
      description: 'Graphite and charcoal studies, and illustration work for print and product.',
      canonical: `${site.url}/drawings-illustrations`,
    });
    window.scrollTo(0, 0);
  }, [updateSeo]);

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <style>{MOSAIC_CSS}</style>

      <div className="pg-head" style={{ padding:'9rem 3vw 3rem', maxWidth:'1760px', margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'1rem', fontFamily:'var(--ui)', fontSize:'12px',
          letterSpacing:'.22em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'1.3rem' }}>
          <span style={{ width:'2.2rem', height:1, background:'var(--gold)' }} />
          Drawings &amp; Illustrations
          <span style={{ marginLeft:'auto', color:'var(--dim)' }}>16 drawings · 1 illustration breakdown</span>
        </div>

        <h1 className="pg-title sec-title" style={{ fontFamily:'var(--serif)', fontWeight:300,
          lineHeight:.95, fontSize:'clamp(3rem,8vw,7rem)', color:'var(--text)' }}>
          Drawings &amp; <em style={{ fontStyle:'normal', color:'var(--gold)' }}>Illustrations</em>
        </h1>

        <div style={{ marginTop:'2rem', fontFamily:'var(--body)', fontWeight:300,
          fontSize:'clamp(1rem,1.15vw,1.1rem)', color:'var(--muted)', lineHeight:1.9, maxWidth:'none' }}>
          <p style={{ margin:0 }}>
            Work made on paper and in vector, either side of the 3D. Graphite and charcoal studies from my
            re-introduction to fine art, and illustration commissioned for print and product.
          </p>
        </div>
      </div>

      <div className="fa-sec">
        <div className="fa-sec-rule" />
        <h2 className="fa-sec-t">Drawings</h2>
        <div className="fa-sec-copy">
          <p style={{ margin:0 }}>
            I drew long before I understood 3D. These are from my re-introduction to fine art, made between 2022
            and 2023, mostly in graphite with charcoal where the darks needed to go further than pencil could take them.
          </p>
          <p style={{ marginTop:'1.3rem' }}>
            Most of them are studies rather than finished pieces. I was testing techniques, pushing how dark and how
            bright a single sheet could hold at once, and going after surfaces that are difficult to draw honestly:
            water, scales, glass, wet petals. Some of it was pure experiment, like the stippling work, and some of it
            was chasing realism as far as the paper allowed.
          </p>
          <p style={{ marginTop:'1.3rem' }}>
            I was already working in 3D when I came back to drawing. What fine art changed was what I wanted out of it.
            Chasing realism on paper, reading light, judging value, learning how a surface actually behaves before you
            commit to it, made me want to pursue hyperrealism in 3D rather than settle for work that merely looked
            finished.
          </p>
          <p style={{ marginTop:'1.3rem' }}>
            It pushed me further into the parts of 3D that decide whether something reads as real: lighting, look
            development, colour. And it made me want the pieces to be more dimensional and more alive than a still
            drawing can ever be, which is where the animation work started.
          </p>
          <p style={{ marginTop:'1.3rem' }}>
            Everything is drawn on hot press grained watercolour paper using Faber-Castell Pitt matt pencils across
            their grades. The dark backgrounds are charcoal powder and ground 8B graphite. Highlights were lifted back
            out with Mono Zero erasers, white charcoal pencils, an electric eraser and masking fluid. Pierre Noire
            pencils carried the deepest grades where they were needed, and each piece was finished with Winsor and
            Newton fixative.
          </p>
        </div>
      </div>

      <div className="fa-mosaic">
        {WORKS.map((w) => (
          <div key={w.key} className="fa-slot" style={{ gridArea: w.slot }}
            role="button" tabIndex={0}
            aria-label={w.video ? `Play ${w.title}` : `View ${w.title} full size`}
            onClick={() => { if (w.video) setPlaying(true); else setZoom(w); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault(); w.video ? setPlaying(true) : setZoom(w); } }}>

            {w.video
              ? <>
                  <img src="/fine-art/story-of-the-rain-poster.jpg" alt={w.title} loading="lazy" />
                  <div className="fa-play"><span /></div>
                </>
              : <>
                  <img src={T(w.key)} alt={w.title} loading="lazy" />
                  <div className="fa-zoom">+</div>
                </>}

            <div className="fa-cap">
              <div className="fa-t">{w.title}</div>
              <div className="fa-s">{w.size}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="fa-sec">
        <div className="fa-sec-rule" />
        <h2 className="fa-sec-t">Illustrations</h2>
        <div className="fa-sec-copy">
          <p style={{ margin:0 }}>
            Vector illustration made to be manufactured, then taken into 3D so the finished object could be seen
            before it existed.
          </p>
        </div>
        <div className="fa-cards">
          {ILLUSTRATION_BLOGS.map((b) => (
            <Link key={b.slug} to={`/drawings-illustrations/${b.slug}`} className="fa-card">
              <div className="fa-card-img">
                {b.thumb && <img src={b.thumb} alt={b.name} loading="lazy" />}
              </div>
              <div className="fa-card-body">
                <div className="fa-card-cat">{b.category}</div>
                <div className="fa-card-name">{b.name}</div>
                <div className="fa-card-ep">{b.epithet}</div>
                <div className="fa-card-meta">{b.year} · {b.specs.software.join(' · ')}</div>
                <div className="fa-card-cta">Read the Breakdown &rarr;</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {zoom && (
        <Lightbox src={A(zoom.key)} caption={`${zoom.title} · ${zoom.size}`} onClose={() => setZoom(null)} />
      )}

      {playing && (
        <div onClick={() => setPlaying(false)}
          style={{ position:'fixed', inset:0, zIndex:3000, background:'rgba(6,6,6,.96)',
            display:'flex', alignItems:'center', justifyContent:'center', padding:'4vw' }}>
          <video src="/fine-art/story-of-the-rain.mp4" controls autoPlay
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth:'min(1100px,92vw)', maxHeight:'86vh', width:'auto', display:'block' }} />
          <button onClick={() => setPlaying(false)} aria-label="Close"
            style={{ position:'absolute', top:'2rem', right:'2.4rem', background:'none', border:'none',
              color:'var(--gold)', fontSize:'2rem', cursor:'pointer', lineHeight:1 }}>&times;</button>
        </div>
      )}
    </div>
  );
}
