import type { ErrorRequestHandler } from 'express';
import { env } from '../config.js';

/**
 * Central error handler. Never leaks raw upstream errors to clients in
 * production; logs the detail server-side for debugging.
 */
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const detail = err instanceof Error ? err.message : 'Unexpected error';
  console.error('[server] Unhandled error:', detail);

  res.status(502).json({
    error: 'UpstreamError',
    message: 'No se pudieron obtener resultados en este momento. Inténtalo de nuevo.',
    ...(env.NODE_ENV === 'development' ? { detail } : {}),
  });
};
