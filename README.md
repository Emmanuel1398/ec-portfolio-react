# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## SEO and AEO

The full setup is documented in [docs/aeo/README.md](docs/aeo/README.md).

Every blog entry (characters, illustrations, and any portfolio item) can also carry a
`keywords: [...]` list. These are written into the page's structured data
(`CreativeWork.keywords`) by `src/seo/pages.js`. Write them as phrases people actually
search, for example "melanated skin rendering", "3D character artist Kenya",
"projection mapping Nairobi".

### IndexNow (Bing, Copilot)

`scripts/indexnow.js` runs at the end of every Vercel production build and submits all sitemap
URLs to IndexNow. Local and preview builds skip it. The key file `public/a13e2a31ce24bf27ec91b82d39ecfcb7.txt`
must stay in the project. Manual run after a deploy: `npm run indexnow -- --force`.
