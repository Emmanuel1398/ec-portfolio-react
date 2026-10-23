# SEO & AEO: how this site is set up

This is the implementation record for [aeo_implementation_portfolio.md](../../aeo_implementation_portfolio.md), done on 2026-10-23. It explains how search engines and AI answer engines see emmanuelchege.com, what changed, and how to add new work without breaking anything.

---

## 1. How it works

Every page's SEO comes from **one builder function** in [src/seo/pages.js](../../src/seo/pages.js). The same output is used in two places:

| Where | What it does |
|---|---|
| **In the browser.** Each page component calls `updateSeo(xxxSeo(...))`. | [SeoProvider](../../src/providers/SeoProvider.jsx) writes the title, description, canonical, robots, OG/Twitter tags and one JSON-LD `@graph`. |
| **At build time.** [scripts/generate-share-pages.js](../../scripts/generate-share-pages.js) loops over [src/seo/routes.js](../../src/seo/routes.js). | Writes `dist/<route>/index.html` with the same head tags, plus a readable copy of the page (h1, summary, facts, links) inside `<div id="root">` for crawlers that don't run JavaScript. It also writes `dist/404.html`. |
| **Sitemaps and llms.txt.** [scripts/generate-sitemaps.js](../../scripts/generate-sitemaps.js) uses the same route list. | The sitemaps list exactly the pages that are prerendered. |

When the app loads, [src/main.jsx](../../src/main.jsx) removes the prerendered head tags and React replaces the `#root` fallback with the real page. Without that step, every page ended up with two titles and two canonicals: react-helmet-async 3 on React 19 never removes existing tags.

---

## 2. What changed

**Problems from the audit that are fixed:**

- **Crawlers without JS now get real content.** Every one of the 65 indexable URLs ships an `<h1>`, text, internal links and JSON-LD in the HTML itself.
- **No more generic titles after load.** `/events`, `/projection`, `/visualization`, `/hologram` and `/social` now call `updateSeo`.
- **No more state leaking between pages.** `updateSeo` replaces the SEO state instead of merging into it, so canonical, JSON-LD and noindex no longer carry over from the previous page.
- **Static and runtime tags agree.** Titles, descriptions and `og:locale` (`en_KE`) come from the same builders in both places. `/` is now prerendered and has a meta description and canonical.
- **Sitemaps are complete.**
  - All 40 work pages are now in `works-sitemap.xml`, which is listed in the sitemap index.
  - Illustration pages come from the data instead of being hardcoded.
  - The fake build-time `lastmod` is gone.
  - Image tags no longer use `image:caption`, which Google no longer supports.
- **robots.txt is fixed.** The broken grouping, `Crawl-delay` and the parameter `Disallow` lines are gone. AI crawlers are still all allowed, as before.
- **Missing pages are handled.**
  - There is a `NotFoundPage` with `noindex`.
  - Unknown slugs for characters, illustrations, works and drone shows show it. Drone shows used to redirect silently instead.
  - The catch-all rewrite was removed from `vercel.json`, so unknown URLs should get a real 404 (see §6, risk 1).
- **Structured data is richer.**
  - Every page has a `Person` (with `@id`, image, location, `knowsAbout`, `sameAs`) and a `WebSite`.
  - Each page also gets its own type (see §4) and a `BreadcrumbList`.
- **Headings are fixed.** Category hubs and `/social` now use `<h1>` instead of `<h2>`.
- **Brand details are more consistent.** The footer links come from `SOCIAL` and the year is dynamic.
- **GA `page_title` is accurate.** The `page_view` now waits until the new page has set its title, so it no longer reports the previous page's title.

**New content features:**

- Work pages show a "More <category>" related-work row and a "Discuss a project like this →" link to `/contact`.
- Optional data fields `summary`, `faqs`, `published`, `updated` and `uploadDate` are rendered (through `AnswerBlock`) and feed the schema when present. **None are filled in yet; see §5.**
- `llms.txt` is generated on every build.

**Other fixes:**

- Character and illustration detail pages called `useState` after an early return, which breaks React's rules of hooks. They no longer do.
- ESLint now knows the `scripts/` folder runs in Node.

**Correction to the brief:** finding I said the home page has two `<h1>`s. That was wrong. `components/Hero.jsx` is not used, and the home page's only `<h1>` is the EnterGate name, so that heading was left unchanged.

### Files

| Status | Files |
|---|---|
| New | `src/seo/schema.js`, `src/seo/pages.js`, `src/seo/routes.js`, `src/data/nav.js`, `src/components/AnswerBlock.jsx`, `src/pages/NotFoundPage.jsx`, `scripts/lib/env.js`, `scripts/validate-seo.js`, `public/llms.txt` (generated), `docs/aeo/README.md` |
| Rewritten | `scripts/generate-share-pages.js`, `scripts/generate-sitemaps.js`, `scripts/validate-sitemaps.js`, `src/providers/SeoProvider.jsx`, `public/robots.txt` |
| Edited | `src/App.jsx`, `src/main.jsx`, `src/config/site.js`, `src/components/Nav.jsx`, `src/data/categories.js`, `src/data/characterBlogs.js`, all pages in `src/pages/` that set SEO, `src/pages/category.css`, `src/styles/globals.css`, `vercel.json`, `eslint.config.js`, `package.json` |
| Regenerated | `public/*sitemap*.xml` |

---

## 3. Routes

| Route | Builder | Indexed | Sitemap | Prerendered |
|---|---|---|---|---|
| `/` | `homeSeo` | ✅ | sitemap.xml | ✅ `dist/index.html` |
| `/characters`, `/drone-shows`, `/drawings-illustrations` | `charactersSeo`, `droneShowsSeo`, `drawingsSeo` | ✅ | sitemap.xml | ✅ |
| `/events`, `/projection`, `/visualization`, `/hologram` | `categorySeo` | ✅ | sitemap.xml | ✅ |
| `/social` | `socialSeo` | ✅ | sitemap.xml | ✅ |
| `/contact` | `contactSeo` | ✅ | sitemap.xml | ✅ |
| `/drawings-illustrations/:slug` (1) | `illustrationSeo` | ✅ | sitemap.xml | ✅ |
| `/characters/:slug` (8) | `characterSeo` | ✅ | characters-sitemap.xml | ✅ |
| `/drone-shows/:slug` (6) | `droneSeo` | ✅ | drone-shows-sitemap.xml | ✅ |
| `/<category>/:slug` (40) | `workSeo` | ✅ | works-sitemap.xml | ✅ |
| anything else | `notFoundSeo` | ❌ noindex | — | `dist/404.html` |

Canonicals are always `https://emmanuelchege.com` plus the path, with no trailing slash.

---

## 4. Structured data

Every page has one `@graph` that contains `Person` (`/#person`) and `WebSite` (`/#website`), plus:

| Page type | Extra nodes |
|---|---|
| Home | `WebPage` (about the Person) |
| Listing and category hubs, `/social` | `CollectionPage` + `ItemList` + `BreadcrumbList` |
| `/contact` | `ProfilePage` (mainEntity = Person) + `BreadcrumbList` |
| Character | `WebPage` + `CreativeWork` (creator, dateCreated, genre, keywords = software, creativeWorkStatus) + `BreadcrumbList` |
| Illustration | `WebPage` + `VisualArtwork` + `BreadcrumbList` |
| Work | `WebPage` + `CreativeWork` (+ `VideoObject` **only when `uploadDate` is set**) + `BreadcrumbList` |
| Drone show | `WebPage` + `CreativeWork` (contentLocation, status) (+ up to two `VideoObject`s **when upload dates are set**) + `BreadcrumbList` |
| Any page with `faqs` | `FAQPage` |

Deliberately left out:

- `SearchAction`: the site has no search.
- `Review`, `AggregateRating`, `Offer`: there is no data for them.
- `LocalBusiness`: not confirmed as a registered business.
- `VideoObject` without a real upload date.

---

## 5. Adding or improving content

**New work.** Add the entry to the right data file, as before. Everything else follows automatically: route, prerendered page, sitemap entry, schema and llms.txt.

| Type | Data file |
|---|---|
| Event, projection, visualization, hologram | `src/data/portfolio.js` (`*_REAL` arrays) |
| Character | `src/data/characterBlogs.js` |
| Illustration | `src/data/illustrationBlogs.js` |
| Drone show | `DRONE_SHOWS` in `src/data/portfolio.js` |

A brand-new *section* (a new top-level route) needs four things: a route in `App.jsx`, a builder in `src/seo/pages.js`, an entry in `src/seo/routes.js`, and the section name added to both rewrites in `vercel.json`.

**Optional fields that make pages stronger.** Use real values only.

| Field | Where | Effect |
|---|---|---|
| `summary` | any work, character, illustration or drone show | 40–60 word answer-first paragraph shown under the title. Also becomes the meta description. |
| `faqs: [{ q, a }]` | same | Visible Q&A on the page plus `FAQPage` schema. |
| `uploadDate: 'YYYY-MM-DD'` | works (YouTube) | Turns on `VideoObject`, which video results require. |
| `conceptUploadDate`, `visualizerUploadDate` | drone shows | Same, for both videos. |
| `published`, `updated: 'YYYY-MM-DD'` | any | `datePublished` / `dateModified` and sitemap `<lastmod>`. |

Example:

```js
{
  title: 'Africa Summit Building Projection 2026',
  uploadDate: '2026-03-14',            // from the YouTube video page
  summary: 'A building projection created for …',
  faqs: [{ q: 'How long did the projection take to produce?', a: '…' }],
  …
}
```

**Before you deploy:**

```bash
npm run build
npm run validate-sitemaps
npm run validate-seo
```

---

## 6. Testing (2026-10-23)

| Check | Result |
|---|---|
| `npm run build` | ✅ 65 prerendered pages + `404.html`, 4 sitemaps + index, llms.txt |
| `npm run validate-sitemaps` | ✅ 65 URLs; matches the route list; every URL has a page whose canonical is that URL |
| `npm run validate-seo` | ✅ 65 pages: one title, description, canonical and og:image each; canonicals correct; JSON-LD parses; one `<h1>` in the fallback; titles and descriptions unique; 404 is noindex with no canonical |
| `curl` with a `GPTBot` user agent against `vite preview` | ✅ `/characters/arya`, `/projection`, `/contact`, `/drawings-illustrations/new-year-crackers` and `/404.html` return their own `<title>` and `<h1>` |
| Headless Chrome render (`/`, `/projection`, `/social`, `/contact`, `/characters/arya`, `/drone-shows/mcc-drone-show`, `/events/does-not-exist`, `/random-path`) | ✅ after JS runs: 1 title, 1 description, 1 canonical, 1 JSON-LD; unknown URLs are `noindex` with no canonical; the fallback is replaced by the app |
| Screenshots | ✅ the work page's related-work row and footer links look right; the no-JS fallback is readable and on-brand |
| `npm run lint` | 174 problems, down from 189 before. None of the remaining ones come from these changes. Almost all are older unused imports and variables, and lint also scans a stray `src/dist/` build folder. |

**Not tested:**

- Behavior on Vercel itself: rewrites, 404 status, and `X-Robots-Tag` on preview deployments. `vite preview` ignores `vercel.json`.
- GA4 DebugView.
- Rich Results Test.
- Real mobile devices.
- `sharp` is listed in `devDependencies` but is **not installed** in local `node_modules`. Local builds therefore skip OG image compression and fall back to the original images. Run `npm install` to fix this. Vercel installs it during the build.

---

## 7. External checklist

1. **Before promoting to production**, deploy a **preview** and check:
   - `curl -I <preview>/characters/arya` and `/projection/<slug>` return **200**;
   - `curl -I <preview>/characters/nope` and `/random` return **404**;
   - the response headers include `X-Robots-Tag: noindex` (preview only).
2. **Domain:** confirm that `www.emmanuelchege.com` redirects (301/308) to `https://emmanuelchege.com` (Vercel → Domains).
3. **Google Search Console:**
   - resubmit `https://emmanuelchege.com/sitemap-index.xml`;
   - use URL Inspection → *View crawled page* on the representative URLs;
   - re-check Pages → Indexing in 2–4 weeks.
4. **Bing Webmaster Tools:** import the site from Search Console and submit the sitemap. Bing's index feeds Copilot and ChatGPT search.
5. **Rich Results Test / validator.schema.org:** test one page of each type from §4.
6. **GA4:**
   - mark the contact-form `mailto` and the outbound profile clicks as key events;
   - create an exploration segment on session source matching `chatgpt\.com|chat\.openai\.com|perplexity\.ai|copilot\.microsoft\.com|gemini\.google\.com|claude\.ai`;
   - confirm in DebugView that `page_title` matches the page.
7. **Citation check, monthly:** run a fixed set of questions in ChatGPT, Perplexity, Gemini, Copilot and Claude, and log the date, whether the site was cited and which URL. Example questions: "Who designs drone shows in Kenya?", "Who is Emmanuel Chege?", "Projection mapping artists in Nairobi". Keep these five measures separate: search clicks, AI referrals, citations, crawler hits and enquiries.

---

## 8. Remaining risks and open decisions

1. **The 404 change is the riskiest part.** Without the catch-all rewrite, any path that isn't prerendered returns 404 on a hard refresh. All current routes are prerendered. If a new top-level section is added without updating `vercel.json`, it will 404. Verify on a preview before production (§7.1).
2. **The prerendered fallback shows briefly before JS loads.** It is styled like the site, but a visitor may see it for a fraction of a second on slow connections.
3. **No real dates yet**, so video and article rich results aren't possible. Adding `uploadDate` to the YouTube-based works is the biggest remaining win.
4. **Open owner decisions:**

   | Decision | What is in place now |
   |---|---|
   | Block AI training crawlers? | Still allowed; a commented-out block in robots.txt is ready to enable. |
   | Which public email: `emmanuelchege777@gmail.com` (shown on the site and used in schema) or `hello@emmanuelchege.com` (unused `site.supportEmail`)? | The gmail address. |
   | Does `@emmanuelchege` on X exist? | `twitter:site` still uses it. Remove it from `.env` if the account doesn't exist. |
   | YouTube channel URL | `SOCIAL.youtube` is a single video, so it is left out of `sameAs`. Add the channel URL when you have it. |

5. **Images are still on Google Drive.** Character block images use Drive thumbnail URLs. Moving them into `/public` would help image search and reliability.
6. **Unused code.** `src/components/Hero.jsx` and `src/pages/FineArtPage.jsx` are not wired up, and there is a stray `src/dist/` folder. These were left untouched.
