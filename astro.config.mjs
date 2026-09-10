import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import {defineConfig} from 'astro/config';

const site = 'https://www.hekswerk.com';
const draftRoutes = ['/relocation'];

export default defineConfig({
  site,
  srcDir: './site',
  publicDir: './static',
  outDir: './build',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.5,
      // Draft routes render (for preview on a branch, or noindex on main) but must not be
      // advertised. scripts/check-built-site.mjs asserts a `draft: true` route is noindex AND
      // absent from the sitemap, so this list and the checker's routes table must agree.
      filter: (page) => !draftRoutes.some((route) => page === `${site}${route}`),
    }),
  ],
});
