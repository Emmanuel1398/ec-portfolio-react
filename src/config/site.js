const site = {
    name:         import.meta.env.VITE_SITE_NAME         || 'Emmanuel Chege',
    tagline:      import.meta.env.VITE_SITE_TAGLINE      || '3D Characters, Drone Show Concepts, & Visualization',
    description:  import.meta.env.VITE_SITE_DESCRIPTION  || 'Portfolio of Emmanuel Chege featuring yearly reels, 3D characters, drone show concepts, event visualization, and more.',
    url:          import.meta.env.VITE_SITE_URL          || 'https://emmanuelchege.com',
    ogImage:      import.meta.env.VITE_SITE_OG_IMAGE     || '',
    supportEmail: import.meta.env.VITE_SITE_SUPPORT_EMAIL|| 'hello@emmanuelchege.com',
    twitter:      import.meta.env.VITE_SITE_TWITTER_HANDLE|| '@emmanuelchege',
    hashtag:      import.meta.env.VITE_SITE_HASHTAG      || '#EmmanuelChege',
};
export default site;
