import { defineMiddleware } from 'astro:middleware';
import { readFileSync } from 'fs';
import { join } from 'path';

// Rutas que no requieren autenticación
// Nota: '/' es pública para que Netlify Identity pueda procesar
// los tokens (#invite_token, #recovery_token) en el hash de la URL,
// ya que los redirects de servidor no preservan el hash.
const PUBLIC_PATHS = ['/', '/lock', '/api/unlock'];

function getAccessCode(): string {
  try {
    const configPath = join(process.cwd(), 'src/content/config/site.json');
    const config = JSON.parse(readFileSync(configPath, 'utf-8'));
    return config.accessCode || 'sandra2024';
  } catch {
    return 'sandra2024';
  }
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Permitir assets estáticos y rutas del CMS
  if (
    pathname.startsWith('/_astro') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api/') ||
    PUBLIC_PATHS.includes(pathname)
  ) {
    return next();
  }

  // Verificar cookie de sesión
  const sessionCookie = context.cookies.get('sg_session');
  const accessCode = getAccessCode();

  if (sessionCookie?.value === accessCode) {
    return next();
  }

  // Redirigir a la pantalla de lock
  return context.redirect('/lock');
});
