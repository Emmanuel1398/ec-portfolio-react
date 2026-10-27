/* ─────────────────────────────────────────────────────────────
   INDEXNOW · tells Bing (and Yandex, Seznam, Naver) the moment pages
   are published or updated, instead of waiting for a re-crawl.
   Bing powers Microsoft Copilot answers, so this helps AEO.

   Runs automatically at the end of a Vercel PRODUCTION build and
   submits every URL in the sitemaps. Local builds and preview
   deploys skip it. It never fails the build.

   Manual run after a deploy:  npm run indexnow -- --force
   Check without sending:      npm run indexnow -- --force --dry-run
   The key file is written to dist/<key>.txt on build for hosting.
   ───────────────────────────────────────────────────────────── */
import './lib/env.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

const KEY = (process.env.INDEXNOW_KEY || process.env.VITE_INDEXNOW_KEY || '').trim();
const SITE_URL = (process.env.VITE_SITE_URL || 'https://emmanuelchege.com').trim().replace(/\/$/, '');

// Ensure key verification file is created in dist/ for hosting if build output exists
if (KEY && fs.existsSync(DIST)) {
  fs.writeFileSync(path.join(DIST, `${KEY}.txt`), KEY, 'utf-8');
}

const force = process.argv.includes('--force');
if (!force && process.env.VERCEL_ENV !== 'production') {
  console.log('IndexNow: skipped (only runs on Vercel production builds, or with --force)');
  process.exit(0);
}

if (!KEY) {
  console.warn('IndexNow: INDEXNOW_KEY not found in environment, skipping submission');
  process.exit(0);
}

const urls = new Set();
for (const f of fs.existsSync(DIST) ? fs.readdirSync(DIST) : []) {
  if (!/sitemap.*\.xml$/.test(f) || f === 'sitemap-index.xml') continue;
  const xml = fs.readFileSync(path.join(DIST, f), 'utf8');
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g))
    if (m[1].startsWith(SITE_URL)) urls.add(m[1].replace(/&amp;/g, '&'));
}
if (!urls.size) { console.log('IndexNow: no URLs found in sitemaps, nothing sent'); process.exit(0); }

const host = new URL(SITE_URL).host;
if (process.argv.includes('--dry-run')) {
  console.log(`IndexNow (dry run): would submit ${urls.size} URLs for ${host}`);
  process.exit(0);
}
try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE_URL}/${KEY}.txt`, urlList: [...urls].slice(0, 10000) }),
    signal: AbortSignal.timeout(15000),
  });
  console.log(`IndexNow: submitted ${urls.size} URLs, response ${res.status}`);
} catch (e) {
  console.warn(`IndexNow: request failed (${e.message}), build continues`);
}
