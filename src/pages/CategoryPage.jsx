import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategory } from '../data/categories';
import { useIntersection } from '../hooks';
import './category.css';

/* ILM-style card: thumbnail image + title. No hover-play, no description —
   those live inside the project blog. */
function Card({ route, item }) {
  return (
    <Link to={`${route}/${item.slug}`} className="ilm-card">
      <div className="ilm-card-media"><img src={item.img} alt={item.title} loading="lazy" /></div>
      <div className="ilm-card-title">{item.title}</div>
    </Link>
  );
}

export default function CategoryPage({ slug }) {
  const cat = getCategory(slug);
  const [r, v] = useIntersection();
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  if (!cat) return <div className="page" />;
  return (
    <div className="page">
      <div ref={r} className={`rv ${v ? 'in' : ''}`} style={{ padding: 'clamp(7rem,13vh,10rem) 5vw 3.5rem' }}>
        <div className="cat-label">{cat.label}<span className="cat-num">{cat.items.length} Works</span></div>
        <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: cat.title }} />
        <div className="sec-rule"><p>— {cat.sub}</p></div>
      </div>
      {cat.groups
        ? cat.groups.map((g) => (
            <section key={g.name} style={{ padding: '0 5vw 3rem' }}>
              <h3 className="cat-group">{g.name}</h3>
              <div className="cat-grid">{g.items.map((it) => <Card key={it.slug} route={cat.route} item={it} />)}</div>
            </section>
          ))
        : <div style={{ padding: '0 5vw 6rem' }}><div className="cat-grid">{cat.items.map((it) => <Card key={it.slug} route={cat.route} item={it} />)}</div></div>}
    </div>
  );
}
