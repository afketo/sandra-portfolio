// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), 'STORYBLOK');

const isProd = process.env.NODE_ENV === 'production';
// En prod usamos el public token, en dev el preview token
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
      // El bridge solo se activa dentro del iframe de Storyblok, es seguro dejarlo siempre activo
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
