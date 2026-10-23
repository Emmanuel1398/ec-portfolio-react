/* ─────────────────────────────────────────────────────────────
   SHARE PAGES · prerendered HTML for link previews, search engines
   and AI crawlers that do not run JavaScript.

   After `vite build`, this script writes a copy of dist/index.html
   for every route in src/seo/routes.js (dist/<route>/index.html),
   plus dist/404.html, each with:
     · the page's own title, description, canonical, robots, OG/Twitter
       tags and JSON-LD (same builders the React pages use)
     · a readable fallback inside <div id="root">: h1, summary, facts
       and links. React replaces it when it mounts (createRoot).

   Thumbnails stored on the site are resized into dist/og/ (max 1200px
   wide, compressed JPG) so WhatsApp reliably shows them. Remote images
   (Google Drive, YouTube) are linked as they are.

   New works are picked up automatically from the data files.
   Safe to re-run: injected blocks are marked and replaced.
   ───────────────────────────────────────────────────────────── */
import { ROOT } from './lib/env.js';
import fs from 'fs';
import path from 'path';
import site from '../src/config/site.js';
import { getRoutes } from '../src/seo/routes.js';
import { notFoundSeo } from '../src/seo/pages.js';
import { serializeJsonLd } from '../src/seo/schema.js';
import { NAV_LINKS } from '../src/data/nav.js';

const DIST = path.join(ROOT, 'dist');
const DEFAULT_IMAGE = site.ogImage;

let sharp = null;
try { sharp = (await import('sharp')).default; }
catch { console.warn('sharp not installed, share images will use the original files'); }

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* local image → compressed copy in dist/og; remote image → as is */
async function shareImage(src, key) {
  if (!src) return { url: DEFAULT_IMAGE };
  if (/^https?:\/\//.test(src)) return { url: src };
  const file = path.join(DIST, src.replace(/^\//, ''));
  if (!fs.existsSync(file)) return { url: DEFAULT_IMAGE };
  if (!sharp || !key) return { url: site.url + src };
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
    return { url: `${site.url}/og/${key}.jpg`, width: info.width, height: info.height };
  } catch (e) {
    console.warn(`share image failed for ${src}: ${e.message}`);
    return { url: site.url + src };
  }
}

/* ── crawler-readable fallback (replaced by React on mount) ── */
const link = (l) => {
  const ext = /^(https?:|mailto:)/.test(l.href);
  return `<a href="${esc(l.href)}"${ext && !l.href.startsWith('mailto:') ? ' rel="noreferrer"' : ''}>${esc(l.text)}</a>`;
};

function renderBody(b) {
  const out = [];
  out.push(`<nav class="pre-nav">${NAV_LINKS.map(l => link({ text: l.label, href: l.to })).join('')}</nav>`);
  out.push('<main class="pre">');
  if (b.eyebrow) out.push(`<p class="pre-eyebrow">${esc(b.eyebrow)}</p>`);
  out.push(`<h1>${esc(b.h1)}${b.sub ? `<span>${esc(b.sub)}</span>` : ''}</h1>`);
  if (b.facts && b.facts.length)
    out.push(`<dl class="pre-facts">${b.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`);
  for (const p of b.paragraphs || []) out.push(`<p>${esc(p)}</p>`);
  for (const s of b.sections || []) {
    out.push('<section>');
    if (s.heading) out.push(`<h2>${esc(s.heading)}</h2>`);
    for (const p of s.paragraphs || []) out.push(`<p>${esc(p)}</p>`);
    if (s.items && s.items.length)
      out.push(`<ul>${s.items.map(i => `<li>${i.href ? link(i) : esc(i.text)}${i.note ? ` · <span>${esc(i.note)}</span>` : ''}</li>`).join('')}</ul>`);
    out.push('</section>');
  }
  for (const f of b.faqs || []) out.push(`<section><h2>${esc(f.q)}</h2><p>${esc(f.a)}</p></section>`);
  if (b.links && b.links.length) out.push(`<p class="pre-links">${b.links.map(link).join('')}</p>`);
  out.push('</main>');
  return out.join('\n');
}

/* pristine template: strip anything a previous run injected */
const clean = (html) => html
  .replace(/\s*<!--seo-->[\s\S]*?<!--\/seo-->/, '')
  .replace(/<div id="root">[\s\S]*?<!--\/pre--><\/div>/, '<div id="root"></div>');

const template = clean(fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8'));

function render(seo, image, file) {
  const setMeta = (html, prop, value) =>
    html.replace(new RegExp(`(<meta[^>]*property="${prop}"[^>]*content=")[^"]*(")`), `$1${esc(value)}$2`);

  let html = template.replace(/<title([^>]*)>[\s\S]*?<\/title>/, `<title$1>${esc(seo.title)}</title>`);
  html = setMeta(html, 'og:title', seo.title);
  html = setMeta(html, 'og:description', seo.description);
  html = setMeta(html, 'og:type', seo.type);
  html = setMeta(html, 'og:url', seo.canonical || site.url);
  html = setMeta(html, 'og:image', image.url);
  html = setMeta(html, 'og:locale', site.locale);

  const tags = [
    `<meta data-rh="true" name="description" content="${esc(seo.description)}" />`,
    `<meta data-rh="true" name="robots" content="${seo.noindex ? 'noindex, follow' : 'index, follow'}" />`,
    seo.canonical ? `<link data-rh="true" rel="canonical" href="${esc(seo.canonical)}" />` : '',
    image.width ? `<meta data-rh="true" property="og:image:width" content="${image.width}" />` : '',
    image.height ? `<meta data-rh="true" property="og:image:height" content="${image.height}" />` : '',
    `<meta data-rh="true" property="og:image:alt" content="${esc(seo.title)}" />`,
    `<meta data-rh="true" name="twitter:card" content="summary_large_image" />`,
    `<meta data-rh="true" name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta data-rh="true" name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta data-rh="true" name="twitter:image" content="${esc(image.url)}" />`,
    seo.structuredData ? `<script data-rh="true" type="application/ld+json">${serializeJsonLd(seo.structuredData)}</script>` : '',
  ].filter(Boolean).join('\n  ');
  html = html.replace('</head>', `  <!--seo-->\n  ${tags}\n  <!--/seo-->\n</head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${renderBody(seo.body)}<!--/pre--></div>`);

  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html, 'utf8');
}

let n = 0;
for (const route of getRoutes()) {
  const image = route.image ? await shareImage(route.image, route.key) : { url: DEFAULT_IMAGE };
  const file = route.path === '/'
    ? path.join(DIST, 'index.html')
    : path.join(DIST, route.path.replace(/^\//, ''), 'index.html');
  render(route, image, file);
  n++;
}

/* Vercel serves dist/404.html, with a 404 status, for unknown paths */
render(notFoundSeo(), { url: DEFAULT_IMAGE }, path.join(DIST, '404.html'));

console.log(`Generated ${n} prerendered pages + 404.html`);
