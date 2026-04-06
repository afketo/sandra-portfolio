import { defineMiddleware } from 'astro:middleware';
import { getSiteConfig } from '../lib/storyblok';

const PUBLIC_PATHS = ['/lock', '/api/unlock'];

// Token secreto para el editor visual de Storyblok
// Debe coincidir con el configurado en Storyblok → Settings → Visual Editor → Preview URL
const PREVIEW_TOKEN = process.env.STORYBLOK_PREVIEW_SECRET || 'sb-preview-2024';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, searchParams } = context.url;

  // Permitir assets estáticos
  if (
    pathname.startsWith('/_astro') ||
    pathname.startsWith('/api/') ||
    PUBLIC_PATHS.includes(pathname)
  ) {
    return next();
  }

  // Permitir el editor visual de Storyblok (token en URL o parámetro _storyblok)
  if (
    searchParams.get('preview') === PREVIEW_TOKEN ||
    searchParams.has('_storyblok')
  ) {
    return next();
  }

  // Verificar cookie de sesión
  const sessionCookie = context.cookies.get('sg_session');

  let accessCode = process.env.ACCESS_CODE || 'sandra2024';
  try {
    const config = await getSiteConfig();
    if (config.accessCode) accessCode = config.accessCode;
  } catch { /* usa el fallback */ }

  if (sessionCookie?.value === accessCode) {
    return next();
  }

  return context.redirect('/lock');
});
