import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CHARACTER_BLOGS } from '../src/data/characterBlogs.js';
import { DRONE_SHOWS } from '../src/data/portfolio.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

// Determine site URL from .env (fallback to a default)
// Read .env manually
let SITE_URL = 'https://emmanuelchege.com';
try {
  const envFile = fs.readFileSync(path.join(ROOT_DIR, '.env'), 'utf-8');
  const match = envFile.match(/VITE_SITE_URL=(.*)/);
  if (match && match[1]) {
    SITE_URL = match[1].trim().replace(/\/$/, '');
  }
} catch (e) {
  console.warn("Could not read .env, using default SITE_URL", SITE_URL);
}

const STATIC_PAGES = [
  '',
  '/characters',
  '/events',
  '/contact',
  '/drone-shows'
];

function ensureDirs() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);
  if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR);
}

function writeSitemap(filename, content) {
  const publicPath = path.join(PUBLIC_DIR, filename);
  const distPath = path.join(DIST_DIR, filename);
  
  fs.writeFileSync(publicPath, content, 'utf8');
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(distPath, content, 'utf8');
  }
  console.log(`Generated ${filename}`);
}

function generateStaticSitemap() {
  const urls = STATIC_PAGES.map(route => {
    return `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <changefreq>monthly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  writeSitemap('sitemap.xml', xml);
}

function generateCharactersSitemap() {
  const urls = CHARACTER_BLOGS.map(char => {
    const imgTag = char.hero ? `
    <image:image>
      <image:loc>${char.hero}</image:loc>
      <image:caption>${char.name} — ${char.epithet}</image:caption>
    </image:image>` : '';
    
    return `
  <url>
    <loc>${SITE_URL}/characters/${char.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>${imgTag}
  </url>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  writeSitemap('characters-sitemap.xml', xml);
}

function generateDroneShowsSitemap() {
  const urls = DRONE_SHOWS.map(show => {
    const imgUrl = `https://img.youtube.com/vi/${show.conceptYoutubeId}/maxresdefault.jpg`;
    return `
  <url>
    <loc>${SITE_URL}/drone-shows/${show.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${imgUrl}</image:loc>
      <image:caption>${show.title}</image:caption>
    </image:image>
  </url>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  writeSitemap('drone-shows-sitemap.xml', xml);
}

function generateSitemapIndex() {
  const sitemaps = [
    'sitemap.xml',
    'characters-sitemap.xml',
    'drone-shows-sitemap.xml'
  ];

  const sitemapTags = sitemaps.map(sm => `
  <sitemap>
    <loc>${SITE_URL}/${sm}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapTags}
</sitemapindex>`;

  writeSitemap('sitemap-index.xml', xml);
}

function generateAll() {
  ensureDirs();
  generateStaticSitemap();
  generateCharactersSitemap();
  generateDroneShowsSitemap();
  generateSitemapIndex();
}

const arg = process.argv[2] || 'all';

if (arg === 'index') {
  ensureDirs();
  generateSitemapIndex();
} else {
  generateAll();
}
