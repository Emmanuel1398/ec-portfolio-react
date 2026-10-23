/* ─────────────────────────────────────────────────────────────
   SITEMAPS + llms.txt · generated from src/seo/routes.js, the same
   registry the prerendered pages come from, so every sitemap URL has
   a page and every indexable page is in a sitemap.

   <lastmod> is only written when a data entry has a real `updated`
   date. changefreq/priority are left out (Google ignores them).
   Files are written to public/ (dev server) and dist/ (deploy).
   ───────────────────────────────────────────────────────────── */
import { ROOT } from './lib/env.js';
import fs from 'fs';
import path from 'path';
import site from '../src/config/site.js';
import { getRoutes, SITEMAPS } from '../src/seo/routes.js';
import { abs } from '../src/seo/schema.js';

const PUBLIC_DIR = path.join(ROOT, 'public');
const DIST_DIR = path.join(ROOT, 'dist');

function escapeXml(unsafe) {
  if (typeof unsafe !== 'string') return '';
  return unsafe.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '\'': '&apos;', '"': '&quot;' }[c]));
}

function write(filename, content) {
  fs.writeFileSync(path.join(PUBLIC_DIR, filename), content, 'utf8');
  if (fs.existsSync(DIST_DIR)) fs.writeFileSync(path.join(DIST_DIR, filename), content, 'utf8');
  console.log(`Generated ${filename}`);
}

const routes = getRoutes().filter(r => !r.noindex);

function generateSitemap(group, filename) {
  const urls = routes.filter(r => r.sitemap === group).map(r => {
    const img = r.image ? `
    <image:image>
      <image:loc>${escapeXml(abs(r.image))}</image:loc>
    </image:image>` : '';
    const lastmod = r.updated ? `
    <lastmod>${escapeXml(r.updated)}</lastmod>` : '';
    return `
  <url>
    <loc>${escapeXml(r.canonical)}</loc>${lastmod}${img}
  </url>`;
  }).join('');

  write(filename, `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`);
}

function generateSitemapIndex() {
  const tags = Object.entries(SITEMAPS).map(([group, file]) => {
    const dates = routes.filter(r => r.sitemap === group && r.updated).map(r => r.updated).sort();
    const lastmod = dates.length ? `
    <lastmod>${escapeXml(dates[dates.length - 1])}</lastmod>` : '';
    return `
  <sitemap>
    <loc>${site.url}/${file}</loc>${lastmod}
  </sitemap>`;
  }).join('');

  write('sitemap-index.xml', `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${tags}
</sitemapindex>
`);
}

/* plain-text guide for LLM tools (llmstxt.org) · a convenience, not a
   ranking factor · rebuilt from the same routes on every build */
function generateLlmsTxt() {
  const section = (heading, group, filter = () => true) => {
    const list = routes.filter(r => r.sitemap === group && filter(r));
    if (!list.length) return '';
    return `## ${heading}\n\n${list.map(r => `- [${r.title.replace(` | ${site.name}`, '')}](${r.canonical}): ${r.description}`).join('\n')}\n`;
  };
  const home = routes.find(r => r.path === '/');
  const txt = [
    `# ${site.name}\n`,
    `> ${site.name} · ${site.jobTitle}, based in ${site.city}, Kenya. ${home ? home.description : ''}\n`,
    section('Main pages', 'pages', r => r.path.split('/').length <= 2),
    section('3D character breakdowns', 'characters'),
    section('Drone show concepts', 'drone-shows'),
    section('Event, projection, visualization and hologram work', 'works'),
    section('Illustration breakdowns', 'pages', r => r.path.split('/').length > 2),
  ].filter(Boolean).join('\n');
  write('llms.txt', txt);
}

function generateAll() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);
  for (const [group, file] of Object.entries(SITEMAPS)) generateSitemap(group, file);
  generateSitemapIndex();
  generateLlmsTxt();
}

const arg = process.argv[2] || 'all';
if (arg === 'index') generateSitemapIndex();
else generateAll();
