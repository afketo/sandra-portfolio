// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), 'STORYBLOK');

const isProd = process.env.NODE_ENV === 'production';
const storyblokToken = isProd
  ? env.STORYBLOK_PUBLIC_TOKEN
  : env.STORYBLOK_PREVIEW_TOKEN;

// https://astro.build/config
export default defineConfig({
  output: 'server',

  devToolbar: { enabled: false },

  integrations: [
    storyblok({
      accessToken: storyblokToken,
      bridge: !isProd,
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
