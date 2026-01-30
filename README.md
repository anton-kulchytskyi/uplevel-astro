# Uplevel Restoration — Astro Website

Static website built with **Astro**, focused on SEO, performance, and simple hosting.
All pages are generated as static HTML.

## Tech Stack

- **Astro** — Static site generator
- **TypeScript (strict)** — Type safety
- **CSS (no frameworks)** — Custom styling
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
npm run dev

npm run build

npm run preview
```

### Clean Build

```bash
npm run clean
npm run build
```

## Project Structure

```
uplevel-astro/
├── public/              # Static assets (favicons, robots.txt, etc.)
├── src/
│   ├── assets/          # Images optimized by Astro
│   ├── components/
│   │   ├── icons/       # Icon components
│   │   ├── layout/      # Header, Footer, MobileMenu
│   │   ├── sections/    # Page sections (Hero, Services, etc.)
│   │   └── ui/          # Reusable UI components
│   ├── data/            # Content & SEO (JSON)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Routes (auto-generated from file structure)
│   └── styles/          # Global CSS
└── dist/                # Build output (generated)
```

## Content Management

All page content and SEO metadata are stored in `/src/data/*.json`:

- `home.json` — Homepage content
- `about.json` — About page content
- `services.json` — Services data
- `navigation.json` — Site navigation
- etc.

## SEO

- SEO metadata defined per page in JSON files
- Automatic generation of sitemap (`/sitemap-index.xml`)
- Open Graph images use absolute URLs

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

## Support

For issues or questions, please contact the developer.
