import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Ogni opera di scrittura è un file di testo con alcune informazioni in cima.
const scrittura = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/scrittura' }),
  schema: z.object({
    titolo: z.string(),
    categoria: z.enum(['Poesia', 'Saggio', 'Racconto', 'Sceneggiatura']),
    anno: z.number().optional(),
    ordine: z.number().default(0),
    bozza: z.boolean().default(false),
  }),
});

// Ogni galleria fotografica è un file con un elenco di foto.
const fotografia = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fotografia' }),
  schema: z.object({
    titolo: z.string(),
    anno: z.number().optional(),
    copertina: z.string(),
    foto: z
      .array(
        z.object({
          src: z.string(),
          didascalia: z.string().optional(),
        })
      )
      .default([]),
    ordine: z.number().default(0),
    bozza: z.boolean().default(false),
  }),
});

export const collections = { scrittura, fotografia };
