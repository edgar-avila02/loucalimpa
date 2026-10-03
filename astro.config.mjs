import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://loucalimpa.com',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
