import type { RequestHandler } from 'express';
import { z } from 'zod';

/**
 * Builds an Express middleware that validates `req.query` against a Zod schema.
 * On success the parsed (and coerced) value is stored on `res.locals.query`.
 * On failure it short-circuits with a 400 and a structured error list.
 */
export function validateQuery<T>(schema: z.ZodType<T>): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      res.status(400).json({
        error: 'ValidationError',
        message: 'Parámetros de búsqueda inválidos.',
        details: result.error.issues.map((issue) => ({
          field: issue.path.join('.') || '(query)',
          message: issue.message,
        })),
      });
      return;
    }

    res.locals.query = result.data;
    next();
  };
}
