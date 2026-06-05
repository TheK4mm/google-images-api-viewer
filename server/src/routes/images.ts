import { Router } from 'express';
import { z } from 'zod';
import { validateQuery } from '../middleware/validate.js';
import { searchImages } from '../services/serpapi.js';

const IMAGE_COLORS = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'purple',
  'pink',
  'white',
  'gray',
  'black',
  'brown',
  'black_and_white',
  'transparent',
] as const;

const imagesQuerySchema = z.object({
  q: z.string().trim().min(1, 'La búsqueda no puede estar vacía.').max(200),
  page: z.coerce.number().int().min(0).max(20).default(0),
  imgsz: z.enum(['l', 'm', 'i']).optional(), // large / medium / icon
  image_type: z.enum(['photo', 'clipart', 'lineart', 'gif']).optional(),
  image_color: z.enum(IMAGE_COLORS).optional(),
  safe: z.enum(['active', 'off']).default('active'),
});

type ImagesQuery = z.infer<typeof imagesQuerySchema>;

export const imagesRouter = Router();

imagesRouter.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

imagesRouter.get('/images', validateQuery(imagesQuerySchema), async (_req, res, next) => {
  try {
    const query = res.locals.query as ImagesQuery;

    const data = await searchImages({
      q: query.q,
      page: query.page,
      imgsz: query.imgsz,
      imageType: query.image_type,
      imageColor: query.image_color,
      safe: query.safe,
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
});
