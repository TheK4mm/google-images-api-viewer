import { createApp } from './app.js';
import { env } from './config.js';

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`🚀 API lista en http://localhost:${env.PORT}/api  (${env.NODE_ENV})`);
});
