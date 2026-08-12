import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import {defineConfig} from 'astro/config';

export default defineConfig({
  site: 'https://www.hekswerk.com',
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
    }),
  ],
});
