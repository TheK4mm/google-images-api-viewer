import { getJson } from 'serpapi';
import { env } from '../config.js';
import type { ImageResult, ImageSearchParams, SearchResponse } from '../types.js';

/**
 * Google Images returns ~100 results per `ijn` page. We treat a sizeable batch
 * as "there is probably another page" so the client can offer "load more".
 */
const HAS_MORE_THRESHOLD = 40;

interface SerpApiImage {
  position?: number;
  title?: string;
  thumbnail?: string;
  original?: string;
  source?: string;
  link?: string;
  original_width?: number;
  original_height?: number;
}

interface SerpApiResponse {
  images_results?: SerpApiImage[];
  error?: string;
}

/**
 * Core of the application: queries Google Images through SerpApi and maps the
 * raw payload into a clean, typed envelope. SerpApi remains the single source
 * of truth — this function only shapes and hardens its response.
 */
export async function searchImages(params: ImageSearchParams): Promise<SearchResponse> {
  const query: Record<string, string> = {
    engine: 'google_images',
    q: params.q,
    ijn: String(params.page),
    location: env.SERPAPI_LOCATION,
    google_domain: env.SERPAPI_GOOGLE_DOMAIN,
    hl: env.SERPAPI_HL,
    gl: env.SERPAPI_GL,
    safe: params.safe,
    filter: '0',
    api_key: env.SERP_API_KEY,
  };

  if (params.imgsz) query.imgsz = params.imgsz;
  if (params.imageType) query.image_type = params.imageType;
  if (params.imageColor) query.image_color = params.imageColor;

  // `as never` keeps us decoupled from SerpApi's parameter typing while still
  // passing a well-formed object; the response is validated defensively below.
  const response = (await getJson(query as never)) as SerpApiResponse;

  if (response.error) {
    throw new Error(`SerpApi: ${response.error}`);
  }

  const raw = Array.isArray(response.images_results) ? response.images_results : [];

  const results: ImageResult[] = raw.flatMap((img, index) => {
    if (!img.original || !img.thumbnail) return [];
    return [
      {
        position: img.position ?? index,
        title: img.title?.trim() || 'Imagen sin título',
        thumbnail: img.thumbnail,
        original: img.original,
        source: img.source ?? '',
        link: img.link ?? img.original,
        width: img.original_width,
        height: img.original_height,
      },
    ];
  });

  return {
    query: params.q,
    page: params.page,
    count: results.length,
    hasMore: results.length >= HAS_MORE_THRESHOLD,
    results,
  };
}
