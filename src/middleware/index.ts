import { defineMiddleware } from 'astro:middleware';
import { getSiteConfig } from '../lib/storyblok';

const PUBLIC_PATHS = ['/lock', '/api/unlock'];

// Token secreto para el preview de Storyblok.
// Configurado en Vercel como STORYBLOK_PREVIEW_SECRET.
// La URL de preview en Storyblok debe ser:
//   https://sandra-portfolio-one.vercel.app/preview/[TOKEN]/{0}
const PREVIEW_SECRET = process.env.STORYBLOK_PREVIEW_SECRET || 'sb-preview-2024';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Assets estáticos y rutas públicas — sin auth
  if (
    pathname.startsWith('/_astro') ||
    pathname.startsWith('/api/') ||
    PUBLIC_PATHS.includes(pathname)
  ) {
    return next();
  }

  // Preview de Storyblok: /preview/[token]/[...ruta]
  // El token va en el path → no choca con real_path ni con _storyblok params
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'preview' && segments[1] === PREVIEW_SECRET) {
    // Reescribir la URL internamente hacia la ruta real
    const realPath = '/' + segments.slice(2).join('/');
    context.url.pathname = realPath || '/';

    // Evitar indexación de estas URLs de preview
    const response = await next();
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
