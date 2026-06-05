import type { ErrorRequestHandler } from 'express';
import { env } from '../config.js';

/**
 * Central error handler. Never leaks raw upstream errors to clients in
 * production; logs the detail server-side for debugging.
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const name = err instanceof Error ? err.name : typeof err;
  const detail = err instanceof Error ? err.message : String(err);
  console.error(`[server] Request error (${name}): ${detail}`);

  // The client may have already disconnected (e.g. the gallery aborted a stale
  // search) or a response may already be in flight — don't write to a dead socket.
  if (res.headersSent || req.destroyed || !res.writable) return;

  res.status(502).json({
    error: 'UpstreamError',
    message: 'No se pudieron obtener resultados en este momento. Inténtalo de nuevo.',
    ...(env.NODE_ENV === 'development' ? { detail } : {}),
  });
};
