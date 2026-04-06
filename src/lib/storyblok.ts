import { useStoryblokApi } from '@storyblok/astro';

const isProd = process.env.NODE_ENV === 'production';
const version = isProd ? 'published' : 'draft';

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

// Cache simple en memoria (se resetea por instancia serverless, válido para datos que cambian poco)
let _siteConfig: Record<string, string> | null = null;
let _siteConfigTs = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

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

export type StoryblokStory = {
  id: number;
  name: string;
  slug: string;
  full_slug: string;
  content: Record<string, any>;
};
