/* ─────────────────────────────────────────────────────────────
   INDEXNOW · tells Bing (and Yandex, Seznam, Naver) the moment pages
   are published or updated, instead of waiting for a re-crawl.
   Bing powers Microsoft Copilot answers, so this helps AEO.

   Runs automatically at the end of a Vercel PRODUCTION build and
   submits every URL in the sitemaps. Local builds and preview
   deploys skip it. It never fails the build.

   Manual run after a deploy:  npm run indexnow -- --force
   Check without sending:      npm run indexnow -- --force --dry-run
   The key file lives at public/<key>.txt and must stay deployed.
   ───────────────────────────────────────────────────────────── */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const KEY = 'a13e2a31ce24bf27ec91b82d39ecfcb7';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

let SITE_URL = 'https://emmanuelchege.com';
try {
  const m = fs.readFileSync(path.join(ROOT, '.env'), 'utf-8').match(/VITE_SITE_URL=(.*)/);
  if (m && m[1]) SITE_URL = m[1].trim().replace(/\/$/, '');
} catch (e) { /* default */ }

const force = process.argv.includes('--force');
if (!force && process.env.VERCEL_ENV !== 'production') {
  console.log('IndexNow: skipped (only runs on Vercel production builds, or with --force)');
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
