// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath, URL } from 'url';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://anton-kulchytskyi.github.io/',
  base: '/',
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
