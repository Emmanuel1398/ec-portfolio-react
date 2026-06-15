import { useState, useRef } from 'react';
import EventThumb from '../components/EventThumb';
import { useIntersection } from '../hooks';
import { SOFTWARE_CATEGORIES, SOCIAL, IMAGES } from '../data/portfolio';
import VideoModal from '../components/VideoModal';

/* ── Software & Expertise grid ── */
function SoftwareSection() {
  const [r, v] = useIntersection();
  return (
    <div ref={r} className={`rv ${v?'in':''}`} style={{ padding:'5rem 5vw' }}>
      <div className="cat-label">Capabilities</div>
      <h2 className="sec-title" style={{ marginBottom:'3rem' }}>
        Software &amp; <em>Expertise</em>
      </h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)',
        border:'1px solid var(--border)', background:'var(--border)', gap:'1px' }}>
        {SOFTWARE_CATEGORIES.map((cat, i) => (
          <div key={cat.category} className={`rv d${Math.min(i,4)} ${v?'in':''}`}
            style={{ background:'var(--bg2)', padding:'2rem 1.6rem',
              transition:'background .25s', cursor:'default' }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.02)'}
            onMouseLeave={e=>e.currentTarget.style.background='var(--bg2)'}>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
              textTransform:'uppercase', color:'var(--gold)', marginBottom:'1rem' }}>
              {cat.category}
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'.5rem' }}>
              {cat.tools.map(tool => (
                <div key={tool} style={{ fontFamily:'var(--serif)', fontSize:'1.05rem',
                  fontWeight:300, color:'var(--text)', display:'flex',
                  alignItems:'center', gap:'.6rem' }}>
                  <span style={{ width:3, height:3, borderRadius:'50%',
                    background:'var(--gold)', flexShrink:0 }}/>
                  {tool}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Contact form — sends to emmanuelchege777@gmail.com via mailto ── */
function ContactForm() {
  const [r, v] = useIntersection();
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [company, setCompany] = useState('');
  const [type, setType]       = useState('');
  const [message, setMessage] = useState('');

  const types = ['3D Character','Drone Show','Event Visualization',
    'Projection Mapping','Product Visualization','Hologram Content',
    'Social Media','Full Event Video','General Enquiry'];

  const handleSend = () => {
    const subject = encodeURIComponent(`Portfolio Enquiry: ${type || 'General'} — ${name}`);
    const body    = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}` +
      `\nService: ${type || 'N/A'}\n\nMessage:\n${message}`
    );
    window.location.href =
      `mailto:emmanuelchege777@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div ref={r} className={`rv ${v?'in':''}`}
      style={{ padding:'6rem 5vw', background:'var(--bg)',
        borderTop:'1px solid var(--border)' }}>
      <div className="cat-label">Get in Touch</div>
      <h2 className="sec-title" style={{ marginBottom:'3rem' }}>
        Send a <em>Message</em>
      </h2>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1px 1fr',
        gap:'6rem', alignItems:'start' }}>

        {/* Left — contact details */}
        <div>
          <p style={{ fontFamily:'var(--body)', fontSize:'1rem', color:'var(--muted)',
            lineHeight:1.95, marginBottom:'2.5rem' }}>
            Available for freelance commissions, agency collaborations and project discussions.
            Based in Nairobi, Kenya — operating globally and remotely.
          </p>
          <div style={{ display:'flex', flexDirection:'column',
            borderTop:'1px solid var(--border)' }}>
            {[
              { label:'Email',     href:`mailto:${SOCIAL.email}`, text:SOCIAL.email },
              { label:'ArtStation',href:SOCIAL.artstation,        text:'artstation.com/emmanuel_chege' },
              { label:'LinkedIn',  href:SOCIAL.linkedin,          text:'linkedin.com/in/emmanuelchegekamau' },
              { label:'Instagram', href:SOCIAL.instagram,         text:'@arte_artorius' },
              { label:'TikTok',    href:SOCIAL.tiktok,            text:'@arte_artorius' },
              { label:'YouTube',   href:SOCIAL.youtube,           text:'Emmanuel Chege' },
              { label:'Drive',     href:'https://drive.google.com/drive/folders/1gxnbPIPCY-jarzUT_78JGrobDeCuLtPB', text:'View More Work' },
              { label:'Website',   href:`https://${SOCIAL.website}`, text:SOCIAL.website },
            ].map(l => (
              <a key={l.label} href={l.href}
                target={l.href.startsWith('mailto')?undefined:'_blank'} rel="noreferrer"
                style={{ display:'grid', gridTemplateColumns:'90px 1fr',
                  alignItems:'center', padding:'1rem 0',
                  borderBottom:'1px solid var(--border)',
                  textDecoration:'none', color:'var(--muted)',
                  transition:'color .2s, padding-left .2s',
                  fontSize:'1rem', fontFamily:'var(--body)' }}
                onMouseEnter={e=>{e.currentTarget.style.color='var(--text)';e.currentTarget.style.paddingLeft='.5rem';}}
                onMouseLeave={e=>{e.currentTarget.style.color='var(--muted)';e.currentTarget.style.paddingLeft='0';}}>
                <span style={{ fontFamily:'var(--ui)', fontSize:'12px',
                  letterSpacing:'.16em', textTransform:'uppercase', color:'var(--gold)' }}>
                  {l.label}
                </span>
                {l.text}
              </a>
            ))}
          </div>
          <div style={{ marginTop:'2.5rem', display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            {[['ArtStation',SOCIAL.artstation],['LinkedIn',SOCIAL.linkedin],
              ['Instagram',SOCIAL.instagram],['TikTok',SOCIAL.tiktok],
              ['YouTube',SOCIAL.youtube],
              ['View More Work','https://drive.google.com/drive/folders/1gxnbPIPCY-jarzUT_78JGrobDeCuLtPB']].map(([label,href])=>(
              <a key={label} href={href} target="_blank" rel="noreferrer"
                className="btn-outline" style={{ fontSize:'12px' }}>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ background:'var(--border)', alignSelf:'stretch' }}/>

        {/* Right — form */}
        <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem' }}>
            <div style={{ display:'flex', flexDirection:'column', gap:'.4rem' }}>
              <label style={{ fontFamily:'var(--ui)', fontSize:'12px',
                letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)' }}>
                Full Name
              </label>
              <input type="text" placeholder="Your name"
                value={name} onChange={e=>setName(e.target.value)}
                className="form-input"/>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'.4rem' }}>
              <label style={{ fontFamily:'var(--ui)', fontSize:'12px',
                letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)' }}>
                Email Address
              </label>
              <input type="email" placeholder="your@email.com"
                value={email} onChange={e=>setEmail(e.target.value)}
                className="form-input"/>
            </div>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'.4rem' }}>
            <label style={{ fontFamily:'var(--ui)', fontSize:'12px',
              letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)' }}>
              Organisation / Company
            </label>
            <input type="text" placeholder="Optional"
              value={company} onChange={e=>setCompany(e.target.value)}
              className="form-input"/>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'.6rem' }}>
            <label style={{ fontFamily:'var(--ui)', fontSize:'12px',
              letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)' }}>
              Service Required
            </label>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'.4rem' }}>
              {types.map(t=>(
                <button key={t} onClick={()=>setType(t)}
                  style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.1em',
                    textTransform:'uppercase', padding:'.5rem .4rem',
                    border:`1px solid ${type===t?'var(--gold)':'var(--border)'}`,
                    background: type===t ? 'rgba(201,169,110,.08)' : 'transparent',
                    color: type===t ? 'var(--gold)' : 'var(--muted)',
                    cursor:'pointer', transition:'all .2s' }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'.4rem' }}>
            <label style={{ fontFamily:'var(--ui)', fontSize:'12px',
              letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)' }}>
              Project Brief
            </label>
            <textarea
              placeholder="Describe your project, timeline, budget and any specific requirements…"
              value={message} onChange={e=>setMessage(e.target.value)}
              className="form-textarea" style={{ minHeight:120 }}/>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:'1.5rem' }}>
            <button className="btn-primary" onClick={handleSend}>
              Send Message →
            </button>
            <span style={{ fontFamily:'var(--ui)', fontSize:'12px',
              letterSpacing:'.14em', color:'var(--muted)' }}>
              Opens your email client
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ── BTS Easter Egg ── */
const BTS_EVENT = {
  id:'bts-01',
  thumb:'/thumbnails/ev_enewe_bts.png',
  youtubeId:'O7kQpz_o82Q',
  title:'ENEWE & RRI Book Launch — Sound Editing BTS',
  client:'Personal / Studio',
  year:'2026',
  category:'Behind The Scenes · Audio Post-Production · Premiere Pro',
  description:'A behind-the-scenes look at the full audio post-production process for the ENEWE & RRI Book Launch video. Sound design, SFX layering, music mixing and final audio mastering inside Adobe Premiere Pro — from raw edit to polished delivery.',
  screenDimensions:'1920×1080',
  aspectRatio:'16:9',
  format:'Full HD',
};

function BtsEasterEgg() {
  const [r, v] = useIntersection();
  const [modal, setModal] = useState(false);
  const [revealed, setRevealed] = useState(false);

  return (
    <div style={{ background:'var(--bg2)', borderTop:'1px solid var(--border)',
      padding:'6rem 5vw' }}>
      {/* Teaser — click to reveal */}
      <style>{`
        @keyframes btsBreath {
          0%,100% { transform:scale(1);    opacity:0.4; }
          50%      { transform:scale(1.04); opacity:0.75; }
        }
        @keyframes btsShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
      {!revealed && (
        <div ref={r} className={`rv ${v?'in':''}`}
          style={{ textAlign:'center', cursor:'pointer' }}
          onClick={() => setRevealed(true)}>
          <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.35em',
            textTransform:'uppercase', color:'var(--dim)', marginBottom:'1rem' }}>
            — Still here? —
          </div>
          <div style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.2rem,2vw,2rem)',
            fontWeight:300, fontStyle:'italic', lineHeight:1.4, marginBottom:'1.5rem',
            background:'linear-gradient(90deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,.22) 40%, rgba(201,169,110,.55) 50%, rgba(255,255,255,.22) 60%, rgba(255,255,255,.22) 100%)',
            backgroundSize:'200% auto',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            backgroundClip:'text',
            animation:'btsShimmer 7s ease-in-out infinite' }}>
            There's something hidden here for the curious ones.
          </div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'.6rem',
            fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
            textTransform:'uppercase', color:'rgba(201,169,110,.45)',
            border:'1px dashed rgba(201,169,110,.2)', padding:'.5rem 1.2rem',
            animation:'btsBreath 3s ease-in-out infinite',
            transition:'color .3s, border-color .3s' }}
            onMouseEnter={e=>{e.currentTarget.style.color='var(--gold)';e.currentTarget.style.borderColor='rgba(201,169,110,.5)';e.currentTarget.style.animationPlayState='paused';}}
            onMouseLeave={e=>{e.currentTarget.style.color='rgba(201,169,110,.45)';e.currentTarget.style.borderColor='rgba(201,169,110,.2)';e.currentTarget.style.animationPlayState='running';}}>
            <span>🎧</span> Click to reveal
          </div>
        </div>
      )}

      {/* Revealed BTS content */}
      {revealed && (
        <div>
          <div className={`rv ${v?'in':''}`} style={{ marginBottom:'3rem' }}>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.35em',
              textTransform:'uppercase', color:'var(--gold)', marginBottom:'.5rem' }}>
              🎧 Easter Egg — You found it
            </div>
            <h2 style={{ fontFamily:'var(--serif)',
              fontSize:'clamp(2rem,3.5vw,4rem)',
              fontWeight:300, lineHeight:1, color:'var(--text)', marginBottom:'1rem' }}>
              Behind The <em>Scenes</em>
            </h2>
            <p style={{ fontFamily:'var(--body)', fontSize:'1rem',
              color:'var(--muted)', lineHeight:1.9, maxWidth:'600px' }}>
              A full look at the audio post-production process — sound design,
              SFX layering, music mixing and final mastering inside Adobe Premiere Pro.
            </p>
          </div>

          {/* Full-width event thumb with hover-to-play */}
          <div style={{ position:'relative', width:'100%' }}>
            <EventThumb event={BTS_EVENT} onPlayFull={() => setModal(true)} />

            {/* Info bar below */}
            <div style={{ display:'flex', justifyContent:'space-between',
              alignItems:'center', padding:'1.2rem 0',
              borderBottom:'1px solid var(--border)', marginTop:'1px' }}>
              <div>
                <div style={{ fontFamily:'var(--ui)', fontSize:'12px',
                  letterSpacing:'.18em', textTransform:'uppercase',
                  color:'var(--gold)', marginBottom:'.3rem' }}>
                  {BTS_EVENT.client} · {BTS_EVENT.year}
                </div>
                <div style={{ fontFamily:'var(--serif)', fontSize:'1.3rem',
                  fontWeight:300, color:'var(--text)' }}>
                  {BTS_EVENT.title}
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'1.5rem', flexShrink:0 }}>
                <span style={{ fontFamily:'var(--ui)', fontSize:'12px',
                  letterSpacing:'.14em', textTransform:'uppercase',
                  background:'rgba(201,169,110,.07)',
                  border:'1px solid rgba(201,169,110,.25)',
                  color:'rgba(201,169,110,.9)', padding:'.22rem .6rem' }}>
                  {BTS_EVENT.screenDimensions} · {BTS_EVENT.format}
                </span>
                <button onClick={() => setModal(true)}
                  style={{ fontFamily:'var(--ui)', fontSize:'12px',
                    letterSpacing:'.16em', textTransform:'uppercase',
                    background:'transparent', border:'1px solid var(--border)',
                    color:'var(--muted)', padding:'.6rem 1.2rem',
                    cursor:'pointer', transition:'all .2s',
                    display:'flex', alignItems:'center', gap:'.5rem' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold)';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--muted)';}}>
                  <svg width="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  Watch Full Video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <VideoModal
          youtubeId={BTS_EVENT.youtubeId}
          title={BTS_EVENT.title}
          onClose={() => setModal(false)}
        />
      )}
    </div>
  );
}

/* ── Main page ── */
export default function ContactPage() {
  const [r, v]   = useIntersection();
  const [r2, v2] = useIntersection();

  return (
    <div className="page">

      {/* Page header */}
      <div style={{ paddingTop:'11rem', paddingBottom:'5rem',
        paddingLeft:'5vw', paddingRight:'5vw',
        borderBottom:'1px solid var(--border)', background:'var(--bg)',
        position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', right:'-5vw', bottom:'-1rem',
          fontFamily:'var(--serif)', fontSize:'clamp(6rem,16vw,20rem)',
          fontWeight:600, color:'rgba(255,255,255,.012)',
          pointerEvents:'none', lineHeight:1, userSelect:'none' }}>
          ABOUT
        </div>
        <div ref={r} className={`rv ${v?'in':''}`} style={{ position:'relative', zIndex:1 }}>
          <div className="cat-label">Page 03</div>
          <h1 className="sec-title" style={{ fontSize:'clamp(3rem,6vw,7rem)' }}>
            About &amp; <em>Contact</em>
          </h1>
          <div style={{ marginTop:'1.5rem', maxWidth:'680px' }}>
            <p style={{ fontFamily:'var(--body)', fontSize:'1rem',
              color:'var(--muted)', lineHeight:1.9 }}>
              Emmanuel Chege — Hyperrealistic 3D Artist &amp; Motion Designer.
              Available for commissions, collaborations and projects worldwide from Nairobi, Kenya.
            </p>
          </div>
        </div>
      </div>

      {/* ── BIO + PORTRAIT ── */}
      <div style={{ background:'var(--bg2)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'360px 1fr', alignItems:'start' }}>

          {/* Portrait */}
          <div style={{ position:'relative', overflow:'hidden',
            borderRight:'1px solid var(--border)', minHeight:380 }}>
            <img src="/portrait.jpg" alt="Emmanuel Chege"
              style={{ width:'100%', height:'100%', objectFit:'cover',
                objectPosition:'top center', display:'block',
                filter:'brightness(.75) saturate(.85)' }}/>
            <div style={{ position:'absolute', inset:0,
              background:'linear-gradient(135deg,transparent 60%,rgba(6,6,6,.5) 100%)' }}/>
            <div style={{ position:'absolute', bottom:'1.2rem', left:'1.2rem',
              fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.2em',
              textTransform:'uppercase', color:'rgba(255,255,255,.45)' }}>
              Nairobi, Kenya · 2025
            </div>
          </div>

          {/* Bio text */}
          <div ref={r2} className={`rv d1 ${v2?'in':''}`}
            style={{ padding:'5rem 5vw' }}>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.28em',
              textTransform:'uppercase', color:'var(--gold)', marginBottom:'1.2rem' }}>
              About Emmanuel Chege
            </div>
            <h2 style={{ fontFamily:'var(--serif)',
              fontSize:'clamp(1.8rem,2.8vw,3rem)',
              fontWeight:300, lineHeight:1, color:'var(--text)', marginBottom:'2.5rem' }}>
              3D Generalist. <em>Motion Graphics Artist.</em>
            </h2>

            <p style={{ fontFamily:'var(--body)', fontSize:'1rem', color:'var(--muted)',
              lineHeight:2, marginBottom:'1.6rem' }}>
              I am a <strong style={{ color:'var(--text)', fontWeight:400 }}>3D Generalist</strong> with
              a passion for pushing creative boundaries at the intersection of motion graphics,
              animation and 3D design. My work reflects a meticulous attention to detail — from
              crafting high-fidelity 3D assets with a hyper-realistic style, to producing polished
              final artworks that communicate with visual clarity and purpose.
            </p>
            <p style={{ fontFamily:'var(--body)', fontSize:'1rem', color:'var(--muted)',
              lineHeight:2, marginBottom:'1.6rem' }}>
              I approach every project with both technical discipline and artistic curiosity,
              consistently finding ways to maximise quality within real-world constraints.
              Whether I am working on character work, visual effects, or dynamic motion design,
              my dedication to the craft is evident in every frame.
            </p>
            <p style={{ fontFamily:'var(--body)', fontSize:'1rem', color:'var(--muted)',
              lineHeight:2, marginBottom:'2.5rem' }}>
              I am currently growing my presence in the industry, with a focus on reaching global
              audiences — exploring animation in its many art forms: 3D visualizations, drone show
              concepts, 3D animation, hyper-realistic characters, motion graphics and projection
              mapping. Simply put —{' '}
              <strong style={{ color:'var(--gold)', fontWeight:400 }}>
                I bring concepts and ideas to life.
              </strong>
            </p>

            {/* Pull quote */}
            <div style={{ borderLeft:'2px solid var(--gold)',
              paddingLeft:'1.8rem', marginBottom:'2.5rem' }}>
              <p style={{ fontFamily:'var(--serif)', fontSize:'1.25rem',
                fontStyle:'italic', fontWeight:300, lineHeight:1.55, color:'var(--text)' }}>
                "Detail is not decoration. It is the difference between something that
                looks 3D and something that feels alive."
              </p>
            </div>

            {/* Stats */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)',
              borderTop:'1px solid var(--border)', paddingTop:'2rem', gap:'1rem' }}>
              {[['5+','Years Experience'],['17+','Characters'],['30+','Projects'],['16','Tools']].map(([n,l])=>(
                <div key={l}>
                  <div style={{ fontFamily:'var(--serif)', fontSize:'2.5rem',
                    fontWeight:300, lineHeight:1 }}>
                    {n.replace('+','')}<em style={{ fontStyle:'normal', color:'var(--gold)' }}>{n.includes('+')?'+':''}</em>
                  </div>
                  <div style={{ fontFamily:'var(--ui)', fontSize:'12px',
                    letterSpacing:'.16em', textTransform:'uppercase',
                    color:'var(--muted)', marginTop:'.3rem' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Software & Expertise — directly below bio ── */}
        <div style={{ borderTop:'1px solid var(--border)' }}>
          <SoftwareSection />
        </div>
      </div>

      {/* ── Send a Message ── */}
      <ContactForm />


      {/* ── EASTER EGG — BTS video ── */}
      <BtsEasterEgg />

      {/* Footer */}
      <footer style={{ padding:'2.2rem 5vw', borderTop:'1px solid var(--border)',
        display:'grid', gridTemplateColumns:'1fr auto 1fr',
        alignItems:'center', gap:'2rem', background:'var(--bg)' }}>
        <div style={{ fontFamily:'var(--serif)', fontSize:'1.1rem', fontWeight:600,
          letterSpacing:'.1em', color:'var(--muted)' }}>
          Emmanuel <em style={{ fontStyle:'normal', color:'var(--gold)' }}>Chege</em>
        </div>
        <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.16em',
          textTransform:'uppercase', color:'var(--dim)', textAlign:'center' }}>
          © 2025 · {SOCIAL.website} · Nairobi, Kenya
        </div>
        <div style={{ display:'flex', gap:'1.5rem', justifyContent:'flex-end', flexWrap:'wrap' }}>
          {[['Instagram',SOCIAL.instagram],['TikTok',SOCIAL.tiktok],
            ['ArtStation',SOCIAL.artstation],['LinkedIn',SOCIAL.linkedin],
            ['YouTube',SOCIAL.youtube]].map(([l,h])=>(
            <a key={l} href={h} target="_blank" rel="noreferrer"
              style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.14em',
                textTransform:'uppercase', color:'var(--muted)',
                textDecoration:'none', transition:'color .2s' }}
              onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'}
              onMouseLeave={e=>e.currentTarget.style.color='var(--muted)'}>
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
