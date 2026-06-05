import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { env } from './config.js';
import { imagesRouter } from './routes/images.js';
import { errorHandler } from './middleware/errorHandler.js';

/** Builds the configured Express application (without starting it). */
export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(
    cors({
      origin: env.CLIENT_ORIGIN.split(',').map((origin) => origin.trim()),
    }),
  );

  // Basic abuse protection for the proxied SerpApi key (health checks exempt).
  app.use(
    '/api',
    rateLimit({
      windowMs: 60_000,
      limit: 100,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
      skip: (req) => req.path.endsWith('/health'),
      message: {
        error: 'RateLimit',
        message: 'Demasiadas peticiones, espera un momento e inténtalo de nuevo.',
      },
    }),
  );

  app.use('/api', imagesRouter);
  app.use(errorHandler);

  return app;
}
