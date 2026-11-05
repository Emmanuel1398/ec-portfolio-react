/* ── HOME PAGE CONTENT (v94) ─────────────────────────────────
   Counts are read from the data files, so they stay correct as
   works are added. Card images live in /public/home (1000 × 1250, 4:5). */
import { CATEGORIES } from './categories.js';
import { CHARACTER_BLOGS } from './characterBlogs.js';
import { DRONE_SHOWS, SOFTWARE_CATEGORIES, SOCIAL_MEDIA_ROW1, SOCIAL_MEDIA_ROW2 } from './portfolio.js';

export const HOME_BIO =
  '<b>I turn ambitious ideas into compelling visual experiences.</b> ' +
  'I partner with <b>brands, agencies, studios, and creative teams</b> to translate bold concepts into powerful visual content — ' +
  'from <b>detailed digital characters</b> and <b>cinematic 3D imagery</b> to <b>motion graphics, 3D visualizations, social media videos, projection mapping, holograms, and drone show visuals</b>. ' +
  'Bridging <b>creative vision</b> with <b>technical precision</b>, I direct and craft visuals that <em>communicate, captivate, and leave a lasting impression.</em>';

/* years of experience go up by themselves every January (5+ in 2026, 6+ in 2027 ...) */
export const CAREER_START_YEAR = 2021;
export const yearsExperience = () => new Date().getFullYear() - CAREER_START_YEAR;

export const HOME_STATS = [
  { n: yearsExperience(), plus: true,  label: 'Years experience' },
  { n: 30, plus: true,  label: 'Projects delivered' },
  { n: 16, plus: false, label: 'Tools & software' },
];

const n = (k) => CATEGORIES[k]?.items.length || 0;
const plural = (count, one, many = one + 's') => `${count} ${count === 1 ? one : many}`;
const DRAWINGS_COUNT = 17; /* 16 fine-art pieces + the New Year Crackers commission */

export const HOME_WORK = [
  { to: '/characters', title: '3D Characters', count: plural(CHARACTER_BLOGS.length, 'breakdown'), img: '/home/work-characters.jpg',
    alt: 'Arya, hyperreal character with painted face markings', desc: 'Hyperreal, stylized and creature work, with in-depth breakdowns from sculpt to lookdev.' },
  { to: '/events', title: 'Event Videos', count: plural(n('events'), 'work'), img: '/home/work-events.jpg',
    alt: 'Kenya map collage from an event launch video', desc: 'Full event films and launch openers delivered to clients.' },
  { to: '/projection', title: 'Projection Videos', count: plural(n('projection'), 'work'), img: '/home/work-projection.jpg',
    alt: 'KICC building projection at night', desc: 'Buildings, walls, cakes and stages turned into a canvas.' },
  { to: '/visualization', title: '3D Visualizations', count: plural(n('visualization'), 'work'), img: '/home/work-visualization.jpg',
    alt: 'Martell XXO event visualization', desc: 'Event setups previsualized in 3D, plus product, property and vehicle renders.' },
  { to: '/hologram', title: 'Hologram Videos', count: plural(n('hologram'), 'work'), img: '/home/work-hologram.jpg',
    alt: 'Safaricom hologram character', desc: 'Hologram launch content and the build behind it.' },
  { to: '/drawings-illustrations', title: 'Drawings & Illustrations', count: plural(DRAWINGS_COUNT, 'piece'), img: '/home/work-drawings.jpg',
    alt: 'Graphite drawing of a betta fish with a Faber-Castell pencil', desc: 'Fine art studies in graphite and illustrated commissions.' },
  { to: '/social', title: 'Social Media', count: plural(SOCIAL_MEDIA_ROW1.length + SOCIAL_MEDIA_ROW2.length, 'work'), img: '/home/work-social.jpg',
    alt: 'Social media posts for Vipingo, RwandAir and Pembe', desc: 'Motion graphics, GIF animation and explainers made for brand feeds.' },
  { to: '/drone-shows', title: 'Drone Shows', count: plural(DRONE_SHOWS.length, 'show'), img: '/home/work-drone-shows.jpg',
    alt: 'Drone show sea turtle formation over the ocean', desc: 'Aerial formation concepts and show narratives for state and brand events.' },
];

/* the About page grid, plus look development (XGen, ACES/OCIO, skin) to fill the 4 × 2 grid */
export const HOME_SOFTWARE = [
  ...SOFTWARE_CATEGORIES,
  { category: 'Look Development', tools: ['XGen grooming', 'ACES / OCIO', 'Skin shading'] },
];
