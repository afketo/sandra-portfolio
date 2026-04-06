import type { APIRoute } from 'astro';
import { getSiteConfig } from '../../lib/storyblok';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const code = formData.get('code')?.toString().trim();

  let accessCode = process.env.ACCESS_CODE || 'sandra2024';
  try {
    const config = await getSiteConfig();
    if (config.accessCode) accessCode = config.accessCode;
  } catch { /* usa fallback */ }

  if (code === accessCode) {
    cookies.set('sg_session', accessCode, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 días
    });
    return redirect('/', 302);
  }

  return redirect('/lock?error=1', 302);
};
