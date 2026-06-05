import { createApp } from './app.js';
import { env } from './config.js';

// Resilience: a browser that drops a request mid-flight (the gallery aborts
// stale searches) surfaces as a socket error. Don't let it crash the process.
process.on('uncaughtException', (error: NodeJS.ErrnoException) => {
  if (error.code === 'ECONNRESET' || error.code === 'EPIPE') {
    console.warn(`[server] Ignored client socket error: ${error.code}`);
    return;
  }
  console.error('[server] Uncaught exception:', error);
});

process.on('unhandledRejection', (reason) => {
  console.error('[server] Unhandled rejection:', reason);
});

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`🚀 API lista en http://localhost:${env.PORT}/api  (${env.NODE_ENV})`);
});
