import { useRef, useEffect, useCallback } from 'react';

export default function HorizontalRow({ items, height = '68vh', itemWidth = '28vw', minWidth = '260px' }) {
  const rowRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

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
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - drag.current.startX) * 1.4;
    rowRef.current.scrollLeft = drag.current.scrollLeft - walk;
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mouseleave', onUp);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseup', onUp);
      el.removeEventListener('mouseleave', onUp);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={rowRef}
        className="h-row"
        style={{ height }}
        onMouseDown={onDown}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="h-item"
            style={{ width: itemWidth, minWidth, height: '100%' }}
          >
            <img src={item.img} alt={item.title} loading="lazy" draggable="false" />
            <div className="h-item__info">
              {item.num && (
                <div style={{ fontFamily:'var(--ui)', fontSize:'0.4rem', letterSpacing:'0.2em', color:'var(--muted)', marginBottom:'0.4rem' }}>
                  {item.num}
                </div>
              )}
              <div className="h-item__title">{item.title}</div>
              {item.sub && <div className="h-item__sub">{item.sub}</div>}
            </div>
          </div>
        ))}
      </div>
      {/* Drag hint - fades out after interaction */}
      <div style={{
        position:'absolute', right:0, top:0, bottom:0, width:'80px',
        background:'linear-gradient(to left, rgba(6,6,6,0.7), transparent)',
        display:'flex', alignItems:'center', justifyContent:'flex-end',
        paddingRight:'1rem', pointerEvents:'none', zIndex:2,
      }}>
        <div style={{ fontFamily:'var(--ui)', fontSize:'0.38rem', letterSpacing:'0.2em', color:'rgba(255,255,255,0.3)', writingMode:'vertical-rl' }}>
          DRAG →
        </div>
      </div>
    </div>
  );
}
