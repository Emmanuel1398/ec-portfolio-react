/* Read by the app (Vite inlines import.meta.env) and by the build scripts
   in scripts/ (Node has no import.meta.env, so they load .env into
   process.env first via scripts/lib/env.js). */
const env = import.meta.env || globalThis.process?.env || {};

const site = {
    name:         env.VITE_SITE_NAME         || 'Emmanuel Chege',
    tagline:      env.VITE_SITE_TAGLINE      || '3D Characters, Drone Show Concepts, & Visualization',
    description:  env.VITE_SITE_DESCRIPTION  || 'Portfolio of Emmanuel Chege featuring yearly reels, 3D characters, drone show concepts, event visualization, and more.',
    url:         (env.VITE_SITE_URL          || 'https://emmanuelchege.com').replace(/\/$/, ''),
    ogImage:      env.VITE_SITE_OG_IMAGE     || 'https://emmanuelchege.com/Hyperlink_card.png',
    supportEmail: env.VITE_SITE_SUPPORT_EMAIL|| 'hello@emmanuelchege.com',
    twitter:      env.VITE_SITE_TWITTER_HANDLE|| '@emmanuelchege',
    hashtag:      env.VITE_SITE_HASHTAG      || '#EmmanuelChege',
    locale:       'en_KE',
    /* entity facts used by structured data · keep in line with the About page */
    jobTitle:     'Hyperrealistic 3D Artist & Motion Designer',
    portrait:     '/portrait.jpg',
    city:         'Nairobi',
    country:      'KE',
};
export default site;
