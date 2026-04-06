import { defineMiddleware } from 'astro:middleware';
import { getSiteConfig } from '../lib/storyblok';

const PUBLIC_PATHS = ['/lock', '/api/unlock'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Permitir assets estáticos
  if (
    pathname.startsWith('/_astro') ||
    pathname.startsWith('/api/') ||
    PUBLIC_PATHS.includes(pathname)
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
