/* ─────────────────────────────────────────────────────────────
   SHARE PAGES · per-link previews for WhatsApp, LinkedIn, X, etc.

   Link-preview bots do not run JavaScript, so they only ever saw the
   default tags in index.html. After `vite build`, this script writes a
   copy of dist/index.html for every blog route (dist/<route>/index.html)
   with that blog's own title, description and thumbnail baked in.

   Thumbnails stored on the site are resized into dist/og/ (max 1200px
   wide, compressed JPG) so WhatsApp reliably shows them. Remote images
   (Google Drive, YouTube) are linked as they are.

   New blogs are picked up automatically from the data files, nothing
   to add by hand.
   ───────────────────────────────────────────────────────────── */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CHARACTER_BLOGS } from '../src/data/characterBlogs.js';
import { ILLUSTRATION_BLOGS } from '../src/data/illustrationBlogs.js';
import { DRONE_SHOWS } from '../src/data/portfolio.js';
import { CATEGORIES } from '../src/data/categories.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

let SITE_URL = 'https://emmanuelchege.com';
try {
  const m = fs.readFileSync(path.join(ROOT, '.env'), 'utf-8').match(/VITE_SITE_URL=(.*)/);
  if (m && m[1]) SITE_URL = m[1].trim().replace(/\/$/, '');
} catch (e) { /* default */ }

const SITE_NAME = 'Emmanuel Chege';
const DEFAULT_IMAGE = `${SITE_URL}/Hyperlink_card.png`;

let sharp = null;
try { sharp = (await import('sharp')).default; }
catch (e) { console.warn('sharp not installed, share images will use the original files'); }

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* first ~190 characters of plain text, cut on a word */
const clip = (s, n = 190) => {
  const t = String(s || '').replace(/\s+/g, ' ').replace(/^["“]+|["”]+$/g, '').trim();
  if (t.length <= n) return t;
  return t.slice(0, n).replace(/\s+\S*$/, '') + '…';
};

/* local image → compressed copy in dist/og; remote image → as is */
async function shareImage(src, key) {
  if (!src) return { url: DEFAULT_IMAGE };
  if (/^https?:\/\//.test(src)) return { url: src };
  const file = path.join(DIST, src.replace(/^\//, ''));
  if (!fs.existsSync(file)) return { url: DEFAULT_IMAGE };
  if (!sharp) return { url: SITE_URL + src };
  const outDir = path.join(DIST, 'og');
  fs.mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, `${key}.jpg`);
  try {
    let width = 1200, quality = 80, info;
    for (let i = 0; i < 4; i++) {
      info = await sharp(file).rotate().flatten({ background: '#080808' })
        .resize({ width, withoutEnlargement: true })
        .jpeg({ quality, mozjpeg: true }).toFile(out);
      if (info.size <= 280 * 1024) break;          // WhatsApp prefers small previews
      quality -= 10; width = Math.round(width * 0.85);
    }
    return { url: `${SITE_URL}/og/${key}.jpg`, width: info.width, height: info.height };
  } catch (e) {
    console.warn(`share image failed for ${src}: ${e.message}`);
    return { url: SITE_URL + src };
  }
}

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');

function render({ route, title, description, image, type = 'article' }) {
  const url = `${SITE_URL}${route}`;
  const setMeta = (html, prop, value) =>
    html.replace(new RegExp(`(<meta[^>]*property="${prop}"[^>]*content=")[^"]*(")`), `$1${esc(value)}$2`);

  let html = template.replace(/<title([^>]*)>[\s\S]*?<\/title>/, `<title$1>${esc(title)}</title>`);
  html = setMeta(html, 'og:title', title);
  html = setMeta(html, 'og:description', description);
  html = setMeta(html, 'og:type', type);
  html = setMeta(html, 'og:url', url);
  html = setMeta(html, 'og:image', image.url);

  const extra = [
    `<meta data-rh="true" name="description" content="${esc(description)}" />`,
    image.width ? `<meta data-rh="true" property="og:image:width" content="${image.width}" />` : '',
    image.height ? `<meta data-rh="true" property="og:image:height" content="${image.height}" />` : '',
    `<meta data-rh="true" property="og:image:alt" content="${esc(title)}" />`,
    `<meta data-rh="true" name="twitter:card" content="summary_large_image" />`,
    `<meta data-rh="true" name="twitter:title" content="${esc(title)}" />`,
    `<meta data-rh="true" name="twitter:description" content="${esc(description)}" />`,
    `<meta data-rh="true" name="twitter:image" content="${esc(image.url)}" />`,
    `<link data-rh="true" rel="canonical" href="${esc(url)}" />`,
  ].filter(Boolean).join('\n  ');
  html = html.replace('</head>', `  ${extra}\n</head>`);

  const dir = path.join(DIST, route.replace(/^\//, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
}

const pages = [];

/* listing pages */
const LISTINGS = [
  ['/characters', '3D Characters & Creatures', 'In-depth technical breakdowns of hyperreal, stylized and creature work, sculpt to look development, with a focus on rendering melanated skin honestly.'],
  ['/drone-shows', 'Drone Show Concepts', 'Drone show concepts and visualizers, aerial storytelling designed for live events.'],
  ['/drawings-illustrations', 'Drawings & Illustrations', 'Illustration work, from hand drawn pieces to designs carried through into 3D.'],
  ['/contact', 'Contact', 'Get in touch with Emmanuel Chege for 3D characters, motion design, visualization and event content.'],
  ['/social', 'Social', 'Follow Emmanuel Chege across social platforms.'],
];
for (const [route, name, desc] of LISTINGS)
  pages.push({ route, title: `${name} | ${SITE_NAME}`, description: desc, img: null, key: null, type: 'website' });
for (const cat of Object.values(CATEGORIES))
  pages.push({ route: cat.route, title: `${cat.label} | ${SITE_NAME}`, description: cat.sub, img: null, key: null, type: 'website' });

/* characters */
for (const c of CHARACTER_BLOGS)
  pages.push({
    route: `/characters/${c.slug}`,
    title: `${c.name} · ${c.epithet} | ${SITE_NAME}`,
    description: c.tagline || `3D character breakdown: ${c.name}.`,
    img: c.thumb || c.hero, key: `characters-${c.slug}`,
  });

/* event videos, projection, visualization, hologram */
for (const cat of Object.values(CATEGORIES))
  for (const w of cat.items)
    pages.push({
      route: `${cat.route}/${w.slug}`,
      title: `${w.title} | ${SITE_NAME}`,
      description: w.role || w.description || [w.sub, w.client, w.year].filter(Boolean).join(' · ') || cat.sub,
      img: w.img || (w.youtubeId ? `https://img.youtube.com/vi/${w.youtubeId}/hqdefault.jpg` : null),
      key: `${cat.slug}-${w.slug}`,
    });

/* drone shows */
for (const s of DRONE_SHOWS)
  pages.push({
    route: `/drone-shows/${s.slug}`,
    title: `${s.title} | ${SITE_NAME}`,
    description: s.tagline || s.description || `Drone show concept: ${s.title}.`,
    img: s.thumb || (s.conceptYoutubeId ? `https://img.youtube.com/vi/${s.conceptYoutubeId}/hqdefault.jpg` : null),
    key: `drone-${s.slug}`,
  });

/* illustrations */
for (const c of ILLUSTRATION_BLOGS)
  pages.push({
    route: `/drawings-illustrations/${c.slug}`,
    title: `${c.name} | ${SITE_NAME}`,
    description: c.tagline || `Illustration breakdown: ${c.name}.`,
    img: c.thumb || c.hero, key: `illustrations-${c.slug}`,
  });

let n = 0;
for (const p of pages) {
  const image = p.img ? await shareImage(p.img, p.key) : { url: DEFAULT_IMAGE };
  render({ route: p.route, title: p.title, description: clip(p.description), image, type: p.type });
  n++;
}
console.log(`Generated ${n} share pages`);
