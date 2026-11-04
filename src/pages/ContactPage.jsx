import { useState, useEffect } from 'react';
import { useIntersection } from '../hooks';
import { SOCIAL } from '../data/portfolio';
import AutoVideo from '../components/AutoVideo';
import { openWhatsApp } from '../lib/whatsapp';
import './contact.css';

/* ── Contact form — sends to emmanuelchege777@gmail.com via mailto ── */
function ContactForm() {
  const [r, v] = useIntersection();
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [company, setCompany] = useState('');
  const [type, setType]       = useState('');
  const [message, setMessage] = useState('');

  const types = ['3D Character','Motion Graphics','VFX','CFX','Drone Show',
    'Event Visualization','Projection Mapping','Product Visualization',
    'Hologram Content','Social Media','Full Event Video','General Enquiry'];

  const handleSend = () => {
    const subject = encodeURIComponent(`Portfolio Enquiry: ${type || 'General'} · ${name}`);
    const body    = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}` +
      `\nService: ${type || 'N/A'}\n\nMessage:\n${message}`
    );
    window.location.href =
      `mailto:emmanuelchege777@gmail.com?subject=${subject}&body=${body}`;
  };

  /* same details, sent as a WhatsApp message (number is never shown on the page) */
  const handleWhatsApp = () => {
    const lines = [
      `Hi Emmanuel, I'm reaching out from emmanuelchege.com.`,
      name && `Name: ${name}`,
      email && `Email: ${email}`,
      company && `Company: ${company}`,
      type && `Service: ${type}`,
      message && `\n${message}`,
    ].filter(Boolean);
    openWhatsApp(lines.join('\n'));
  };

  return (
    /* the reveal sits on the parts, not this wrapper: an opacity fade here would
       switch off the glass panel's backdrop blur until it finished */
    <div ref={r}
      style={{ padding:'calc(var(--navh, 84px) + 4rem) 5vw 6rem', background:'var(--bg)' }}>
      <div className={`rv ${v?'in':''}`}>
        <div className="cat-label">Get in Touch</div>
        <h1 className="sec-title" style={{ marginBottom:'3rem' }}>
          Send a <em>Message</em>
        </h1>
      </div>
      <div className="m-stack ct-msg">

        {/* Left · contact details */}
        <div className={`ct-details rv d1 ${v?'in':''}`}>
          <p style={{ fontFamily:'var(--body)', fontSize:'1rem', color:'var(--muted)',
            lineHeight:1.95, marginBottom:'2.5rem' }}>
            Available for freelance commissions, agency collaborations and project discussions.
            Based in Nairobi, Kenya · operating globally and remotely.
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
                className="soc-row" style={{ display:'grid', gridTemplateColumns:'120px 1fr', columnGap:'1.25rem',
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
            <button type="button" onClick={()=>openWhatsApp()}
              className="soc-row" style={{ display:'grid', gridTemplateColumns:'120px 1fr', columnGap:'1.25rem',
                alignItems:'center', padding:'1rem 0', width:'100%', textAlign:'left',
                background:'none', border:'none', borderBottom:'1px solid var(--border)',
                cursor:'pointer', color:'var(--muted)',
                transition:'color .2s, padding-left .2s',
                fontSize:'1rem', fontFamily:'var(--body)' }}
              onMouseEnter={e=>{e.currentTarget.style.color='var(--text)';e.currentTarget.style.paddingLeft='.5rem';}}
              onMouseLeave={e=>{e.currentTarget.style.color='var(--muted)';e.currentTarget.style.paddingLeft='0';}}>
              <span style={{ fontFamily:'var(--ui)', fontSize:'12px',
                letterSpacing:'.16em', textTransform:'uppercase', color:'var(--gold)' }}>
                WhatsApp
              </span>
              Chat with me on WhatsApp
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ background:'var(--border)', alignSelf:'stretch' }}/>

        {/* Right · form, on a glass panel */}
        <div className={`ct-glass ${v?'in':''}`}>
          <span className="ct-glass__frame" aria-hidden="true" />
          <div className="ct-glass__body">
          <div className="m-stack ct-form" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem' }}>
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
            <div className="m-2col svc-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'.4rem' }}>
              {types.map(t=>(
                <button key={t} type="button" onClick={()=>setType(t)} aria-pressed={type===t}
                  className={`ct-chip${type===t ? ' is-on' : ''}`}>
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

          <div className="ct-submit" style={{ display:'flex', alignItems:'center', gap:'1rem', flexWrap:'wrap' }}>
            <button className="btn-primary" onClick={handleSend}>
              Send by Email →
            </button>
            <button type="button" className="btn-outline" onClick={handleWhatsApp}
              style={{ padding:'calc(.8rem - 1px) 2rem', alignItems:'center' }}>
              Send on WhatsApp →
            </button>
          </div>
          <span style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.14em',
            color:'var(--muted)', marginTop:'-1rem' }}>
            Email opens your mail app · WhatsApp opens a chat with your brief
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
  title:'ENEWE & RRI Book Launch · Sound Editing BTS',
  client:'Personal / Studio',
  year:'2026',
  category:'Behind The Scenes · Audio Post-Production · Premiere Pro',
  description:'A behind-the-scenes look at the full audio post-production process for the ENEWE & RRI Book Launch video. Sound design, SFX layering, music mixing and final audio mastering inside Adobe Premiere Pro, from raw edit to polished delivery.',
  screenDimensions:'1920×1080',
  aspectRatio:'16:9',
  format:'Full HD',
};

function BtsEasterEgg() {
  const [r, v] = useIntersection();
  const [revealed, setRevealed] = useState(false);

  return (
    <div style={{ background:'var(--bg2)', borderTop:'1px solid var(--border)',
      padding:'6rem 5vw' }}>
      {/* Teaser · click to reveal */}
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
            · Still here? ·
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
              🎧 Easter Egg · You found it
            </div>
            <h2 style={{ fontFamily:'var(--serif)',
              fontSize:'clamp(2rem,3.5vw,4rem)',
              fontWeight:300, lineHeight:1, color:'var(--text)', marginBottom:'1rem' }}>
              Behind The <em>Scenes</em>
            </h2>
            <p style={{ fontFamily:'var(--body)', fontSize:'1rem',
              color:'var(--muted)', lineHeight:1.9, maxWidth:'600px' }}>
              A full look at the audio post-production process · sound design,
              SFX layering, music mixing and final mastering inside Adobe Premiere Pro.
            </p>
          </div>

          {/* Autoplaying BTS video (sound on reveal, mutes when scrolled away) */}
          <div style={{ position:'relative', width:'100%' }}>
            <AutoVideo youtubeId={BTS_EVENT.youtubeId} title={BTS_EVENT.title} />
            <div className="ct-bts" style={{ display:'flex', justifyContent:'space-between',
              alignItems:'center', padding:'1.2rem 0', borderBottom:'1px solid var(--border)', marginTop:'1px' }}>
              <div>
                <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.18em',
                  textTransform:'uppercase', color:'var(--gold)', marginBottom:'.3rem' }}>
                  {BTS_EVENT.client} · {BTS_EVENT.year}
                </div>
                <div style={{ fontFamily:'var(--serif)', fontSize:'1.3rem', fontWeight:300, color:'var(--text)' }}>
                  {BTS_EVENT.title}
                </div>
              </div>
              <span style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'.14em',
                textTransform:'uppercase', background:'rgba(201,169,110,.07)',
                border:'1px solid rgba(201,169,110,.25)', color:'rgba(201,169,110,.9)',
                padding:'.22rem .6rem', flexShrink:0 }}>
                {BTS_EVENT.screenDimensions} · {BTS_EVENT.format}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import { useSeoContext } from '../providers/SeoProvider';
import { contactSeo } from '../seo/pages';

export default function ContactPage() {
  const { updateSeo } = useSeoContext();

  useEffect(() => { updateSeo(contactSeo()); }, [updateSeo]);

  return (
    <div className="page">

      {/* ── Send a Message ── */}
      <ContactForm />


      {/* ── EASTER EGG · BTS video ── */}
      <BtsEasterEgg />

      {/* Footer */}
      <footer className="m-stack ct-foot" style={{ padding:'2.2rem 5vw', borderTop:'1px solid var(--border)',
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
