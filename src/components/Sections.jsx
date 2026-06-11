import { useIntersection } from '../hooks';
import { VIZ, PRODUCTS, PROJECTION, TOOLS, SOCIAL } from '../data/portfolio';
import HorizontalRow from './HorizontalRow';

/* Statement */
export function Statement() {
  const [r, v] = useIntersection();
  return (
    <div style={{ padding:'11rem 5vw', textAlign:'center', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', background:'var(--bg)' }}>
      <div ref={r} className={`rv ${v?'in':''}`}>
        <p style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.8rem,3.2vw,3.2rem)', fontWeight:300, fontStyle:'italic', lineHeight:1.5, color:'var(--text)', maxWidth:'900px', margin:'0 auto' }}>
          "Detail is not decoration. It is the difference between something that{' '}
          <em style={{ color:'var(--gold)', fontStyle:'normal' }}>looks 3D</em>{' '}
          and something that{' '}
          <em style={{ color:'var(--gold)', fontStyle:'normal' }}>feels alive.</em>"
        </p>
        <div style={{ marginTop:'2.5rem', fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.24em', textTransform:'uppercase', color:'var(--muted)' }}>
          — Emmanuel Chege, 3D Artist, Nairobi
        </div>
      </div>
    </div>
  );
}

/* Disciplines */
export function Disciplines() {
  const [r1, v1] = useIntersection();
  const cats = [
    {n:'03', label:'Motion Graphics',      sub:'After Effects · DaVinci · Premiere'},
    {n:'04', label:'Event Visualizations', sub:'Architectural · Unreal · Twinmotion'},
    {n:'05', label:'Product Renders',      sub:'Maya · Blender · Substance'},
    {n:'06', label:'Drone Show Concepts',  sub:'Aerial Formation · Light Choreography'},
    {n:'07', label:'Projection Mapping',   sub:'Architectural · Event · KICC Nairobi'},
    {n:'08', label:'Social Media Content', sub:'Branded · 3D Motion · Campaign'},
  ];
  return (
    <section style={{ padding:'8rem 5vw', background:'var(--bg2)' }}>
      <div ref={r1} className={`rv ${v1?'in':''}`} style={{ marginBottom:'4rem' }}>
        <div className="s-label">Portfolio / 03–08</div>
        <h2 className="s-head">All <em>Disciplines</em></h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', borderTop:'1px solid var(--border)', borderLeft:'1px solid var(--border)' }}>
        {cats.map((c, i) => (
          <div key={c.n} className={`rv d${Math.min(i,4)} ${v1?'in':''}`}
            style={{ borderRight:'1px solid var(--border)', borderBottom:'1px solid var(--border)', padding:'2.2rem 1.5rem', cursor:'pointer', transition:'background 0.25s' }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.02)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.2em', color:'var(--gold)', marginBottom:'1.2rem' }}>{c.n}</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:'1.1rem', fontWeight:300, color:'var(--text)', marginBottom:'0.4rem', lineHeight:1.2 }}>{c.label}</div>
            <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.12em', color:'var(--muted)' }}>{c.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Event Visualizations */
export function EventViz() {
  const [r1, v1] = useIntersection();
  const [r2, v2] = useIntersection();
  return (
    <section id="viz" style={{ padding:'8rem 0 0', background:'var(--bg)' }}>
      <div ref={r1} className={`rv ${v1?'in':''}`} style={{ padding:'0 5vw 3rem' }}>
        <div className="s-label">Portfolio / 04</div>
        <h2 className="s-head">Event <em>Visualizations</em></h2>
        <div style={{ marginTop:'1.5rem', borderTop:'1px solid var(--border)', paddingTop:'1rem' }}>
          <p style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.16em', color:'var(--muted)' }}>— Nyayo Stadium · Martell XXO · Concert Setups · VVIP Lounges</p>
        </div>
      </div>
      <div ref={r2} className={`rv-img ${v2?'in':''}`}>
        <HorizontalRow items={VIZ} height="62vh" itemWidth="36vw" minWidth="300px" />
      </div>
    </section>
  );
}

/* Products */
export function Products() {
  const [r1, v1] = useIntersection();
  const [r2, v2] = useIntersection();
  return (
    <section id="products" style={{ padding:'8rem 0 0', background:'var(--bg2)' }}>
      <div ref={r1} className={`rv ${v1?'in':''}`} style={{ padding:'0 5vw 3rem' }}>
        <div className="s-label">Portfolio / 05</div>
        <h2 className="s-head">Product <em>Renders</em></h2>
        <div style={{ marginTop:'1.5rem', borderTop:'1px solid var(--border)', paddingTop:'1rem' }}>
          <p style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.16em', color:'var(--muted)' }}>— Photorealistic product visualisation · Michael's Bouquet Perfume</p>
        </div>
      </div>
      <div ref={r2} className={`rv-img ${v2?'in':''}`}>
        <HorizontalRow items={PRODUCTS} height="65vh" itemWidth="24vw" minWidth="200px" />
      </div>
    </section>
  );
}

/* Projection */
export function Projection() {
  const [r1, v1] = useIntersection();
  const [r2, v2] = useIntersection();
  return (
    <section id="projection" style={{ padding:'8rem 0 0', background:'var(--bg)' }}>
      <div ref={r1} className={`rv ${v1?'in':''}`} style={{ padding:'0 5vw 3rem' }}>
        <div className="s-label">Portfolio / 07</div>
        <h2 className="s-head">Projection <em>Mapping</em></h2>
        <div style={{ marginTop:'1.5rem', borderTop:'1px solid var(--border)', paddingTop:'1rem' }}>
          <p style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.16em', color:'var(--muted)' }}>— KICC · State House · Mashariki · Makini · STAROOT · JAYS</p>
        </div>
      </div>
      <div ref={r2} className={`rv-img ${v2?'in':''}`}>
        <HorizontalRow items={PROJECTION} height="65vh" itemWidth="35vw" minWidth="300px" />
      </div>
    </section>
  );
}

/* About */
export function About() {
  const [r1, v1] = useIntersection();
  const [r2, v2] = useIntersection();
  return (
    <section id="about" style={{ padding:'9rem 5vw', background:'var(--bg2)', borderTop:'1px solid var(--border)' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8rem', alignItems:'start' }}>

        {/* Portrait */}
        <div ref={r1} className={`rv-img ${v1?'in':''}`} style={{ position:'relative' }}>
          <div style={{ aspectRatio:'3/4', overflow:'hidden', position:'relative' }}>
            <img src="/portrait.jpg" alt="Emmanuel Chege"
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', display:'block', transition:'transform 1.2s var(--ease-out)' }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.03)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
            />
            <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'40%', background:'linear-gradient(to top, rgba(10,10,10,0.7), transparent)' }}/>
            <div style={{ position:'absolute', bottom:'1.2rem', left:'1.2rem', fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.45)' }}>
              Nairobi, Kenya · 2025
            </div>
          </div>
          {/* Tools grid */}
          <div style={{ marginTop:'1.5rem', display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderTop:'1px solid var(--border)', borderLeft:'1px solid var(--border)' }}>
            {TOOLS.map(t => (
              <div key={t} style={{ borderRight:'1px solid var(--border)', borderBottom:'1px solid var(--border)', padding:'0.5rem 0.6rem', fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--muted)', transition:'color 0.2s, background 0.2s', cursor:'default' }}
                onMouseEnter={e=>{ e.currentTarget.style.color='var(--gold)'; e.currentTarget.style.background='rgba(255,255,255,0.02)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.background='transparent'; }}
              >{t}</div>
            ))}
          </div>
        </div>

        {/* Text */}
        <div ref={r2} className={`rv d1 ${v2?'in':''}`}>
          <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.28em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'1.2rem' }}>
            Portfolio / 00 — About
          </div>
          <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(2.5rem,4vw,4.5rem)', fontWeight:300, lineHeight:1, marginBottom:'2.5rem', color:'var(--text)' }}>
            An obsession with<br/><em style={{ fontStyle:'italic', color:'var(--gold)' }}>hyperrealistic detail.</em>
          </h2>
          <p style={{ fontFamily:'var(--ui)', fontSize:'0.82rem', color:'var(--muted)', lineHeight:2, marginBottom:'1.5rem', letterSpacing:'0.02em' }}>
            I am <strong style={{ color:'var(--text)', fontWeight:400 }}>Emmanuel Chege</strong>, a hyperrealistic 3D artist and motion designer based in <strong style={{ color:'var(--text)', fontWeight:400 }}>Nairobi, Kenya</strong> with over five years of professional experience. My core discipline is character and creature design — sculpting digital beings so convincing that the line between render and photograph disappears.
          </p>
          <p style={{ fontFamily:'var(--ui)', fontSize:'0.82rem', color:'var(--muted)', lineHeight:2, marginBottom:'2.5rem', letterSpacing:'0.02em' }}>
            My practice spans the full 3D pipeline: from concept sculpting in ZBrush, texturing in Mari and Substance Painter, cloth simulation in Marvelous Designer, real-time rendering in Unreal Engine 5, to final compositing in Nuke.
          </p>
          <div style={{ borderLeft:'1px solid var(--gold)', paddingLeft:'1.8rem', marginBottom:'3rem' }}>
            <p style={{ fontFamily:'var(--serif)', fontSize:'1.4rem', fontStyle:'italic', fontWeight:300, lineHeight:1.5, color:'var(--text)' }}>
              "Detail is not decoration. It is the difference between something that looks 3D and something that feels alive."
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0', borderTop:'1px solid var(--border)' }}>
            {[['5+','Years Experience'],['17+','Characters'],['16','Tools Mastered']].map(([n, l]) => (
              <div key={l} style={{ padding:'1.8rem 0', borderRight:'1px solid var(--border)' }}>
                <div style={{ fontFamily:'var(--serif)', fontSize:'3rem', fontWeight:300, color:'var(--text)', lineHeight:1 }}>
                  {n.replace('+','')}<em style={{ fontStyle:'normal', color:'var(--gold)' }}>{n.includes('+')?'+':''}</em>
                </div>
                <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--muted)', marginTop:'0.3rem' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Contact */
export function Contact() {
  const [r1, v1] = useIntersection();
  const [r2, v2] = useIntersection();
  return (
    <section id="contact" style={{ padding:'9rem 5vw', background:'var(--bg)', borderTop:'1px solid var(--border)', position:'relative', overflow:'hidden' }}>
      {/* Large watermark */}
      <div style={{ position:'absolute', right:'-5vw', top:'50%', transform:'translateY(-50%)', fontFamily:'var(--serif)', fontSize:'clamp(8rem,18vw,24rem)', fontWeight:600, color:'rgba(255,255,255,0.012)', pointerEvents:'none', lineHeight:1, userSelect:'none', letterSpacing:'-0.05em' }}>
        WORK
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8rem', position:'relative', zIndex:1 }}>
        <div ref={r1} className={`rv ${v1?'in':''}`}>
          <div className="s-label">Let's Work Together</div>
          <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(2.5rem,4.5vw,5rem)', fontWeight:300, lineHeight:1, marginBottom:'1.8rem' }}>
            <em style={{ fontStyle:'italic', color:'var(--gold)', display:'block' }}>Start a project</em>
            or say hello.
          </h2>
          <p style={{ fontFamily:'var(--ui)', fontSize:'0.8rem', color:'var(--muted)', lineHeight:2, marginBottom:'3rem', letterSpacing:'0.02em' }}>
            Open to freelance commissions, creative collaborations and remote full-time roles. Characters, drone shows, projection mapping, motion — I'd love to hear from you.
          </p>
          <div>
            {[
              { label:'Email',     href:`mailto:${SOCIAL.email}`,   text: SOCIAL.email },
              { label:'ArtStation',href:SOCIAL.artstation,          text:'artstation.com/emmanuel_chege' },
              { label:'LinkedIn',  href:SOCIAL.linkedin,            text:'linkedin.com/in/emmanuelchegekamau' },
              { label:'Instagram', href:SOCIAL.instagram,           text:'@arte_artorius' },
            ].map(l=>(
              <a key={l.label} href={l.href}
                target={l.href.startsWith('mailto')?undefined:'_blank'} rel="noreferrer"
                style={{ display:'grid', gridTemplateColumns:'85px 1fr', alignItems:'center', padding:'1.1rem 0', borderBottom:'1px solid var(--border)', textDecoration:'none', color:'var(--muted)', transition:'color 0.2s, padding-left 0.25s', fontSize:'0.82rem', fontFamily:'var(--ui)' }}
                onMouseEnter={e=>{ e.currentTarget.style.color='var(--text)'; e.currentTarget.style.paddingLeft='0.5rem'; }}
                onMouseLeave={e=>{ e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.paddingLeft='0'; }}>
                <span style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--gold)' }}>{l.label}</span>
                {l.text}
              </a>
            ))}
          </div>
        </div>
        <div ref={r2} className={`rv d1 ${v2?'in':''}`} style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem' }}>
            {['Name','Email'].map(p=>(
              <div key={p}>
                <label style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--muted)', display:'block', marginBottom:'0.5rem' }}>{p}</label>
                <input type={p==='Email'?'email':'text'} placeholder={p==='Email'?'your@email.com':'Your name'} className="inp"/>
              </div>
            ))}
          </div>
          <div>
            <label style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--muted)', display:'block', marginBottom:'0.5rem' }}>Project Type</label>
            <input type="text" placeholder="Character · Drone · Projection · Motion…" className="inp"/>
          </div>
          <div>
            <label style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--muted)', display:'block', marginBottom:'0.5rem' }}>Message</label>
            <textarea placeholder="Tell me about your project, timeline and vision…" className="ta"/>
          </div>
          <button className="btn-g" style={{ alignSelf:'flex-start' }}>Send Message →</button>
        </div>
      </div>
    </section>
  );
}

/* Footer */
export function Footer() {
  return (
    <footer style={{ borderTop:'1px solid var(--border)', padding:'2.2rem 5vw', display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center', gap:'2rem', background:'var(--bg)' }}>
      <div style={{ fontFamily:'var(--serif)', fontSize:'1.1rem', fontWeight:600, letterSpacing:'0.1em', color:'var(--muted)' }}>
        Emmanuel <em style={{ fontStyle:'normal', color:'var(--gold)' }}>Chege</em>
      </div>
      <div style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--dim)', textAlign:'center' }}>
        © 2025 Emmanuel Chege · Nairobi, Kenya · All rights reserved
      </div>
      <div style={{ display:'flex', gap:'1.8rem', justifyContent:'flex-end' }}>
        {[['Instagram',SOCIAL.instagram],['ArtStation',SOCIAL.artstation],['LinkedIn',SOCIAL.linkedin],['YouTube',SOCIAL.youtube]].map(([label,href])=>(
          <a key={label} href={href} target="_blank" rel="noreferrer"
            style={{ fontFamily:'var(--ui)', fontSize:'12px', letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--muted)', textDecoration:'none', transition:'color 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'}
            onMouseLeave={e=>e.currentTarget.style.color='var(--muted)'}
          >{label}</a>
        ))}
      </div>
    </footer>
  );
}
