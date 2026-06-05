/** A single normalized image result returned to the client. */
export interface ImageResult {
  position: number;
  title: string;
  thumbnail: string;
  original: string;
  source: string;
  link: string;
  width?: number;
  height?: number;
}

/** The envelope the `/api/images` endpoint responds with. */
export interface SearchResponse {
  query: string;
  page: number;
  count: number;
  hasMore: boolean;
  results: ImageResult[];
}

/** Normalized parameters passed into the SerpApi service. */
export interface ImageSearchParams {
  q: string;
  page: number;
  imgsz?: string;
  imageType?: string;
  imageColor?: string;
  safe: 'active' | 'off';
}
