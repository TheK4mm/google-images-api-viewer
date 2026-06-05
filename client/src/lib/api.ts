import type { SearchFilters, SearchResponse } from '../types/serpapi';

/** In dev this is empty so the Vite proxy handles `/api`; override in prod. */
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/** Pure, testable query-string builder (encodes spaces and special chars). */
export function buildImagesQuery(query: string, page: number, filters?: SearchFilters): string {
  const params = new URLSearchParams();
  params.set('q', query);
  params.set('page', String(page));
  if (filters?.size) params.set('imgsz', filters.size);
  if (filters?.type) params.set('image_type', filters.type);
  if (filters?.color) params.set('image_color', filters.color);
  if (filters?.safe) params.set('safe', filters.safe);
  return params.toString();
}

interface FetchImagesArgs {
  query: string;
  page?: number;
  filters?: SearchFilters;
  signal?: AbortSignal;
}

export async function fetchImages({
  query,
  page = 0,
  filters,
  signal,
}: FetchImagesArgs): Promise<SearchResponse> {
  const response = await fetch(`${API_BASE}/api/images?${buildImagesQuery(query, page, filters)}`, {
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new ApiError(await extractMessage(response), response.status);
  }

  return (await response.json()) as SearchResponse;
}

async function extractMessage(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { message?: string };
    if (data.message) return data.message;
  } catch {
    /* fall through to default */
  }
  return 'No se pudieron cargar las imágenes. Inténtalo de nuevo.';
}
