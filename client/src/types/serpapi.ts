/** A single normalized image result (mirrors the server DTO). */
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

/** Envelope returned by `GET /api/images`. */
export interface SearchResponse {
  query: string;
  page: number;
  count: number;
  hasMore: boolean;
  results: ImageResult[];
}

export type ImageSize = 'l' | 'm' | 'i';
export type ImageType = 'photo' | 'clipart' | 'lineart' | 'gif';
export type SafeSearch = 'active' | 'off';

export interface SearchFilters {
  size?: ImageSize;
  type?: ImageType;
  color?: string;
  safe: SafeSearch;
}

export const DEFAULT_FILTERS: SearchFilters = { safe: 'active' };
