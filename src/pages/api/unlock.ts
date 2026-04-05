import type { APIRoute } from 'astro';
import { readFileSync } from 'fs';
import { join } from 'path';

function getAccessCode(): string {
  try {
    const configPath = join(process.cwd(), 'src/content/config/site.json');
    const config = JSON.parse(readFileSync(configPath, 'utf-8'));
    return config.accessCode || 'sandra2024';
  } catch {
    return 'sandra2024';
  }
}

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const code = formData.get('code')?.toString().trim();
  const accessCode = getAccessCode();

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
