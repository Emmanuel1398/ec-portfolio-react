import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import site from '../config/site';
import { abs, serializeJsonLd } from '../seo/schema';

export const SeoContext = createContext();

export const useSeoContext = () => useContext(SeoContext);

const DEFAULTS = {
  title: `${site.name} · ${site.tagline}`,
  description: site.description,
  canonical: null,
  image: site.ogImage,
  type: 'website',
  twitterHandle: site.twitter,
  locale: site.locale,
  structuredData: null,
  additionalMetaTags: [],
  robots: 'index, follow',
  noindex: false,
  path: null,
};

const removeDuplicateMetaTags = (tags) => {
  if (!Array.isArray(tags)) return [];
  const map = new Map();
  tags.forEach(tag => {
    if (!tag.content) return;
    const key = tag.name ? `name:${tag.name}` : tag.property ? `prop:${tag.property}` : null;
    if (key) map.set(key, tag);
  });
  return Array.from(map.values());
};

export const SeoProvider = ({ children }) => {
  const [seo, setSeo] = useState(DEFAULTS);

  /* Each call REPLACES the page's SEO (on top of the defaults) rather than
     merging into the previous page's, so canonical, JSON-LD and noindex
     never leak from one route to the next. `path` lets the GA tracker in
     App.jsx wait until the new page has set its title. */
  const updateSeo = useCallback((newSeoData) => {
    setSeo({
      ...DEFAULTS,
      ...newSeoData,
      image: newSeoData.image || DEFAULTS.image,
      additionalMetaTags: removeDuplicateMetaTags(newSeoData.additionalMetaTags),
      path: window.location.pathname,
    });
  }, []);

  const canonicalUrl = useMemo(() => abs(seo.canonical || window.location.pathname), [seo.canonical]);
  const validImageUrl = useMemo(() => abs(seo.image), [seo.image]);

  const robotsContent = seo.noindex ? 'noindex, follow' : seo.robots;

  return (
    <SeoContext.Provider value={{ seo, updateSeo }}>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {!seo.noindex && <link rel="canonical" href={canonicalUrl} />}
        <meta name="robots" content={robotsContent} />

        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={validImageUrl} />
        <meta property="og:image:alt" content={seo.title} />
        <meta property="og:type" content={seo.type} />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:locale" content={seo.locale} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={seo.twitterHandle} />
        <meta name="twitter:creator" content={seo.twitterHandle} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={validImageUrl} />

        {seo.additionalMetaTags.map((tag, i) => (
          <meta key={i} {...tag} />
        ))}

        {seo.structuredData && (
          <script type="application/ld+json">
            {serializeJsonLd(seo.structuredData)}
          </script>
        )}
      </Helmet>
      {children}
    </SeoContext.Provider>
  );
};
