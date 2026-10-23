/* ─────────────────────────────────────────────────────────────
   PAGE SEO · one builder per page type
   Each builder returns everything a page needs for search and
   answer engines, and is used in two places:
     · page components  → updateSeo(xxxSeo(...))       (runtime)
     · scripts/          → prerendered dist/<route>/index.html
   so titles, descriptions, canonicals and JSON-LD never drift.

   `body` is the crawler-readable fallback written into #root at
   build time. It must only hold text the real page also shows.
   ───────────────────────────────────────────────────────────── */
import site from '../config/site.js';
import { CHARACTER_BLOGS } from '../data/characterBlogs.js';
import { ILLUSTRATION_BLOGS } from '../data/illustrationBlogs.js';
import { DRONE_SHOWS, REEL_SLIDES, OLDER_REELS, SOCIAL, SOCIAL_MEDIA_ROW1, SOCIAL_MEDIA_ROW2 } from '../data/portfolio.js';
import { NAV_LINKS } from '../data/nav.js';
import {
  abs, PERSON_ID, graph, pageNode, breadcrumbNode, itemListNode, videoNode, faqNode, dates,
} from './schema.js';

/* first ~n characters of plain text, cut on a word */
export const clip = (s, n = 190) => {
  const t = String(s || '').replace(/\s+/g, ' ').replace(/^["“]+|["”]+$/g, '').trim();
  if (t.length <= n) return t;
  return t.slice(0, n).replace(/\s+\S*$/, '') + '…';
};
const stripTags = (s) => String(s || '').replace(/<[^>]+>/g, '');
const ytThumb = (id) => (id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null);
const paras = (s) => String(s || '').split('\n').map(p => p.trim()).filter(Boolean);

const HOME_CRUMB = { name: 'Home', path: '/' };
const CONTACT_LINK = { text: 'About & Contact', href: '/contact' };

/* common return shape · fields map 1:1 onto SeoProvider state */
const seo = ({ path, title, description, image = null, type = 'website', noindex = false, nodes = [], body, updated = null }) => ({
  path,
  title,
  description,
  canonical: noindex ? null : abs(path),
  image,
  type,
  noindex,
  structuredData: noindex ? null : graph(nodes),
  body,
  updated,
});

/* ── HOME ──────────────────────────────────────────── */
export function homeSeo() {
  const url = abs('/');
  const title = `${site.name} · 3D Artist & Motion Designer in Nairobi, Kenya`;
  const description = site.description;
  return seo({
    path: '/', title, description,
    nodes: [pageNode('WebPage', url, title, description, { about: { '@id': PERSON_ID } })],
    body: {
      eyebrow: 'Portfolio',
      h1: site.name,
      paragraphs: ['3D Generalist · Motion Graphics Artist · Nairobi'],
      sections: [
        { heading: 'Portfolio Reels', items: [
          ...REEL_SLIDES.map(s => ({ text: [s.title, s.subtitle].filter(Boolean).join(' · '), note: s.sub })),
          ...OLDER_REELS.map(r => ({ text: r.title, note: r.sub })),
        ] },
        { heading: 'Work', items: NAV_LINKS.filter(l => l.to !== '/').map(l => ({ text: l.label, href: l.to })) },
      ],
    },
  });
}

/* ── LISTING PAGES ─────────────────────────────────── */
function listing({ path, label, h1, intro, description, items, extraLinks = [] }) {
  const url = abs(path);
  const title = `${label} | ${site.name}`;
  const desc = clip(description || intro);
  return seo({
    path, title, description: desc,
    nodes: [
      pageNode('CollectionPage', url, title, desc, {
        breadcrumb: { '@id': `${url}#breadcrumb` },
        about: { '@id': PERSON_ID },
        mainEntity: itemListNode(items.map(i => ({ name: i.text, path: i.href }))),
      }),
      breadcrumbNode(url, [HOME_CRUMB, { name: label, path }]),
    ],
    body: {
      eyebrow: label,
      h1: h1 || label,
      paragraphs: [intro],
      sections: [{ heading: null, items }],
      links: [...extraLinks, CONTACT_LINK],
    },
  });
}

export const charactersSeo = () => listing({
  path: '/characters', label: '3D Characters', h1: '3D Characters',
  description: 'In-depth technical breakdowns of my hyperreal, stylized and creature work · sculpt to look-development, with a focus on rendering melanated skin honestly.',
  intro: 'In-depth technical breakdowns of my hyperreal, stylized and creature work · sculpt to look-development, with a focus on rendering melanated skin honestly. Each breakdown is built out across upcoming sessions; some sections are still being filled in.',
  items: CHARACTER_BLOGS.map(c => ({ text: `${c.name} · ${c.epithet}`, href: `/characters/${c.slug}`, note: c.tagline })),
});

export const droneShowsSeo = () => listing({
  path: '/drone-shows', label: 'Drone Show Concepts', h1: 'Drone Shows',
  description: 'Each drone show begins as a narrative written on paper · a story, a script, a sequence of formations designed to tell a message in the night sky.',
  intro: 'Each drone show begins as a narrative written on paper · a story, a script, a sequence of formations designed to tell a message in the night sky. These are those stories, from initial concept through storyboard to final computerised formation visual. My role is to translate ideas into compelling visual narratives. This involves developing the artistic and creative concept, writing the show script, designing the key imagery, and crafting the narration and voice-over that bring meaning to each formation and transition. Once the creative vision is fully defined, it is handed over to the drone show programmers, who transform the concept into a synchronized aerial performance.',
  items: DRONE_SHOWS.map(s => ({ text: s.title, href: `/drone-shows/${s.slug}`, note: [s.client, s.location, s.year].filter(Boolean).join(' · ') })),
});

export const drawingsSeo = () => listing({
  path: '/drawings-illustrations', label: 'Drawings & Illustrations',
  intro: 'Work made on paper and in vector, either side of the 3D. Graphite and charcoal studies from my re-introduction to fine art, and illustration commissioned for print and product.',
  items: ILLUSTRATION_BLOGS.map(c => ({ text: `${c.name} · ${c.epithet}`, href: `/drawings-illustrations/${c.slug}`, note: c.tagline })),
});

export const categorySeo = (cat) => listing({
  path: cat.route, label: cat.label, h1: stripTags(cat.title),
  intro: cat.sub,
  items: cat.items.map(w => ({ text: w.title, href: `${cat.route}/${w.slug}`, note: [w.client, w.year].filter(Boolean).join(' · ') })),
});

export const socialSeo = () => listing({
  path: '/social', label: 'Social Media Content',
  intro: 'Branded motion graphics, GIF animations and social-first visual storytelling.',
  items: [...SOCIAL_MEDIA_ROW1, ...SOCIAL_MEDIA_ROW2].map(i => ({ text: i.title })),
  extraLinks: [{ text: 'Follow @arte_artorius', href: SOCIAL.instagram }],
});

/* ── ABOUT & CONTACT ───────────────────────────────── */
export function contactSeo() {
  const path = '/contact';
  const url = abs(path);
  const title = `About & Contact | ${site.name}`;
  const intro = `${site.name} · ${site.jobTitle}. Available for commissions, collaborations and projects worldwide from ${site.city}, Kenya.`;
  return seo({
    path, title, description: intro, type: 'profile',
    nodes: [
      pageNode('ProfilePage', url, title, intro, {
        breadcrumb: { '@id': `${url}#breadcrumb` },
        mainEntity: { '@id': PERSON_ID },
      }),
      breadcrumbNode(url, [HOME_CRUMB, { name: 'About & Contact', path }]),
    ],
    body: {
      h1: 'About & Contact',
      paragraphs: [intro],
      sections: [
        { heading: 'About Emmanuel Chege · 3D Generalist. Motion Graphics Artist.', paragraphs: [
          'I am a 3D Generalist with a passion for pushing creative boundaries at the intersection of motion graphics, animation and 3D design. My work reflects a meticulous attention to detail · from crafting high-fidelity 3D assets with a hyper-realistic style, to producing polished final artworks that communicate with visual clarity and purpose.',
          'I approach every project with both technical discipline and artistic curiosity, consistently finding ways to maximise quality within real-world constraints. Whether I am working on character work, visual effects, or dynamic motion design, my dedication to the craft is evident in every frame.',
          'I am currently growing my presence in the industry, with a focus on reaching global audiences · exploring animation in its many art forms: 3D visualizations, drone show concepts, 3D animation, hyper-realistic characters, motion graphics and projection mapping. Simply put · I bring concepts and ideas to life.',
        ] },
        { heading: 'Contact', paragraphs: [
          'Available for freelance commissions, agency collaborations and project discussions. Based in Nairobi, Kenya · operating globally and remotely.',
        ], items: [
          { text: `Email · ${SOCIAL.email}`, href: `mailto:${SOCIAL.email}` },
          { text: 'ArtStation', href: SOCIAL.artstation },
          { text: 'LinkedIn', href: SOCIAL.linkedin },
          { text: 'Instagram · @arte_artorius', href: SOCIAL.instagram },
          { text: 'TikTok · @arte_artorius', href: SOCIAL.tiktok },
        ] },
      ],
    },
  });
}

/* ── DETAIL PAGES ──────────────────────────────────── */
function breakdown({ c, path, hub, hubLabel, workType, extraWork = {}, next }) {
  const url = abs(path);
  const title = `${c.name} · ${c.epithet} | ${site.name}`;
  const description = clip(c.summary || c.tagline || `${hubLabel}: ${c.name}.`);
  const software = (c.specs && c.specs.software) || [];
  const work = {
    '@type': workType,
    '@id': `${url}#work`,
    name: `${c.name} · ${c.epithet}`,
    description: clip(c.tagline, 500),
    url,
    image: abs(c.hero || c.thumb),
    creator: { '@id': PERSON_ID },
    ...(c.year ? { dateCreated: c.year } : {}),
    ...(c.category ? { genre: c.category } : {}),
    ...(software.length ? { keywords: software.join(', ') } : {}),
    ...(c.status ? { creativeWorkStatus: c.status } : {}),
    ...dates(c),
    ...extraWork,
  };
  return seo({
    path, title, description, image: c.thumb || c.hero, type: 'article', updated: c.updated,
    nodes: [
      pageNode('WebPage', url, title, description, {
        breadcrumb: { '@id': `${url}#breadcrumb` },
        mainEntity: { '@id': `${url}#work` },
        ...dates(c),
      }),
      work,
      breadcrumbNode(url, [HOME_CRUMB, { name: hubLabel, path: hub }, { name: c.name, path }]),
      faqNode(url, c.faqs),
    ],
    body: {
      eyebrow: [c.category, c.year].filter(Boolean).join(' · '),
      h1: c.name,
      sub: c.epithet,
      paragraphs: [c.summary, c.tagline, ...(c.intro || [])].filter(Boolean),
      facts: software.length ? [['Software', software.join(', ')]] : [],
      faqs: c.faqs,
      links: [{ text: `← ${hubLabel}`, href: hub }, next, CONTACT_LINK].filter(Boolean),
    },
  });
}

export function characterSeo(c) {
  const i = CHARACTER_BLOGS.findIndex(x => x.slug === c.slug);
  const n = CHARACTER_BLOGS[(i + 1) % CHARACTER_BLOGS.length];
  return breakdown({
    c, path: `/characters/${c.slug}`, hub: '/characters', hubLabel: '3D Characters', workType: 'CreativeWork',
    next: n && n.slug !== c.slug ? { text: `Next character · ${n.name} · ${n.epithet}`, href: `/characters/${n.slug}` } : null,
  });
}

export const illustrationSeo = (c) => breakdown({
  c, path: `/drawings-illustrations/${c.slug}`, hub: '/drawings-illustrations', hubLabel: 'Drawings & Illustrations',
  workType: 'VisualArtwork', extraWork: { artform: 'Illustration' },
});

/* other works in the same category · same client first, then same year */
export function relatedWorks(cat, w, n = 3) {
  const score = (o) => (w.client && o.client === w.client ? 2 : 0) + (w.year && o.year === w.year ? 1 : 0);
  return cat.items
    .filter(o => o.slug !== w.slug)
    .map((o, i) => ({ o, i, s: score(o) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, n)
    .map(x => x.o);
}

export function workSeo(cat, w) {
  const path = `${cat.route}/${w.slug}`;
  const url = abs(path);
  const title = `${w.title} | ${site.name}`;
  const description = clip(w.summary || w.role || w.description || [w.title, w.sub, w.client, w.year].filter(Boolean).join(' · '));
  const related = relatedWorks(cat, w);
  const video = videoNode(w.youtubeId, { name: w.title, description, uploadDate: w.uploadDate });
  return seo({
    path, title, description, image: w.img || ytThumb(w.youtubeId), type: 'article', updated: w.updated,
    nodes: [
      pageNode('WebPage', url, title, description, {
        breadcrumb: { '@id': `${url}#breadcrumb` },
        mainEntity: { '@id': `${url}#work` },
        ...dates(w),
      }),
      {
        '@type': 'CreativeWork',
        '@id': `${url}#work`,
        name: w.title,
        description,
        url,
        image: abs(w.img || ytThumb(w.youtubeId)),
        creator: { '@id': PERSON_ID },
        ...(w.year ? { dateCreated: w.year } : {}),
        ...(w.sub ? { genre: w.sub } : {}),
        ...dates(w),
        ...(video ? { video } : {}),
      },
      breadcrumbNode(url, [HOME_CRUMB, { name: cat.label, path: cat.route }, { name: w.title, path }]),
      faqNode(url, w.faqs),
    ],
    body: {
      eyebrow: w.sub,
      h1: w.title,
      facts: [['Client', w.client], ['Year', w.year], ['Format', w.format]].filter(f => f[1]),
      paragraphs: [w.summary].filter(Boolean),
      sections: [
        w.role ? { heading: 'My role', paragraphs: [w.role] } : null,
        w.description ? { heading: null, paragraphs: paras(w.description) } : null,
        related.length ? { heading: `More ${cat.label}`, items: related.map(o => ({ text: o.title, href: `${cat.route}/${o.slug}` })) } : null,
      ].filter(Boolean),
      faqs: w.faqs,
      links: [{ text: `← ${cat.label}`, href: cat.route }, CONTACT_LINK],
    },
  });
}

export function droneSeo(show) {
  const path = `/drone-shows/${show.slug}`;
  const url = abs(path);
  const title = `${show.title} | ${site.name}`;
  const description = clip(show.summary || [show.tagline, show.description].filter(Boolean).join(' '));
  const status = show.status === 'completed' ? 'Produced' : 'Concept Only';
  const videos = [
    videoNode(show.conceptYoutubeId, { name: `${show.title} · Concept`, description, uploadDate: show.conceptUploadDate }),
    videoNode(show.visualizerYoutubeId, { name: `${show.title} · Visualizer`, description, uploadDate: show.visualizerUploadDate }),
  ].filter(Boolean);
  const i = DRONE_SHOWS.findIndex(s => s.slug === show.slug);
  const prev = DRONE_SHOWS[i - 1], next = DRONE_SHOWS[i + 1];
  return seo({
    path, title, description, image: show.thumb || ytThumb(show.conceptYoutubeId), type: 'article', updated: show.updated,
    nodes: [
      pageNode('WebPage', url, title, description, {
        breadcrumb: { '@id': `${url}#breadcrumb` },
        mainEntity: { '@id': `${url}#work` },
        ...dates(show),
      }),
      {
        '@type': 'CreativeWork',
        '@id': `${url}#work`,
        name: show.title,
        description,
        url,
        image: abs(show.thumb || ytThumb(show.conceptYoutubeId)),
        creator: { '@id': PERSON_ID },
        genre: 'Drone show concept',
        creativeWorkStatus: status,
        ...(show.year ? { dateCreated: show.year } : {}),
        ...(show.location ? { contentLocation: { '@type': 'Place', name: show.location } } : {}),
        ...dates(show),
        ...(videos.length ? { video: videos } : {}),
      },
      breadcrumbNode(url, [HOME_CRUMB, { name: 'Drone Shows', path: '/drone-shows' }, { name: show.title, path }]),
      faqNode(url, show.faqs),
    ],
    body: {
      eyebrow: status,
      h1: show.title,
      facts: [['Client', show.client], ['Location', show.location], ['Year', show.year]].filter(f => f[1]),
      paragraphs: [show.summary, show.tagline, show.description].filter(Boolean),
      faqs: show.faqs,
      links: [
        prev ? { text: `Previous · ${prev.title}`, href: `/drone-shows/${prev.slug}` } : null,
        next ? { text: `Next · ${next.title}`, href: `/drone-shows/${next.slug}` } : null,
        { text: '← All Drone Shows', href: '/drone-shows' },
        CONTACT_LINK,
      ].filter(Boolean),
    },
  });
}

/* ── NOT FOUND ─────────────────────────────────────── */
export const notFoundSeo = () => seo({
  path: null,
  title: `Page not found | ${site.name}`,
  description: 'This page does not exist. Browse 3D characters, drone shows, projection mapping, visualization and event work.',
  noindex: true,
  body: {
    h1: 'Page not found',
    paragraphs: ['This page does not exist.'],
    sections: [{ heading: null, items: NAV_LINKS.map(l => ({ text: l.label, href: l.to })) }],
  },
});
