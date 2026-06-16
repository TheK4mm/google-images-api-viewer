# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Run all commands from the repo root (npm workspaces orchestrate `client` and `server`):

| Command | What it does |
| --- | --- |
| `npm install` | Install all workspace deps (run once, from root) |
| `npm run dev` | Run client (Vite :5173) and server (Express :3000) in parallel |
| `npm run build` | Build server (`tsc`) then client (`vite build`) |
| `npm start` | Serve the compiled server from `server/dist` |
| `npm run lint` | ESLint (client only) |
| `npm run typecheck` | `tsc --noEmit` for both client and server |
| `npm test` | Vitest (client only) |
| `npm run format` | Prettier over the whole repo |

Single test / watch mode (run from `client/`):

```bash
npm test --workspace client -- src/hooks/useImageSearch.test.ts   # one file
npm test --workspace client -- -t "reducer"                       # by test name
npm run test:watch --workspace client                             # watch mode
```

A SerpApi key is required to run the server: copy `server/.env.example` to `server/.env` and set `SERP_API_KEY`. The server validates env vars at startup (`server/src/config.ts`) and exits with a readable error if anything required is missing.

## Architecture

Monorepo (`client` + `server` workspaces). The browser never sees the SerpApi key — the Express server is a thin **proxy** that holds the key and normalizes responses:

```
Browser ──/api/images?q=…──▶ Express proxy ──getJson──▶ SerpApi ──▶ Google Images
```

In dev, Vite proxies `/api` → `localhost:3000` (see `client/vite.config.ts`), so the client always uses relative `/api` URLs and stays same-origin (no CORS). In production the client reads `VITE_API_BASE_URL`.

### Server (`server/src`)
- **`services/serpapi.ts`** — the functional core. `searchImages()` calls SerpApi's `getJson`, then defensively maps the raw payload into the typed `SearchResponse` DTO (drops entries missing `original`/`thumbnail`, fills defaults). This is the single place that touches SerpApi.
- **`routes/images.ts`** — `GET /api/images` (Zod-validated query) and `GET /api/health`. Validated query lands on `res.locals.query`, not `req.query`.
- **`middleware/validate.ts`** — `validateQuery(schema)` factory; 400 + structured error list on failure.
- **`middleware/errorHandler.ts`** — central handler; returns a generic 502, hides upstream detail except in `development`.
- **`config.ts`** — Zod-validated env, loaded once. Import `env` from here; don't read `process.env` directly.
- **`app.ts`** builds the app (helmet, CORS from `CLIENT_ORIGIN`, rate limit 100/min on `/api`); **`index.ts`** starts it.

### Client (`client/src`)
- **`hooks/useImageSearch.ts`** — search state machine via `useReducer` (`idle → loading/loadingMore → success/empty/error`). Owns results, pagination, and dedupe. A single `AbortController` (`abortRef`) cancels the in-flight request whenever a new search/filter/loadMore fires, so stale responses are ignored.
- **`lib/api.ts`** — typed `fetch` wrapper (`fetchImages`, `ApiError`) and the pure `buildImagesQuery` helper.
- **`components/`** — grouped by feature: `ui/`, `layout/`, `search/`, `gallery/`, `lightbox/`, `states/`. `App.tsx` wires them together.
- `types/serpapi.ts` mirrors the server DTO — keep the two in sync when changing the response shape.

### Pagination
Google Images pages via the `ijn` query param (`page` in our API). `hasMore` is a **heuristic** (`HAS_MORE_THRESHOLD = 40` in `serpapi.ts`), not a real total count.

## Conventions & gotchas
- **ESM with explicit `.js` import extensions in server `.ts` files** (e.g. `import { env } from './config.js'`). This is required by the server's NodeNext module resolution — keep the `.js` suffix even though the source is TypeScript. The client (bundled by Vite) uses extensionless imports.
- **Server runs via `tsx`** in dev — no build step needed to run it; `npm run build` is only for `npm start`/production.
- **Tests are client-only** (Vitest + Testing Library). There is no server test suite; `npm test` ignores the server workspace.
- **User-facing strings are in Spanish** (error messages, UI copy). Match this when adding text.
- After editing the response contract, update both `server/src/types.ts` and `client/src/types/serpapi.ts`.
