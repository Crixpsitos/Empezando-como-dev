// @ts-check
import { defineConfig } from 'astro/config';
import appHosting from '@apphosting/astro-adapter';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
// https://astro.build/config
export default defineConfig({
  output: 'server',

  adapter: appHosting({
      mode: 'standalone'
  }),

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});