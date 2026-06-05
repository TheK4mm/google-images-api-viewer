import 'dotenv/config';
import { z } from 'zod';

/**
 * Loads and validates environment variables once at startup.
 * Fails fast with a readable message if something required is missing.
 */
const envSchema = z.object({
  SERP_API_KEY: z.string().min(1, 'SERP_API_KEY is required (get one at serpapi.com).'),
  PORT: z.coerce.number().int().positive().default(3000),
  CLIENT_ORIGIN: z.string().default('http://localhost:5173'),
  SERPAPI_LOCATION: z.string().default('Mexico'),
  SERPAPI_GOOGLE_DOMAIN: z.string().default('google.com.mx'),
  SERPAPI_HL: z.string().default('es'),
  SERPAPI_GL: z.string().default('mx'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('\n❌ Invalid environment configuration:');
  for (const issue of parsed.error.issues) {
    console.error(`   - ${issue.path.join('.') || '(root)'}: ${issue.message}`);
  }
  console.error('\n   Copy server/.env.example to server/.env and fill in the values.\n');
  process.exit(1);
}

export const env = parsed.data;
