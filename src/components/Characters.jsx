import { useIntersection } from '../hooks';
import { CHARACTERS } from '../data/portfolio';
import HorizontalRow from './HorizontalRow';

const items = CHARACTERS.map(c => ({
  img: c.img, title: c.title, sub: c.tags, num: `${c.id}`
}));

export default function Characters() {
  const [r1, v1] = useIntersection();
  const [r2, v2] = useIntersection();
  return (
    <section id="characters" style={{ padding:'7rem 0 0', background:'var(--bg)' }}>
      <div ref={r1} className={`rv ${v1?'in':''}`} style={{ padding:'0 5vw 3rem' }}>
        <div className="s-label">Portfolio / 01<span className="s-num">17+ Characters</span></div>
        <h2 className="s-head">3D Characters &amp;<br/><em>Creatures</em></h2>
        <div style={{ marginTop:'1.5rem', borderTop:'1px solid var(--border)', paddingTop:'1rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <p style={{ fontFamily:'var(--ui)', fontSize:'0.44rem', letterSpacing:'0.16em', color:'var(--muted)' }}>— Hyperrealistic sculpts. Every detail intentional.</p>
          <a href="#contact" style={{ fontFamily:'var(--ui)', fontSize:'0.44rem', letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--muted)', textDecoration:'none', transition:'color 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'}
            onMouseLeave={e=>e.currentTarget.style.color='var(--muted)'}>
            Commission a character →
          </a>
        </div>
      </div>
      <div ref={r2} className={`rv-img d2 ${v2?'in':''}`}>
        <HorizontalRow items={items} height="72vh" itemWidth="27vw" minWidth="240px" />
      </div>
    </section>
  );
}
