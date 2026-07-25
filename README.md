# Uplevel Restoration — Astro Website

Static website built with **Astro**, focused on SEO, performance, and simple hosting.
All pages are generated as static HTML.

## Tech Stack

- **Astro 5** — Static site generator
- **TypeScript (strict)** — Type safety
- **CSS (no frameworks)** — Custom styling, scoped per component
- **JSON-based content** — Easy content management

## Quick Start

### Clone & Install

```bash
git clone https://github.com/anton-kulchytskyi/uplevel-astro.git
cd uplevel-astro

npm install
```

### Development

```bash
npm run dev       # dev server at http://localhost:4321
npm run build     # production build to /dist
npm run preview   # preview the built site locally
```

### Lint & Format

```bash
npm run lint      # ESLint (flat config in eslint.config.js)
npm run lint:fix  # ESLint with autofix
npm run format    # Prettier, writes in place
```

There is no test suite in this project.

## Project Structure

```
uplevel-astro/
├── public/              # Static assets served as-is (favicons, robots.txt, og-cover.png)
├── src/
│   ├── assets/images/   # Images optimized by Astro, grouped by category
│   ├── components/
│   │   ├── icons/       # Icon components
│   │   ├── layout/      # Header, Footer, MobileMenu, Breadcrumbs, EmergencyBanner
│   │   ├── sections/    # Page sections (Hero, Services, About, Form, ...)
│   │   └── ui/          # Reusable UI components (cards, buttons, nav, form fields)
│   ├── data/            # Content & SEO (JSON)
│   ├── layouts/         # BaseLayout, ServicePageLayout
│   └── pages/           # Routes (auto-generated from file structure)
└── dist/                # Build output (generated)
```

Global CSS variables and base styles live in an inline `<style>` block inside
`src/layouts/BaseLayout.astro`; all other styles are scoped to their component.

## Content Management

All page content and SEO metadata are stored in `/src/data/*.json`:

- `home.json` — Homepage content
- `about.json` — About page content
- `services.json` — Services listing page (cards)
- `service-pages.json` — Full content of each individual service page
- `contacts.json`, `get-in-touch.json`, `emergency.json`, `404.json` — Remaining pages and the banner
- `navigation.json` — Site navigation, social links, CTA

Editing site copy means editing these JSON files, not the `.astro` components.

### Adding a Service Page

Service pages are generated from a single dynamic route
(`src/pages/services/[slug].astro`). To add one, update three files:

1. `service-pages.json` — add a key (the URL slug) with the page content; this creates the route
2. `services.json` — add an entry so the service appears on `/services`
3. `navigation.json` — add the link so it appears in menus and breadcrumbs

### Images

Images live in `src/assets/images/<category>/` and are referenced from JSON by
**filename without extension** (for service cards, by the service `id`).
Components resolve those names to optimized images automatically, so the file
name must match the JSON value exactly.

## SEO

- SEO metadata defined per page in JSON files
- Automatic generation of sitemap (`/sitemap-index.xml`)
- Open Graph images and canonical URLs use absolute URLs

The production domain is set in `astro.config.mjs` (`site`) and also used as a
fallback in `BaseLayout.astro` — update both when the domain changes.

## Deployment

### Build for Production

```bash
npm run build
```

Output: `/dist` folder with static HTML, CSS, JS, and optimized images.

### Deploy via FTP

1. Build the site: `npm run build`
2. Upload all files from `/dist` to your web server (e.g., `public_html/`)
3. Ensure files are in the root directory of the domain

## Documentation

- [Astro Documentation](https://docs.astro.build/)
- [Astro SEO Guide](https://docs.astro.build/en/guides/seo/)
- `CLAUDE.md` — architecture notes for AI coding agents

## Support

For issues or questions, please contact the developer.
