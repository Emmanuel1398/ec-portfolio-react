/* Category registry — splits the old Portfolio-page sections into
   their own pages. Data comes straight from portfolio.js (no dupes).
   Add `role`, `description` and `gallery:[...]` to any item in
   portfolio.js and its blog page fills in automatically. */
import { PROJECTION_REAL, EVENT_VIZ_REAL, PRODUCT_VIZ_REAL, HOLOGRAM_REAL, EVENTS_REAL } from './portfolio.js';

export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 64);
const norm = (raw) => ({
  slug: slugify(raw.title), title: raw.title,
  img: raw.thumb || raw.img, youtubeId: raw.youtubeId || null,
  sub: raw.category || raw.sub || '',
  client: raw.client || '', year: raw.year || '', format: raw.format || '',
  role: raw.role || '', description: raw.description || '', gallery: raw.gallery || [],
  extraVideos: raw.extraVideos || [],
  siteInstall: raw.siteInstall || null,
});

export const CATEGORIES = {
  projection: {
    slug: 'projection', route: '/projection', label: 'Projection Mapping',
    title: 'Projection <em>Mapping</em>',
    sub: 'Architectural building projections, object mapping and event screen content across Nairobi and beyond.',
    items: PROJECTION_REAL.map(norm),
  },
  visualization: {
    slug: 'visualization', route: '/visualization', label: 'Visualization',
    title: '<em>Visualization</em>',
    sub: '3D pre-visualization for events and products · event setups previsualized to guide the build and the client, plus product, property and vehicle renders.',
    groups: [
      { name: 'Event Visualization', items: EVENT_VIZ_REAL.map(norm) },
      { name: 'Product Visualization', items: PRODUCT_VIZ_REAL.map(norm) },
    ],
    items: [...EVENT_VIZ_REAL, ...PRODUCT_VIZ_REAL].map(norm),
  },
  hologram: {
    slug: 'hologram', route: '/hologram', label: 'Hologram',
    title: 'Hologram <em>Content</em>',
    sub: 'Raw videos and behind-the-scenes of holograms edited before projection.',
    items: HOLOGRAM_REAL.map(norm),
  },
  events: {
    slug: 'events', route: '/events', label: 'Event Videos',
    title: 'Event <em>Videos</em>',
    sub: 'Full event films and launch openers delivered to clients.',
    items: EVENTS_REAL.map(norm),
  },
};
export const getCategory = (s) => CATEGORIES[s];
export const getWork = (c, w) => (CATEGORIES[c]?.items || []).find((i) => i.slug === w);
