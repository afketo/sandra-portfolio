import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const trabajos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/trabajos' }),
  schema: z.object({
    title: z.string(),
    categoria: z.string(),
    year: z.number(),
    cover: z.string(),
    images: z.array(z.string()).optional().default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const servicios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/servicios' }),
  schema: z.object({
    title: z.string(),
    descripcion: z.string(),
    icono: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { trabajos, servicios };
