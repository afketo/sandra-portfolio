import { defineMiddleware } from 'astro:middleware';
import { getSiteConfig } from '../lib/storyblok';

const PUBLIC_PATHS = ['/lock', '/api/unlock'];
const PREVIEW_SECRET = process.env.STORYBLOK_PREVIEW_SECRET || 'sb-preview-2024';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Assets estáticos y rutas públicas
  if (
    pathname.startsWith('/_astro') ||
    pathname.startsWith('/api/') ||
    PUBLIC_PATHS.includes(pathname)
  ) {
    return next();
  }

  // Preview de Storyblok: /preview/[token]/[...ruta]
  // Usa context.rewrite() para servir la ruta real sin redirect
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'preview' && segments[1] === PREVIEW_SECRET) {
    const realPath = '/' + segments.slice(2).join('/');
    const rewriteUrl = new URL(context.request.url);
    rewriteUrl.pathname = realPath || '/';
    const response = await context.rewrite(rewriteUrl);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set('Cache-Control', 'no-store');
    return response;
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
