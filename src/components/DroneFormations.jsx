import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   DRONE FORMATIONS · a night-sky drone show drawn on canvas.
   Glowing drones fly between formations taken from the shows on
   the Drone Shows page: the Our Oceans turtle, fish and coral,
   the Kenya and Africa outlines, a globe, the La Mada palm, a
   heart, a star and show names spelled out in light.
   Each formation is an outline (SVG path or text) drawn off-screen,
   then sampled into evenly spaced drone positions.
   ───────────────────────────────────────────────────────────── */
const N = 170;
const FORM_MS = 3400, HOLD_MS = 3800, DISP_MS = 1300;

/* outlines in a 100 × 100 box */
const SHAPES = [
  { name: 'turtle', colors: ['#ffa94d', '#ffb86b', '#6ec6ff'], d:
    'M50 30 C66 30 74 44 74 56 C74 70 64 80 50 80 C36 80 26 70 26 56 C26 44 34 30 50 30 Z' +
    'M50 30 C44 29 43 20 50 15 C57 20 56 29 50 30' +
    'M31 43 C19 34 10 33 5 38 C12 45 21 49 28 52 M69 43 C81 34 90 33 95 38 C88 45 79 49 72 52' +
    'M33 72 C25 78 23 86 27 89 C31 85 35 81 39 77 M67 72 C75 78 77 86 73 89 C69 85 65 81 61 77' +
    'M50 39 L60 47 L58 62 L50 70 L42 62 L40 47 Z' },
  { name: 'fish', colors: ['#7fd3ff', '#c38bff', '#ff8fd0'], d:
    'M14 50 C30 28 62 28 76 50 C62 72 30 72 14 50 Z M76 50 L94 34 L90 50 L94 66 Z M30 46 L30 47' +
    'M40 36 C44 44 44 56 40 64 M54 34 C58 44 58 56 54 66' },
  { name: 'coral', colors: ['#c38bff', '#7af0b0', '#ffd36e'], d:
    'M50 94 L50 58 M50 72 L36 58 L34 42 M36 58 L24 52 L20 40 M50 64 L64 50 L66 34 M64 50 L78 44 L82 32' +
    'M50 58 L50 36 L42 24 M50 36 L58 22 M34 42 L28 30 M66 34 L72 22' },
  { name: 'kenya', colors: ['#3ddc84', '#ff5a5a', '#f2f2f2'], d:
    'M18 8 L34 4 L44 14 L58 12 L70 18 L82 16 L88 22 L76 38 L76 62 L68 72 L62 84 L58 94 L52 96 L44 88 L20 74 L16 64 L22 52 L18 40 L22 28 Z' },
  { name: 'globe', colors: ['#6ec6ff', '#7af0b0', '#e8d5a8'], d:
    'M50 10 A40 40 0 1 1 49.9 10 Z M50 10 C30 30 30 70 50 90 C70 70 70 30 50 10 M10 50 L90 50 M18 30 L82 30 M18 70 L82 70' },
  { name: 'africa', colors: ['#e8d5a8', '#c9a96e', '#ffb347'], d:
    'M38 6 L52 4 L62 10 L72 12 L80 22 L94 30 L86 44 L78 56 L76 70 L66 82 L60 94 L52 96 L48 86 L46 72 L40 60 L38 50 L24 48 L12 40 L8 28 L16 16 L28 10 Z' },
  { name: 'palm', colors: ['#7af0b0', '#ffd36e', '#ffa94d'], d:
    'M48 94 C50 72 52 54 50 34 M50 34 C40 24 28 24 16 32 M50 34 C42 18 30 12 20 12 M50 34 C58 18 70 12 82 14 M50 34 C62 24 74 26 86 34 M50 34 C49 22 51 14 55 6' +
    'M30 94 L70 94' },
  { name: 'heart', colors: ['#ff5a7a', '#ff8fd0', '#ffd1dc'], d:
    'M50 86 C20 62 8 42 22 26 C34 14 48 22 50 32 C52 22 66 14 78 26 C92 42 80 62 50 86 Z' },
  { name: 'star', colors: ['#e8d5a8', '#c9a96e', '#ffffff'], d:
    'M50 8 L61 38 L94 38 L67 57 L77 90 L50 70 L23 90 L33 57 L6 38 L39 38 Z' },
  { name: 'text', text: 'HFCK', colors: ['#ffd36e', '#e8d5a8', '#ffffff'] },
  { name: 'text', text: 'MCC', colors: ['#6ec6ff', '#e8d5a8', '#ffffff'] },
  { name: 'text', text: 'KAMPALA', colors: ['#ffd36e', '#ff5a5a', '#ffffff'] },
  { name: 'text', text: 'OUR OCEANS', colors: ['#6ec6ff', '#7af0b0', '#ffffff'] },
];

const hexToRgb = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };

/* draw an outline off-screen and pick N evenly spaced points on it */
function sampleShape(shape, W, H) {
  const off = document.createElement('canvas');
  off.width = W; off.height = H;
  const c = off.getContext('2d');
  c.strokeStyle = '#fff'; c.fillStyle = '#fff'; c.lineJoin = 'round'; c.lineCap = 'round';
  if (shape.text) {
    let fs = Math.min(H * 0.42, W * 1.5 / shape.text.length);
    c.font = `700 ${fs}px Inter, Arial, sans-serif`;
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.lineWidth = Math.max(2, fs * 0.02);
    c.strokeText(shape.text, W / 2, H * 0.5);
  } else {
    const size = Math.min(W, H) * 0.64;
    c.translate((W - size) / 2, (H - size) / 2 + H * 0.02);
    c.scale(size / 100, size / 100);
    c.lineWidth = 1.6;
    c.stroke(new Path2D(shape.d));
  }
  const data = c.getImageData(0, 0, W, H).data;
  const px = [];
  const step = 2;
  for (let y = 0; y < H; y += step) for (let x = 0; x < W; x += step) if (data[(y * W + x) * 4 + 3] > 120) px.push([x, y]);
  if (!px.length) return null;
  for (let i = px.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [px[i], px[j]] = [px[j], px[i]]; }
  /* greedy spacing: keep points at least `gap` apart, relax the gap until N are found */
  let gap = Math.sqrt(px.length * step * step / N) * 1.25, pts = [];
  while (gap > 1) {
    pts = [];
    for (const p of px) {
      if (pts.every(q => (q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2 > gap * gap)) { pts.push(p); if (pts.length === N) break; }
    }
    if (pts.length >= N) break;
    gap *= 0.85;
  }
  while (pts.length < N) pts.push(pts[(Math.random() * pts.length) | 0]);
  return pts.map(([x, y]) => ({ tx: x, ty: y }));
}

/* soft glow sprite, tinted per colour */
const spriteCache = new Map();
function glowSprite(rgb) {
  const key = rgb.join(',');
  if (spriteCache.has(key)) return spriteCache.get(key);
  const s = document.createElement('canvas'); s.width = s.height = 64;
  const g = s.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, `rgba(255,255,255,1)`);
  grd.addColorStop(0.18, `rgba(${key},0.95)`);
  grd.addColorStop(0.45, `rgba(${key},0.28)`);
  grd.addColorStop(1, `rgba(${key},0)`);
  g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
  spriteCache.set(key, s);
  return s;
}

export default function DroneFormations() {
  const cvRef = useRef(null);

  useEffect(() => {
    const cv = cvRef.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, dpr = 1, raf = 0, visible = true, lastTs = 0;
    let drones = [], targets = [], stars = [], city = [];
    let phase = 0, phaseTime = 0, order = [], formIdx = 0, palette = SHAPES[0].colors.map(hexToRgb);

    const shuffleOrder = () => { order = SHAPES.map((_, i) => i).sort(() => Math.random() - 0.5); };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.offsetWidth; H = cv.offsetHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round(W * H / 3500) }, () => ({
        x: Math.random() * W, y: Math.random() * H * 0.78, r: Math.random() * 1.1 + 0.2,
        a: Math.random() * 0.6 + 0.15, s: Math.random() * 0.002 + 0.0005, p: Math.random() * 6.28,
      }));
      city = Array.from({ length: Math.round(W / 26) }, (_, i) => ({
        x: (i + Math.random() * 0.6) * 26, y: H * 0.865 + (Math.random() - 0.5) * 3,
        r: Math.random() * 1.4 + 0.6, warm: Math.random() > 0.3,
      }));
    };
    const scatter = () => Array.from({ length: N }, () => ({ tx: Math.random() * W, ty: Math.random() * H * 0.8 }));
    const initDrones = () => {
      drones = Array.from({ length: N }, () => ({
        x: Math.random() * W, y: H * (0.9 + Math.random() * 0.1),
        pulse: Math.random() * 6.28, ps: Math.random() * 0.03 + 0.01, size: Math.random() * 0.5 + 0.8,
        col: [232, 213, 168], k: Math.random(),
      }));
    };
    const setFormation = () => {
      if (!order.length || formIdx >= order.length) { shuffleOrder(); formIdx = 0; }
      const shape = SHAPES[order[formIdx]];
      targets = sampleShape(shape, Math.max(1, Math.round(W)), Math.max(1, Math.round(H))) || scatter();
      palette = shape.colors.map(hexToRgb);
      formIdx++;
    };

    const draw = (ts) => {
      raf = requestAnimationFrame(draw);
      if (!visible) { lastTs = ts; return; }
      const dt = lastTs ? Math.min(ts - lastTs, 50) : 16; lastTs = ts;
      phaseTime += dt;
      if (phase === 0 && phaseTime > FORM_MS) { phase = 1; phaseTime = 0; }
      else if (phase === 1 && phaseTime > HOLD_MS) { phase = 2; phaseTime = 0; targets = scatter(); }
      else if (phase === 2 && phaseTime > DISP_MS) { phase = 0; phaseTime = 0; setFormation(); }

      ctx.clearRect(0, 0, W, H);

      /* stars */
      for (const s of stars) {
        const a = s.a * (0.6 + 0.4 * Math.sin(ts * s.s + s.p));
        ctx.fillStyle = `rgba(220,230,255,${a})`;
        ctx.fillRect(s.x, s.y, s.r, s.r);
      }
      /* horizon lights and their reflections */
      ctx.globalCompositeOperation = 'lighter';
      for (const c of city) {
        const col = c.warm ? '255,190,110' : '200,220,255';
        ctx.fillStyle = `rgba(${col},0.85)`;
        ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, 6.28); ctx.fill();
        ctx.fillStyle = `rgba(${col},0.07)`;
        ctx.fillRect(c.x - c.r * 0.5, c.y + 5, c.r, H * 0.03 * (0.6 + Math.sin(ts * 0.002 + c.x) * 0.3));
      }

      const speed = phase === 0 ? 0.035 : phase === 2 ? 0.08 : 0.003;
      const holding = phase === 1;
      /* links between neighbouring drones while in formation */
      if (holding || (phase === 0 && phaseTime > FORM_MS * 0.6)) {
        ctx.lineWidth = 0.6;
        for (let i = 0; i < N; i++) {
          const d = drones[i];
          for (let j = i + 1; j < Math.min(N, i + 6); j++) {
            const e = drones[j], dx = e.x - d.x, dy = e.y - d.y, dist = Math.hypot(dx, dy);
            if (dist < 42) {
              ctx.strokeStyle = `rgba(${d.col.map(Math.round).join(',')},${(1 - dist / 42) * 0.22})`;
              ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(e.x, e.y); ctx.stroke();
            }
          }
        }
      }
      /* drones */
      drones.forEach((d, i) => {
        const t = targets[i] || { tx: d.x, ty: d.y };
        d.x += (t.tx - d.x) * speed; d.y += (t.ty - d.y) * speed;
        if (holding) { d.x += Math.sin(ts * 0.0008 + i * 0.6) * 0.25; d.y += Math.cos(ts * 0.0009 + i * 0.8) * 0.25; }
        const target = palette[Math.floor(d.k * palette.length) % palette.length];
        d.col = d.col.map((v, k) => v + (target[k] - v) * 0.04);
        d.pulse += d.ps * dt * 0.06;
        const glow = 0.75 + Math.sin(d.pulse) * 0.25;
        const r = (phase === 2 ? 9 : 12) * d.size * glow;
        ctx.globalAlpha = phase === 2 ? 0.75 : 1;
        ctx.drawImage(glowSprite(d.col.map(Math.round)), d.x - r, d.y - r, r * 2, r * 2);
      });
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const onResize = () => { resize(); initDrones(); phase = 0; phaseTime = 0; formIdx = Math.max(0, formIdx - 1); setFormation(); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(cv);
    window.addEventListener('resize', onResize);
    resize(); initDrones(); shuffleOrder(); setFormation();
    if (reduce) { /* still frame: drones sitting in the first formation */
      drones.forEach((d, i) => { d.x = targets[i].tx; d.y = targets[i].ty; d.col = palette[i % palette.length]; });
      phase = 1; phaseTime = -1e9;
    }
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={cvRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', display:'block' }} />;
}
