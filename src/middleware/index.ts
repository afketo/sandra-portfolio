import { defineMiddleware } from 'astro:middleware';
import { getSiteConfig } from '../lib/storyblok';

const PUBLIC_PATHS = ['/lock', '/api/unlock'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, searchParams } = context.url;
  const request = context.request;

  // Permitir assets estáticos
  if (
    pathname.startsWith('/_astro') ||
    pathname.startsWith('/api/') ||
    PUBLIC_PATHS.includes(pathname)
  ) {
    return next();
  }

  // Permitir el editor visual de Storyblok:
  // Storyblok añade _storyblok al abrir en el iframe, y el Referer es app.storyblok.com
  const referer = request.headers.get('referer') || '';
  const isStoryblokEditor =
    searchParams.has('_storyblok') ||
    referer.includes('app.storyblok.com');

  if (isStoryblokEditor) {
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
