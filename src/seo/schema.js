/* ─────────────────────────────────────────────────────────────
   STRUCTURED DATA · JSON-LD node builders
   Pure functions (no React, no window) so the page components and
   the build scripts in scripts/ produce exactly the same graph.
   Every fact comes from site config or the data files; optional
   fields (uploadDate, published, faqs…) only appear when the data
   actually has them.
   ───────────────────────────────────────────────────────────── */
import site from '../config/site.js';
import { SOCIAL } from '../data/portfolio.js';

export const PERSON_ID  = `${site.url}/#person`;
export const WEBSITE_ID = `${site.url}/#website`;

/* absolute https URL, no trailing slash (except the bare domain) */
export const abs = (u) => {
  if (!u) return null;
  const full = /^https?:\/\//.test(u) ? u : `${site.url}${u.startsWith('/') ? '' : '/'}${u}`;
  return full !== site.url && full.endsWith('/') ? full.slice(0, -1) : full;
};

/* public profiles that identify the person · SOCIAL.youtube is a single
   video, not a channel, so it is left out until a channel URL exists */
export const SAME_AS = [SOCIAL.artstation, SOCIAL.linkedin, SOCIAL.instagram, SOCIAL.tiktok].filter(Boolean);

export const personNode = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: site.name,
  url: site.url,
  jobTitle: site.jobTitle,
  description: `${site.name} · ${site.jobTitle}. Available for commissions, collaborations and projects worldwide from ${site.city}, Kenya.`,
  image: abs(site.portrait),
  email: `mailto:${SOCIAL.email}`,
  homeLocation: {
    '@type': 'Place',
    name: `${site.city}, Kenya`,
    address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: site.country },
  },
  knowsAbout: [
    '3D character art', 'Hyperrealistic character sculpting', 'Look development',
    'Motion graphics', 'Drone show concept design', 'Projection mapping',
    'Event visualization', 'Product visualization', 'Hologram content',
  ],
  sameAs: SAME_AS,
});

export const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
});

/* crumbs: [{ name, path }] · the last crumb is the current page */
export const breadcrumbNode = (url, crumbs) => ({
  '@type': 'BreadcrumbList',
  '@id': `${url}#breadcrumb`,
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path),
  })),
});

/* page wrapper · type is WebPage, CollectionPage or ProfilePage */
export const pageNode = (type, url, name, description, extra = {}) => ({
  '@type': type,
  '@id': `${url}#webpage`,
  url, name, description,
  inLanguage: 'en',
  isPartOf: { '@id': WEBSITE_ID },
  ...extra,
});

/* items: [{ name, path? }] */
export const itemListNode = (items) => ({
  '@type': 'ItemList',
  numberOfItems: items.length,
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem', position: i + 1, name: it.name, ...(it.path ? { url: abs(it.path) } : {}),
  })),
});

/* Google requires uploadDate for video results, so no date → no node */
export const videoNode = (youtubeId, { name, description, uploadDate }) => {
  if (!youtubeId || !uploadDate) return null;
  return {
    '@type': 'VideoObject',
    name, description: description || name, uploadDate,
    thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
  };
};

/* only for Q&A that is rendered visibly on the page */
export const faqNode = (url, faqs) => (faqs && faqs.length ? {
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: faqs.map(f => ({
    '@type': 'Question', name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
} : null);

/* shared dates: only emitted when the data has real values */
export const dates = (item) => ({
  ...(item.published ? { datePublished: item.published } : {}),
  ...(item.updated ? { dateModified: item.updated } : {}),
});

export const graph = (nodes) => ({
  '@context': 'https://schema.org',
  '@graph': [personNode(), websiteNode(), ...nodes.filter(Boolean)],
});

/* safe inside <script>: no "</script>" break-out */
export const serializeJsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');
