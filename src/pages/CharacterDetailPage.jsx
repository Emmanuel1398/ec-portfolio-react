import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CHARACTER_PROFILES } from '../data/portfolio';
import VideoModal from '../components/VideoModal';
import { useIntersection } from '../hooks';

/* Image type badge colours */
const TYPE_COLORS = {
  render:    { bg:'rgba(201,169,110,.1)', color:'var(--gold)',              label:'Final Render'    },
  wireframe: { bg:'rgba(100,140,255,.1)', color:'rgba(100,140,255,.9)',     label:'Wireframe'       },
  channel:   { bg:'rgba(255,100,100,.1)', color:'rgba(255,120,120,.9)',     label:'Channel Map'     },
  viewport:  { bg:'rgba(100,220,150,.1)', color:'rgba(100,220,150,.9)',     label:'Viewport'        },
  texture:   { bg:'rgba(200,100,255,.1)', color:'rgba(200,130,255,.9)',     label:'Texture Map'     },
  sculpt:    { bg:'rgba(255,200,80,.1)',  color:'rgba(255,200,80,.9)',      label:'Sculpt'          },
};

/* Single image in gallery */
function GalleryImg({ item, onClick }) {
  const t = TYPE_COLORS[item.type] || TYPE_COLORS.render;
  return (
    <div style={{ position:'relative', overflow:'hidden', cursor:'pointer', background:'var(--bg2)', aspectRatio:'4/3', borderRadius:2 }}
      onClick={() => onClick(item)}
      onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'}
      onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}>
      <img src={item.url} alt={item.caption} loading="lazy"
        style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top',
          display:'block', transition:'transform .8s var(--ease-out)' }}/>
      <div style={{ position:'absolute', bottom:0, left:0, right:0,
        padding:'1.4rem .9rem .7rem',
        background:'linear-gradient(to top, rgba(6,6,6,.92), transparent)' }}>
        <span style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.14em',
          textTransform:'uppercase', background: t.bg, color: t.color,
          padding:'.15rem .45rem', marginBottom:'.3rem', display:'inline-block' }}>
          {t.label}
        </span>
        <div style={{ fontFamily:'var(--serif)', fontSize:'.95rem', fontWeight:300,
          color:'var(--text)', lineHeight:1.2 }}>{item.caption}</div>
      </div>
    </div>
  );
}

/* Video card in sculpting section */
function VideoCard({ video, onPlay }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ background:'var(--bg3)', border:'1px solid var(--border)', cursor:'pointer',
      transition:'border-color .2s, background .2s' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onPlay(video)}
      style={{ background: hover ? 'rgba(255,255,255,.02)' : 'var(--bg3)',
        border:`1px solid ${hover ? 'rgba(201,169,110,.3)' : 'var(--border)'}`,
        cursor:'pointer', padding:'1.4rem 1.6rem', transition:'all .25s' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'1.2rem' }}>
        <div style={{ width:44, height:44, borderRadius:'50%', flexShrink:0,
          border:`1px solid ${hover ? 'var(--gold)' : 'rgba(255,255,255,.15)'}`,
          display:'flex', alignItems:'center', justifyContent:'center',
          background: hover ? 'rgba(201,169,110,.1)' : 'transparent',
          transition:'all .25s' }}>
          <svg width="14" viewBox="0 0 24 24" fill={hover ? 'var(--gold)' : 'rgba(255,255,255,.4)'}>
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:'var(--serif)', fontSize:'1.05rem', fontWeight:300,
            color:'var(--text)', lineHeight:1.2, marginBottom:'.3rem' }}>{video.title}</div>
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            {[video.duration, video.resolution].map(v => (
              <span key={v} style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.14em',
                textTransform:'uppercase', color:'var(--muted)' }}>{v}</span>
            ))}
          </div>
        </div>
        <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.18em',
          color: hover ? 'var(--gold)' : 'var(--dim)', transition:'color .2s' }}>
          {video.youtubeId ? 'PLAY' : 'SOON'}
        </div>
      </div>
    </div>
  );
}

/* Lightbox for gallery images */
function ImageLightbox({ item, onClose }) {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,.96)',
      display:'flex', alignItems:'center', justifyContent:'center' }}
      onClick={onClose}>
      <div style={{ position:'relative', maxWidth:'90vw', maxHeight:'90vh' }}
        onClick={e => e.stopPropagation()}>
        <img src={item.url} alt={item.caption}
          style={{ maxWidth:'90vw', maxHeight:'85vh', objectFit:'contain', display:'block' }}/>
        <div style={{ padding:'.8rem 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontFamily:'var(--serif)', fontSize:'1rem', fontWeight:300, color:'var(--muted)' }}>
            {item.caption}
          </div>
          <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.16em',
            textTransform:'uppercase', color:'var(--dim)', background:'rgba(6,6,6,.7)',
            padding:'.2rem .6rem' }}>
            {(TYPE_COLORS[item.type]||TYPE_COLORS.render).label}
          </div>
        </div>
        <button onClick={onClose}
          style={{ position:'absolute', top:'-2.5rem', right:0, width:40, height:40,
            borderRadius:'50%', border:'1px solid rgba(255,255,255,.2)',
            background:'transparent', color:'var(--text)', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function CharacterDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const char = CHARACTER_PROFILES.find(c => c.slug === slug);
  const currentIndex = CHARACTER_PROFILES.findIndex(c => c.slug === slug);
  const prevChar = CHARACTER_PROFILES[currentIndex - 1];
  const nextChar = CHARACTER_PROFILES[currentIndex + 1];
  const [lightboxImg, setLightboxImg] = useState(null);
  const [videoModal, setVideoModal] = useState(null);
  const [r1, v1] = useIntersection();
  const [r2, v2] = useIntersection();
  const [r3, v3] = useIntersection();
  const [r4, v4] = useIntersection();

  if (!char) return (
    <div style={{ padding:'15rem 5vw', textAlign:'center' }}>
      <div style={{ fontFamily:'var(--serif)', fontSize:'2rem', color:'var(--muted)' }}>Character not found.</div>
      <Link to="/characters" style={{ color:'var(--gold)', fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em' }}>← Back to Characters</Link>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh' }}>

      {/* HERO */}
      <div style={{ position:'relative', width:'100%', height:'88vh', overflow:'hidden', minHeight:500 }}>
        <img src={char.heroImg} alt={char.name}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%',
            objectFit:'cover', objectPosition:'top center',
            filter:'brightness(.4) saturate(.75)', animation:'heroZoom 20s ease-in-out infinite alternate' }}/>
        <div style={{ position:'absolute', inset:0,
          background:'linear-gradient(to bottom, rgba(6,6,6,.55) 0%, rgba(6,6,6,.25) 40%, rgba(6,6,6,.9) 80%, rgba(6,6,6,1) 100%)' }}/>
        <div style={{ position:'relative', zIndex:2, height:'100%', display:'flex',
          flexDirection:'column', justifyContent:'flex-end', padding:'0 5vw 5rem' }}>
          {/* Breadcrumb */}
          <div style={{ position:'absolute', top:'9rem', left:'5vw',
            fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
            textTransform:'uppercase', color:'rgba(255,255,255,.4)', display:'flex',
            alignItems:'center', gap:'.5rem' }}>
            <Link to="/" style={{ color:'rgba(255,255,255,.4)', textDecoration:'none' }}>Portfolio</Link>
            <span>·</span>
            <Link to="/characters" style={{ color:'rgba(255,255,255,.4)', textDecoration:'none' }}>3D Characters</Link>
            <span>·</span>
            <span style={{ color:'var(--gold)' }}>{char.name}</span>
          </div>
          <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.3em',
            textTransform:'uppercase', color:'var(--gold)', marginBottom:'.6rem' }}>
            {char.category} · {char.year}
          </div>
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(3.5rem,7vw,8rem)',
            fontWeight:300, lineHeight:.9, color:'var(--text)', letterSpacing:'.01em' }}>
            {char.name}<br/>
            <em style={{ fontStyle:'italic', color:'var(--gold)' }}>{char.subtitle}</em>
          </h1>
          <p style={{ fontFamily:'var(--body)', fontSize:'.95rem', color:'rgba(255,255,255,.55)',
            lineHeight:1.8, maxWidth:600, marginTop:'1.2rem' }}>
            {char.tagline}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ padding:'7rem 5vw 5rem', display:'grid',
        gridTemplateColumns:'1fr 280px', gap:'7rem', alignItems:'start', background:'var(--bg)' }}>

        {/* Left — write-up */}
        <div ref={r1} className={`rv ${v1 ? 'in' : ''}`}>
          <div className="cat-label">Character Write-up</div>
          <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.8rem,2.8vw,3rem)',
            fontWeight:300, lineHeight:1, color:'var(--text)', marginBottom:'2.5rem' }}>
            About This <em>Character</em>
          </h2>
          {char.writeup.split('\n\n').map((para, i) => (
            <p key={i} style={{ fontFamily:'var(--body)', fontSize:'1rem', color:'var(--muted)',
              lineHeight:2, marginBottom:'1.6rem', letterSpacing:'.01em' }}>
              {para}
            </p>
          ))}
        </div>

        {/* Right — specs panel */}
        <div ref={r2} className={`rv d1 ${v2 ? 'in' : ''}`}>
          <div style={{ border:'1px solid var(--border)', position:'sticky', top:'7rem' }}>
            <div style={{ padding:'1.2rem 1.5rem', borderBottom:'1px solid var(--border)',
              fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.24em',
              textTransform:'uppercase', color:'var(--gold)', background:'var(--bg2)' }}>
              Technical Specifications
            </div>
            {[
              ['Software', char.specs.software.join(', ')],
              ['Polycount', char.specs.polycount],
              ['Textures', char.specs.textures],
              ['Render Engine', char.specs.renderEngine],
              ['Client', char.specs.client],
              ['Year', char.specs.year],
              ['Duration', char.specs.duration],
            ].map(([label, value]) => (
              <div key={label} style={{ padding:'1rem 1.5rem',
                borderBottom:'1px solid var(--border)',
                display:'grid', gridTemplateColumns:'90px 1fr', gap:'.8rem', alignItems:'start' }}>
                <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.16em',
                  textTransform:'uppercase', color:'var(--muted)', paddingTop:'.1rem' }}>
                  {label}
                </div>
                <div style={{ fontFamily:'var(--body)', fontSize:'1rem', color:'var(--text)', lineHeight:1.6 }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROCESS VIDEOS */}
      {char.videos.length > 0 && (
        <div style={{ padding:'0 5vw 6rem', background:'var(--bg)' }}>
          <hr style={{ border:'none', borderTop:'1px solid var(--border)', marginBottom:'5rem' }}/>
          <div ref={r3} className={`rv ${v3 ? 'in' : ''}`}>
            <div className="cat-label">Sculpting &amp; Process Videos
              <span className="cat-num">{char.videos.length} Videos</span>
            </div>
            <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.8rem,2.8vw,3rem)',
              fontWeight:300, lineHeight:1, color:'var(--text)', marginBottom:'2.5rem' }}>
              Production <em>Process</em>
            </h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'1px',
              background:'var(--border)', border:'1px solid var(--border)' }}>
              {char.videos.map((video, i) => (
                <div key={i} style={{ background:'var(--bg)' }}>
                  <VideoCard video={video} onPlay={setVideoModal} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* IMAGE GALLERY */}
      <div style={{ padding:'0 5vw 7rem', background:'var(--bg2)', paddingTop:'5rem' }}>
        <div ref={r4} className={`rv ${v4 ? 'in' : ''}`}>
          <div className="cat-label">Image Gallery
            <span className="cat-num">{char.images.length} Images</span>
          </div>
          <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.8rem,2.8vw,3rem)',
            fontWeight:300, lineHeight:1, color:'var(--text)', marginBottom:'1.5rem' }}>
            Renders, Wireframes &amp; <em>Maps</em>
          </h2>

          {/* Filter legend */}
          <div style={{ display:'flex', gap:'.6rem', flexWrap:'wrap', marginBottom:'2.5rem' }}>
            {[...new Set(char.images.map(i => i.type))].map(type => {
              const t = TYPE_COLORS[type] || TYPE_COLORS.render;
              return (
                <div key={type} style={{ fontFamily:'var(--ui)', fontSize:'12px',
                  letterSpacing:'.14em', textTransform:'uppercase',
                  background: t.bg, color: t.color, padding:'.25rem .6rem' }}>
                  {t.label}
                </div>
              );
            })}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'3px' }}>
            {char.images.map((item, i) => (
              <GalleryImg key={i} item={item} onClick={setLightboxImg} />
            ))}
          </div>

          {/* Add images note */}
          <div style={{ marginTop:'3rem', padding:'1.5rem 2rem',
            border:'1px dashed rgba(255,255,255,.1)',
            background:'rgba(255,255,255,.01)' }}>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
              textTransform:'uppercase', color:'var(--dim)', marginBottom:'.4rem' }}>
              Production Note
            </div>
            <p style={{ fontFamily:'var(--body)', fontSize:'1rem', color:'var(--dim)', lineHeight:1.8 }}>
              Additional wireframes, channel maps, UV layouts and viewport screenshots can be added to this gallery.
              Upload to Google Drive and add the file IDs to the character profile in <code style={{ color:'rgba(201,169,110,.5)', fontSize:'1rem' }}>src/data/portfolio.js</code>.
            </p>
          </div>
        </div>
      </div>

      {/* PREV / NEXT NAV */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr',
        borderTop:'1px solid var(--border)', background:'var(--bg)' }}>
        {prevChar ? (
          <Link to={`/characters/${prevChar.slug}`}
            style={{ textDecoration:'none', padding:'2.5rem 5vw',
              borderRight:'1px solid var(--border)', transition:'background .25s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.02)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
              textTransform:'uppercase', color:'var(--muted)', marginBottom:'.5rem' }}>← Previous Character</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:'1.4rem', fontWeight:300, color:'var(--text)', lineHeight:1.1 }}>
              {prevChar.name}<br/>
              <em style={{ fontStyle:'italic', color:'var(--muted)', fontSize:'1.1rem' }}>{prevChar.subtitle}</em>
            </div>
          </Link>
        ) : (
          <Link to="/characters" style={{ textDecoration:'none', padding:'2.5rem 5vw',
            borderRight:'1px solid var(--border)', transition:'background .25s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.02)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
              textTransform:'uppercase', color:'var(--muted)', marginBottom:'.5rem' }}>← Back</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:'1.4rem', fontWeight:300, color:'var(--text)' }}>
              All Characters
            </div>
          </Link>
        )}
        {nextChar ? (
          <Link to={`/characters/${nextChar.slug}`}
            style={{ textDecoration:'none', padding:'2.5rem 5vw', textAlign:'right',
              transition:'background .25s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.02)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
              textTransform:'uppercase', color:'var(--muted)', marginBottom:'.5rem' }}>Next Character →</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:'1.4rem', fontWeight:300, color:'var(--text)', lineHeight:1.1 }}>
              {nextChar.name}<br/>
              <em style={{ fontStyle:'italic', color:'var(--muted)', fontSize:'1.1rem' }}>{nextChar.subtitle}</em>
            </div>
          </Link>
        ) : (
          <div style={{ padding:'2.5rem 5vw', textAlign:'right',
            transition:'background .25s' }}>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
              textTransform:'uppercase', color:'var(--dim)' }}>End of Archive</div>
          </div>
        )}
      </div>

      {/* Modals */}
      {lightboxImg && <ImageLightbox item={lightboxImg} onClose={() => setLightboxImg(null)}/>}
      {videoModal && <VideoModal youtubeId={videoModal.youtubeId} title={videoModal.title} onClose={() => setVideoModal(null)}/>}

      <style>{`@keyframes heroZoom{0%{transform:scale(1.04)}100%{transform:scale(1.1)}}`}</style>
    </div>
  );
}
