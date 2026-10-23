/* ─────────────────────────────────────────────────────────────
   ROUTE REGISTRY · every indexable URL, derived from the data files
   Used by scripts/generate-share-pages.js (prerendered HTML) and
   scripts/generate-sitemaps.js (sitemaps, llms.txt), so the sitemap
   lists exactly the pages that are prerendered.
   Add a work to a data file and it appears here automatically.
   ───────────────────────────────────────────────────────────── */
import { CATEGORIES } from '../data/categories.js';
import { CHARACTER_BLOGS } from '../data/characterBlogs.js';
import { ILLUSTRATION_BLOGS } from '../data/illustrationBlogs.js';
import { DRONE_SHOWS } from '../data/portfolio.js';
import {
  homeSeo, charactersSeo, droneShowsSeo, drawingsSeo, contactSeo, socialSeo,
  categorySeo, characterSeo, workSeo, droneSeo, illustrationSeo,
} from './pages.js';

/* sitemap group → file name (order = order in sitemap-index.xml) */
export const SITEMAPS = {
  pages: 'sitemap.xml',
  characters: 'characters-sitemap.xml',
  'drone-shows': 'drone-shows-sitemap.xml',
  works: 'works-sitemap.xml',
};

/* sitemap: which sitemap group the URL belongs to · key: share-image file name */
const r = (seo, sitemap, key = null) => ({ ...seo, sitemap, key });

export function getRoutes() {
  const cats = Object.values(CATEGORIES);
  return [
    r(homeSeo(), 'pages'),
    r(charactersSeo(), 'pages'),
    r(droneShowsSeo(), 'pages'),
    r(drawingsSeo(), 'pages'),
    ...cats.map(cat => r(categorySeo(cat), 'pages')),
    r(socialSeo(), 'pages'),
    r(contactSeo(), 'pages'),
    ...ILLUSTRATION_BLOGS.map(c => r(illustrationSeo(c), 'pages', `illustrations-${c.slug}`)),
    ...CHARACTER_BLOGS.map(c => r(characterSeo(c), 'characters', `characters-${c.slug}`)),
    ...DRONE_SHOWS.map(s => r(droneSeo(s), 'drone-shows', `drone-${s.slug}`)),
    ...cats.flatMap(cat => cat.items.map(w => r(workSeo(cat, w), 'works', `${cat.slug}-${w.slug}`))),
  ];
}
