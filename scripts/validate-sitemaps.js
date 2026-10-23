/* ─────────────────────────────────────────────────────────────
   VALIDATE SITEMAPS
   · every sitemap file exists, is XML, and is listed in the index
   · every <loc> is an absolute https URL on the site, unique, with no
     trailing slash
   · sitemap URLs match the indexable routes in src/seo/routes.js
   · after a build (dist/ exists): each URL has a prerendered page whose
     canonical is that URL and which is not noindex
   ───────────────────────────────────────────────────────────── */
import { ROOT } from './lib/env.js';
import fs from 'fs';
import path from 'path';
import site from '../src/config/site.js';
import { getRoutes, SITEMAPS } from '../src/seo/routes.js';

const PUBLIC_DIR = path.join(ROOT, 'public');
const DIST_DIR = path.join(ROOT, 'dist');

const errors = [];
const fail = (msg) => errors.push(msg);
const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace(/&amp;/g, '&'));

const read = (file) => {
  const p = path.join(PUBLIC_DIR, file);
  if (!fs.existsSync(p)) { fail(`${file} does not exist in public/`); return null; }
  const xml = fs.readFileSync(p, 'utf8');
  if (!xml.startsWith('<?xml')) fail(`${file} is not an XML file`);
  return xml;
};

/* index */
const index = read('sitemap-index.xml');
if (index) {
  const listed = locs(index);
  for (const file of Object.values(SITEMAPS))
    if (!listed.includes(`${site.url}/${file}`)) fail(`sitemap-index.xml does not list ${file}`);
}

/* url sets */
const seen = new Map();
for (const file of Object.values(SITEMAPS)) {
  const xml = read(file);
  if (!xml) continue;
  const list = locs(xml).filter(u => !/\.(jpe?g|png|webp|gif)(\?|$)|img\.youtube|drive\.google/.test(u));
  for (const u of list) {
    if (!u.startsWith(`${site.url}`) || !u.startsWith('https://')) fail(`${file}: ${u} is not an https URL on ${site.url}`);
    if (u !== site.url && u.endsWith('/')) fail(`${file}: ${u} has a trailing slash`);
    if (seen.has(u)) fail(`${u} is listed in both ${seen.get(u)} and ${file}`);
    seen.set(u, file);
  }
  console.log(`✅ ${file} · ${list.length} URLs`);
}

/* parity with the route registry */
const expected = new Set(getRoutes().filter(r => !r.noindex).map(r => r.canonical));
for (const u of expected) if (!seen.has(u)) fail(`indexable route missing from sitemaps: ${u}`);
for (const u of seen.keys()) if (!expected.has(u)) fail(`sitemap URL is not a known route: ${u}`);

/* prerendered pages */
if (fs.existsSync(DIST_DIR)) {
  for (const u of seen.keys()) {
    const route = u.slice(site.url.length) || '/';
    const file = route === '/' ? path.join(DIST_DIR, 'index.html') : path.join(DIST_DIR, route.slice(1), 'index.html');
    if (!fs.existsSync(file)) { fail(`no prerendered page for ${u}`); continue; }
    const html = fs.readFileSync(file, 'utf8');
    const canon = (html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/) || [])[1];
    if (canon !== u) fail(`${u}: canonical in dist is ${canon || 'missing'}`);
    if (/name="robots" content="noindex/.test(html)) fail(`${u}: page is noindex but listed in a sitemap`);
  }
  console.log(`✅ checked ${seen.size} URLs against dist/`);
} else {
  console.log('ℹ dist/ not found · run `npm run build` to also check prerendered pages');
}

if (errors.length) {
  errors.forEach(e => console.error(`❌ ${e}`));
  process.exit(1);
}
console.log('✅ All sitemaps validated successfully.');
