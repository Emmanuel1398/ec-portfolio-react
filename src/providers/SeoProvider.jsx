import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import site from '../config/site';

export const SeoContext = createContext();

export const useSeoContext = () => useContext(SeoContext);

const DEFAULT_BASE_URL = site.url;
const DEFAULT_IMAGE = site.ogImage;

const ensureAbsoluteUrl = (url) => {
  if (!url || typeof url !== 'string') return DEFAULT_BASE_URL;
  let finalUrl = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    finalUrl = `${DEFAULT_BASE_URL}${cleanUrl}`;
  }
  // Strip trailing slash unless it's just the base URL
  if (finalUrl !== DEFAULT_BASE_URL && finalUrl.endsWith('/')) {
    finalUrl = finalUrl.slice(0, -1);
  }
  return finalUrl;
};

const isEmpty = (value) => value === null || value === undefined || value === '';

const normalizeMetaValue = (val) => {
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  return null;
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
  const [seo, setSeo] = useState({
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    canonical: null,
    image: DEFAULT_IMAGE,
    type: 'website',
    twitterHandle: site.twitter,
    locale: 'en_US',
    structuredData: null,
    additionalMetaTags: [],
    robots: 'index, follow',
    noindex: false,
  });

  const updateSeo = useCallback((newSeoData) => {
    setSeo(prevSeo => {
      const merged = { ...prevSeo, ...newSeoData };
      if (newSeoData.canonical !== undefined) {
        merged.canonical = newSeoData.canonical ? ensureAbsoluteUrl(newSeoData.canonical) : null;
      }
      if (newSeoData.additionalMetaTags) {
        merged.additionalMetaTags = removeDuplicateMetaTags(newSeoData.additionalMetaTags);
      }
      return merged;
    });
  }, []);

  const canonicalUrl = useMemo(() => ensureAbsoluteUrl(seo.canonical || window.location.pathname), [seo.canonical]);
  const validImageUrl = useMemo(() => ensureAbsoluteUrl(seo.image || DEFAULT_IMAGE), [seo.image]);
  const ogUrl = useMemo(() => canonicalUrl, [canonicalUrl]);
  const cleanAdditionalMetaTags = useMemo(() => removeDuplicateMetaTags(seo.additionalMetaTags), [seo.additionalMetaTags]);


  const robotsContent = seo.noindex ? 'noindex, nofollow' : seo.robots;

  return (
    <SeoContext.Provider value={{ seo, updateSeo }}>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content={robotsContent} />

        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:image" content={validImageUrl} />
        <meta property="og:type" content={seo.type} />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:locale" content={seo.locale} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={seo.twitterHandle} />
        <meta name="twitter:creator" content={seo.twitterHandle} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={validImageUrl} />

        {cleanAdditionalMetaTags.map((tag, i) => (
          <meta key={i} {...tag} />
        ))}

        {seo.structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(seo.structuredData)}
          </script>
        )}
      </Helmet>
      {children}
    </SeoContext.Provider>
  );
};

export const BreadcrumbSchema = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
