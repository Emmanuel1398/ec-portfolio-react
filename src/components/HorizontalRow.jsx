import { useRef, useEffect, useCallback, useState } from 'react';

export default function HorizontalRow({ items, height = '68vh', itemWidth = '28vw', minWidth = '260px' }) {
  const rowRef   = useRef(null);
  const drag     = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const [showL, setShowL] = useState(false);
  const [showR, setShowR] = useState(true);

  const updateArrows = () => {
    const el = rowRef.current;
    if (!el) return;
    setShowL(el.scrollLeft > 5);
    setShowR(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  const scrollLeft  = () => rowRef.current?.scrollBy({ left: -(rowRef.current.offsetWidth * 0.7), behavior: 'smooth' });
  const scrollRight = () => rowRef.current?.scrollBy({ left:   rowRef.current.offsetWidth * 0.7,  behavior: 'smooth' });

  const onDown = useCallback((e) => {
    drag.current = { active: true, startX: e.pageX - rowRef.current.offsetLeft, scrollLeft: rowRef.current.scrollLeft };
    rowRef.current.classList.add('dragging');
  }, []);
  const onUp = useCallback(() => {
    drag.current.active = false;
    rowRef.current?.classList.remove('dragging');
  }, []);
  const onMove = useCallback((e) => {
    if (!drag.current.active) return;
    e.preventDefault();
    const x    = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - drag.current.startX) * 1.4;
    rowRef.current.scrollLeft = drag.current.scrollLeft - walk;
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    el.addEventListener('mousemove',  onMove);
    el.addEventListener('mouseup',    onUp);
    el.addEventListener('mouseleave', onUp);
    el.addEventListener('scroll',     updateArrows, { passive: true });
    updateArrows();
    return () => {
      el.removeEventListener('mousemove',  onMove);
      el.removeEventListener('mouseup',    onUp);
      el.removeEventListener('mouseleave', onUp);
      el.removeEventListener('scroll',     updateArrows);
    };
  }, []);

  const arrowBtn = (dir, onClick, visible) => (
    <button
      onClick={onClick}
      style={{
        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
        [dir === 'left' ? 'left' : 'right']: '0.6rem', zIndex: 10,
        width: 38, height: 38, borderRadius: '50%',
        border: '1px solid rgba(201,169,110,0.45)',
        background: 'rgba(6,6,6,0.75)',
        backdropFilter: 'blur(8px)',
        color: 'var(--gold)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s, background 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,110,0.15)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,6,6,0.75)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
    >
      <svg width="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        {dir === 'left'
          ? <path d="M15 18l-6-6 6-6"/>
          : <path d="M9 18l6-6-6-6"/>}
      </svg>
    </button>
  );

  return (
    <div style={{ position: 'relative' }}>
      {arrowBtn('left',  scrollLeft,  showL)}
      {arrowBtn('right', scrollRight, showR)}

      <div ref={rowRef} className="h-row" style={{ height }} onMouseDown={onDown}>
        {items.map((item, i) => (
          <div key={i} className="h-item" style={{ width: itemWidth, minWidth, height: '100%' }}>
            <img src={item.img} alt={item.title} loading="lazy" draggable="false" />
            <div className="h-item__info">
              {item.num && <div className="h-item__num">{item.num}</div>}
              <div className="h-item__title">{item.title}</div>
              {item.sub && <div className="h-item__sub">{item.sub}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Drag hint — right edge fade */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 70,
        background: 'linear-gradient(to left, rgba(6,6,6,0.6), transparent)',
        pointerEvents: 'none', zIndex: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '1.2rem',
      }}>
        <span style={{ fontFamily: 'var(--ui)', fontSize: '11px', letterSpacing: '.2em',
          color: 'rgba(255,255,255,.25)', writingMode: 'vertical-rl' }}>DRAG</span>
      </div>
    </div>
  );
}
