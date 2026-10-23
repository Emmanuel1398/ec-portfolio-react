/* ─────────────────────────────────────────────────────────────
   VALIDATE SEO · checks the prerendered HTML in dist/ (run after build)
   For every index.html under dist/:
     · exactly one <title>, meta description, canonical and og:image
     · canonical equals the URL the file is served at
     · JSON-LD blocks parse and use https://schema.org
     · the crawler fallback in #root has exactly one <h1>
   Across pages: titles and descriptions are unique.
   dist/404.html: noindex and no canonical.
   ───────────────────────────────────────────────────────────── */
import { ROOT } from './lib/env.js';
import fs from 'fs';
import path from 'path';
import site from '../src/config/site.js';

const DIST = path.join(ROOT, 'dist');
if (!fs.existsSync(DIST)) { console.error('❌ dist/ not found · run `npm run build` first'); process.exit(1); }

const errors = [];
const fail = (msg) => errors.push(msg);
const count = (html, re) => (html.match(re) || []).length;
const attr = (html, re) => (html.match(re) || [])[1];

/* every index.html below dist/, skipping build assets */
function pages(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && !['assets', 'og'].includes(e.name)) pages(p, out);
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}

function checkJsonLd(html, where) {
  const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  for (const b of blocks) {
    try {
      const data = JSON.parse(b[1]);
      if (data['@context'] !== 'https://schema.org') fail(`${where}: JSON-LD without https://schema.org context`);
    } catch (e) { fail(`${where}: JSON-LD does not parse (${e.message})`); }
  }
  return blocks.length;
}

const titles = new Map(), descs = new Map();
let n = 0;
for (const file of pages(DIST)) {
  const rel = path.relative(DIST, path.dirname(file)).split(path.sep).join('/');
  const route = rel ? `/${rel}` : '/';
  const url = route === '/' ? site.url : `${site.url}${route}`;
  const html = fs.readFileSync(file, 'utf8');

  if (count(html, /<title[\s>]/g) !== 1) fail(`${route}: expected 1 <title>`);
  if (count(html, /name="description"/g) !== 1) fail(`${route}: expected 1 meta description`);
  if (count(html, /rel="canonical"/g) !== 1) fail(`${route}: expected 1 canonical`);
  if (count(html, /property="og:image"/g) !== 1) fail(`${route}: expected 1 og:image`);
  const canon = attr(html, /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
  if (canon && canon !== url) fail(`${route}: canonical ${canon} ≠ ${url}`);
  if (/name="robots" content="noindex/.test(html)) fail(`${route}: unexpected noindex`);
  if (!checkJsonLd(html, route)) fail(`${route}: no JSON-LD`);

  const root = attr(html, /<div id="root">([\s\S]*?)<!--\/pre--><\/div>/) || '';
  if (count(root, /<h1[\s>]/g) !== 1) fail(`${route}: expected 1 <h1> in the prerendered #root`);

  const title = attr(html, /<title[^>]*>([\s\S]*?)<\/title>/);
  const desc = attr(html, /<meta[^>]*name="description"[^>]*content="([^"]*)"/);
  if (titles.has(title)) fail(`duplicate title "${title}" · ${titles.get(title)} and ${route}`);
  if (descs.has(desc)) fail(`duplicate description on ${descs.get(desc)} and ${route}`);
  titles.set(title, route); descs.set(desc, route);
  n++;
}

/* 404 page */
const notFound = path.join(DIST, '404.html');
if (!fs.existsSync(notFound)) fail('dist/404.html is missing');
else {
  const html = fs.readFileSync(notFound, 'utf8');
  if (!/name="robots" content="noindex/.test(html)) fail('404.html is not noindex');
  if (/rel="canonical"/.test(html)) fail('404.html should not have a canonical');
}

if (errors.length) {
  errors.forEach(e => console.error(`❌ ${e}`));
  console.error(`\n${errors.length} problem(s) across ${n} pages`);
  process.exit(1);
}
console.log(`✅ ${n} prerendered pages + 404.html passed SEO checks`);
