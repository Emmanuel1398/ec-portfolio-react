import { useState, useRef, useEffect } from 'react';
import VolumeSlider from './VolumeSlider';
import { isAudioActivated } from '../lib/audioActivation';

const isMobile = typeof window !== 'undefined' &&
  !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export function HoverVideoCard({ thumbnail, youtubeId, title, sub, num, width, height, minWidth, onPlayModal, sound }) {
  const [showVideo, setShowVideo] = useState(false);
  const timer = useRef(null), hvcRef = useRef(null), containerRef = useRef(null);
  useEffect(() => {
    if (!isMobile || !youtubeId || !containerRef.current) return;
    const o = new IntersectionObserver(([e]) => setShowVideo(e.isIntersecting), { threshold: 0.4 });
    o.observe(containerRef.current); return () => o.disconnect();
  }, [youtubeId]);

  const onEnter = () => { if (isMobile) return; clearTimeout(timer.current); if (youtubeId) timer.current = setTimeout(() => setShowVideo(true), 250); };
  const onLeave = () => { if (isMobile) return; clearTimeout(timer.current); setShowVideo(false); };
  const onClick = () => { if (isMobile && onPlayModal && youtubeId) onPlayModal({ youtubeId, title }); };
  return (
    <div ref={containerRef} className="h-item" style={{ width, minWidth, height, flexShrink: 0, position: 'relative', cursor: isMobile && youtubeId ? 'pointer' : 'grab' }}
      onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={onClick}>
      <img src={thumbnail} alt={title} loading="lazy" draggable="false"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transition: 'opacity .4s, transform 1.1s var(--ease-out)', transform: showVideo ? 'scale(1.04)' : 'scale(1)', opacity: showVideo ? 0 : 1 }} />
      {showVideo && youtubeId && (<>
        <iframe ref={hvcRef} src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=${sound && isAudioActivated() ? 0 : 1}&controls=0&rel=0&modestbranding=1&loop=1&playlist=${youtubeId}&enablejsapi=1&playsinline=1&vq=hd1080`}
          allow="autoplay; encrypted-media" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', opacity: showVideo ? 1 : 0, transition: 'opacity .4s', pointerEvents: isMobile ? 'none' : 'auto' }} />
        {!isMobile && (<div style={{ position: 'absolute', bottom: '.5rem', right: '.5rem', zIndex: 10 }} onClick={e => e.stopPropagation()}><VolumeSlider iframeRef={hvcRef} initialVolume={sound && isAudioActivated() ? 60 : 0} /></div>)}
      </>)}
      {isMobile && youtubeId && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', opacity: showVideo ? 0 : 1, transition: 'opacity .4s' }}>
          <div style={{ width: 44, height: 44, border: '1px solid rgba(201,169,110,.55)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(6,6,6,.5)' }}>
            <svg width="16" viewBox="0 0 24 24" fill="var(--gold)"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>)}
      <div className="h-item__info">
        {num && <div className="h-item__num">{num}</div>}
        <div className="h-item__title">{title}</div>
        {sub && <div className="h-item__sub">{sub}</div>}
      </div>
    </div>
  );
}

export function VideoRowWithArrows({ items, height, itemWidth, rowRef, onPlayModal }) {
  const [showL, setShowL] = useState(false), [showR, setShowR] = useState(true);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const updateArrows = () => { const el = rowRef.current; if (!el) return; setShowL(el.scrollLeft > 5); setShowR(el.scrollLeft < el.scrollWidth - el.clientWidth - 5); };
  const scrollLeft = () => rowRef.current?.scrollBy({ left: -(rowRef.current.offsetWidth * .7), behavior: 'smooth' });
  const scrollRight = () => rowRef.current?.scrollBy({ left: rowRef.current.offsetWidth * .7, behavior: 'smooth' });
  const onDown = (e) => { drag.current = { active: true, startX: e.pageX - rowRef.current.offsetLeft, scrollLeft: rowRef.current.scrollLeft }; rowRef.current.classList.add('dragging'); };
  const onUp = () => { drag.current.active = false; rowRef.current?.classList.remove('dragging'); };
  const onMove = (e) => { if (!drag.current.active) return; e.preventDefault(); const x = e.pageX - rowRef.current.offsetLeft; rowRef.current.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX) * 1.4; };
  useEffect(() => {
    const el = rowRef.current;
    el.addEventListener('mousemove', onMove); el.addEventListener('mouseup', onUp); el.addEventListener('mouseleave', onUp); el.addEventListener('scroll', updateArrows, { passive: true }); updateArrows();
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseup', onUp); el.removeEventListener('mouseleave', onUp); el.removeEventListener('scroll', updateArrows); };
  }, []);
  const ArrowBtn = ({ dir, onClick, visible }) => (
    <button onClick={onClick} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', [dir === 'left' ? 'left' : 'right']: '0.6rem', zIndex: 10, width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(201,169,110,.45)', background: 'rgba(6,6,6,.75)', backdropFilter: 'blur(8px)', color: 'var(--gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none', transition: 'opacity .3s, background .2s, transform .2s' }}>
      <svg width="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}</svg>
    </button>
  );
  return (
    <div style={{ position: 'relative' }}>
      <ArrowBtn dir="left" onClick={scrollLeft} visible={showL} />
      <ArrowBtn dir="right" onClick={scrollRight} visible={showR} />
      <div ref={rowRef} className="h-row" style={{ height }} onMouseDown={onDown}>
        {items.map((item, i) => (
          <HoverVideoCard key={i} thumbnail={item.img} youtubeId={item.youtubeId} onPlayModal={onPlayModal} title={item.title} sub={item.sub} width={itemWidth} height={height} minWidth="240px" />
        ))}
      </div>
    </div>
  );
}
