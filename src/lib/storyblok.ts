import { useStoryblokApi } from '@storyblok/astro';
import { richTextResolver } from '@storyblok/richtext';

const resolver = richTextResolver();

/** Convierte un campo richtext de Storyblok a HTML string */
export function renderRichText(content: unknown): string {
  if (!content) return '';
  // Si ya es string (campo texto plano), devuélvelo directo
  if (typeof content === 'string') return content;
  try {
    return resolver.render(content as any);
  } catch {
    return '';
  }
}

// Siempre usamos draft + preview token.
// El sitio tiene su propia autenticación por contraseña.
const version = 'draft' as const;

export async function getTrabajos() {
  const api = useStoryblokApi();
  const { data } = await api.get('cdn/stories', {
    version,
    starts_with: 'trabajos/',
    sort_by: 'content.order:asc',
  });
  return data.stories as StoryblokStory[];
}

export async function getTrabajo(slug: string) {
  const api = useStoryblokApi();
  try {
    const { data } = await api.get(`cdn/stories/trabajos/${slug}`, { version });
    return data.story as StoryblokStory;
  } catch {
    return null;
  }
}

export async function getServicios() {
  const api = useStoryblokApi();
  const { data } = await api.get('cdn/stories', {
    version,
    starts_with: 'servicios/',
    sort_by: 'content.order:asc',
  });
  return data.stories as StoryblokStory[];
}

let _siteConfig: Record<string, string> | null = null;
let _siteConfigTs = 0;
const CACHE_TTL = 5 * 60 * 1000;

export async function getSiteConfig(): Promise<Record<string, string>> {
  const now = Date.now();
  if (_siteConfig && now - _siteConfigTs < CACHE_TTL) return _siteConfig;

  const api = useStoryblokApi();
  try {
    const { data } = await api.get('cdn/stories/config/site', { version });
    _siteConfig = data.story.content as Record<string, string>;
    _siteConfigTs = now;
    return _siteConfig;
  } catch {
    return {};
  }
}

export async function getPageSobreMi(): Promise<Record<string, any>> {
  const api = useStoryblokApi();
  try {
    const { data } = await api.get('cdn/stories/pages/sobre-mi', { version });
    return data.story.content as Record<string, any>;
  } catch {
    return {};
  }
}

export async function getPageContacto(): Promise<Record<string, any>> {
  const api = useStoryblokApi();
  try {
    const { data } = await api.get('cdn/stories/pages/contacto', { version });
    return data.story.content as Record<string, any>;
  } catch {
    return {};
  }
}

export type StoryblokStory = {
  id: number;
  name: string;
  slug: string;
  full_slug: string;
  content: Record<string, any>;
};
