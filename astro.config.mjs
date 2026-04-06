// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import { storyblok } from '@storyblok/astro';

// Usar process.env directamente (funciona tanto en local como en Vercel)
const storyblokToken = process.env.STORYBLOK_PREVIEW_TOKEN || '';

// https://astro.build/config
export default defineConfig({
  output: 'server',

  devToolbar: { enabled: false },

  integrations: [
    storyblok({
      accessToken: storyblokToken,
      bridge: true,
      apiOptions: {
        region: 'eu',
      },
      components: {},
      componentsDir: 'src',
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
});
