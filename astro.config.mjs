// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath, URL } from 'url';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://uplevelcorp.ca',
  integrations: [sitemap()],
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
