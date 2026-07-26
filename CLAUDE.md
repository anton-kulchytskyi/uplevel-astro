# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site for Uplevel Restoration (Saskatoon restoration company), built with Astro 5 + TypeScript (strict). No UI framework, no CSS framework, no runtime — every page is prerendered to static HTML and deployed by uploading `dist/` to the web root over FTP. Production domain: `https://uplevelcorp.ca`.

## Commands

```bash
npm run dev        # dev server
npm run build      # static build to dist/
npm run preview    # serve dist/ locally

npm run lint       # eslint . (flat config, eslint.config.js)
npm run lint:fix   # eslint . --fix
npm run format     # prettier --write .
```

ESLint ignores (`dist/`, `.astro/`, `node_modules/`) live in `eslint.config.js`, not in an `.eslintignore` file — flat config does not read one. Prettier still uses `.prettierignore`.

There is no test suite and no typecheck script (`astro check` would need `@astrojs/check` + `typescript` installed first).

## Architecture

### Content lives in JSON, not in components

All copy and SEO metadata sit in `src/data/*.json` and are imported directly in page frontmatter (`import pageContent from '@/data/about.json'`). There are no Astro content collections. Page components are thin: they import a JSON file and hand slices of it to section components as props. **Editing site copy means editing `src/data/*.json`, not `.astro` files.**

Every page JSON has a `seo` object passed straight to `BaseLayout` (shape = the exported `SeoData` interface in `src/layouts/BaseLayout.astro`).

### Two layouts

- `BaseLayout.astro` — the html shell for every page. Owns `<head>` (title/description/keywords/OG/canonical/favicons), the global CSS custom properties and base styles in an inline `<style is:inline>` block, and the persistent chrome: `ToggleButton` + `MobileMenu` + `Header`, `EmergencyBanner`, optional `Breadcrumbs` (`showBreadcrumbs={false}` on `/` and `404`), `<slot />`, `Footer`.
- `ServicePageLayout.astro` — composes the fixed service-page shape (Hero → ServiceIntro → ServiceFeatures → ServiceProcess → ServiceCta) from one `pageData` object.

### Adding or renaming a service page (three files must agree)

Service pages come from one dynamic route, `src/pages/services/[slug].astro`, whose `getStaticPaths` iterates `Object.keys(service-pages.json)`. A service is fully wired only when it appears in all three:

1. `src/data/service-pages.json` — key = URL slug, value = the full `pageData` (seo/hero/intro/features/process/cta). Creates the route.
2. `src/data/services.json` (`services[]`) — the card on `/services`; its `id` also selects the card image (see below).
3. `src/data/navigation.json` (`services[]`) — header dropdown, mobile menu, footer nav, **and** breadcrumb labels. `Breadcrumbs.astro` resolves the current page title by matching `Astro.url.pathname` against `navigation.json`; a page missing there silently renders no breadcrumb.

### Images: string keys in JSON, resolved by glob

Images live in `src/assets/images/<category>/` and are referenced from JSON by **filename without extension**, never by path. Each consuming component eagerly globs its category and builds a `basename → ImageMetadata` map, then renders `<Image>` from `astro:assets` with explicit `widths`/`sizes`/`quality`:

| Component                            | Glob category        | Key comes from                           |
| ------------------------------------ | -------------------- | ---------------------------------------- |
| `sections/shared/Hero.astro`         | `hero/`, `services/` | `hero.backgroundImage`                   |
| `ui/FeatureCard.astro`               | `features/`          | `whyChooseUs.features[].backgroundImage` |
| `ui/ServiceCard.astro`               | `services/`          | the service's `id`                       |
| `sections/about/ValuesSection.astro` | `about/`             | `values[].image`                         |

So the image basename must match the JSON string (or the service `id`) exactly; a mismatch renders nothing rather than erroring. Adding a new image category means adding a glob in the component that uses it. Only `.jpg/.jpeg/.png/.webp` are matched.

### Styling

No global stylesheet file exists (the README's `src/styles/` is stale). Design tokens (`--color-primary`, `--color-dark`, `--color-white`, `--color-light-gray`, `--spacing`, `--radius`) and `body`/`main` base rules are defined in the inline `<style is:inline>` in `BaseLayout.astro`; everything else is Astro-scoped `<style>` inside each component, with `:global()` used to reach child components. Breakpoints used throughout: 768px and 480px. Most sections carry entrance animations plus a `prefers-reduced-motion` fallback — match that when adding sections.

### Client-side JS

Only two components ship script: `layout/MobileMenu.astro` (plain module `<script>`, DOM-id based panel toggling) and `sections/form/GetInTouchForm.astro`. Both are vanilla — no framework islands anywhere.

The Google Ads tag lives in `layout/GoogleTag.astro` and is rendered from `BaseLayout`'s `<head>` behind `{import.meta.env.PROD && <GoogleTag />}`, so it ships on all pages of a build but never loads under `astro dev` (`npm run preview` serves a build, so it _is_ present there). There is no thank-you page, so the conversion event fires from the contact form's success branch instead, guarded by `typeof window.gtag === 'function'` so a blocked or absent tag cannot break submission.

The contact form posts to **Web3Forms** (`api.web3forms.com/submit`) with the public access key inlined in `<script is:inline>`, plus an hCaptcha container; it shows a success modal and formats the phone field as you type. Its init runs on both `DOMContentLoaded` and `astro:page-load`. Form fields are data-driven from `src/data/get-in-touch.json` and rendered by `ui/FormField.astro`.

### View transitions (currently inert)

`BaseLayout` imports `slide` from `astro:transitions` and uses `transition:persist` on header/footer plus `transition:animate` on `<main>`, and defines `::view-transition-*` keyframes — but no `<ClientRouter />` is rendered, so none of it is active. If enabling SPA navigation, add `<ClientRouter />` to `<head>`; the `astro:page-load` listeners in the form already anticipate it.

### Path alias

`@/*` → `src/*`, declared twice: `tsconfig.json` `paths` (for editor/TS) and a Vite `resolve.alias` in `astro.config.mjs` (for the build). Both must be changed together. The codebase mixes `@/...` and relative imports; prefer `@/`.

## SEO conventions

- `@astrojs/sitemap` generates `/sitemap-index.xml` from `site` in `astro.config.mjs`; `public/robots.txt` points at it.
- `seoData.noindex` renders `<meta name="robots" content="noindex, nofollow">`, for pages whose copy is still a draft awaiting sign-off. No page sets it today. Note that a flagged page is still listed in the sitemap, so clear the flag as soon as the text is approved.
- `navigation.json` has three link arrays: `main` (header + footer), `services`, and `legal` (footer bottom row only). `Breadcrumbs` resolves titles from all three.
- OG images and canonical URLs must be absolute. `BaseLayout` falls back to `https://uplevelcorp.ca${Astro.url.pathname}` and `/og-cover.png` when a page's JSON omits `ogUrl`/`ogImage`. **The domain is hardcoded in both `astro.config.mjs` (`site`) and `BaseLayout.astro`** — a domain change requires editing both, plus `robots.txt` and any absolute `ogUrl`/`ogImage` values in `src/data/*.json`.
