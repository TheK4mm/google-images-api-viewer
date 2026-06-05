import { useCallback, useEffect, useReducer, useRef } from 'react';
import { fetchImages } from '../lib/api';
import {
  DEFAULT_FILTERS,
  type ImageResult,
  type SearchFilters,
  type SearchResponse,
} from '../types/serpapi';

export type SearchStatus = 'idle' | 'loading' | 'loadingMore' | 'success' | 'empty' | 'error';

export interface SearchState {
  status: SearchStatus;
  query: string;
  filters: SearchFilters;
  page: number;
  results: ImageResult[];
  hasMore: boolean;
  error: string | null;
}

export const initialState: SearchState = {
  status: 'idle',
  query: '',
  filters: DEFAULT_FILTERS,
  page: 0,
  results: [],
  hasMore: false,
  error: null,
};

type Action =
  | { type: 'SEARCH_START'; query: string; filters: SearchFilters }
  | { type: 'LOAD_MORE_START' }
  | { type: 'SUCCESS'; response: SearchResponse; append: boolean }
  | { type: 'ERROR'; message: string }
  | { type: 'SET_FILTERS'; filters: SearchFilters };

/** Removes duplicate images (same original URL) so React keys stay unique. */
function dedupe(items: ImageResult[]): ImageResult[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.original)) return false;
    seen.add(item.original);
    return true;
  });
}

export function reducer(state: SearchState, action: Action): SearchState {
  switch (action.type) {
    case 'SEARCH_START':
      return {
        ...state,
        status: 'loading',
        query: action.query,
        filters: action.filters,
        page: 0,
        results: [],
        hasMore: false,
        error: null,
      };
    case 'LOAD_MORE_START':
      return { ...state, status: 'loadingMore', error: null };
    case 'SUCCESS': {
      const merged = action.append
        ? dedupe([...state.results, ...action.response.results])
        : dedupe(action.response.results);
      return {
        ...state,
        status: merged.length === 0 ? 'empty' : 'success',
        results: merged,
        page: action.response.page,
        hasMore: action.response.hasMore,
        error: null,
      };
    }
    case 'ERROR':
      return { ...state, status: 'error', error: action.message };
    case 'SET_FILTERS':
      return { ...state, filters: action.filters };
    default:
      return state;
  }
}

export function useImageSearch() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const abortRef = useRef<AbortController | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const run = useCallback(
    async (query: string, filters: SearchFilters, page: number, append: boolean) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      dispatch(append ? { type: 'LOAD_MORE_START' } : { type: 'SEARCH_START', query, filters });

      try {
        const response = await fetchImages({ query, page, filters, signal: controller.signal });
        if (!controller.signal.aborted) {
          dispatch({ type: 'SUCCESS', response, append });
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        const message = error instanceof Error ? error.message : 'Ocurrió un error inesperado.';
        dispatch({ type: 'ERROR', message });
      }
    },
    [],
  );

  const search = useCallback(
    (query: string, filters?: SearchFilters) => {
      const trimmed = query.trim();
      if (!trimmed) return;
      void run(trimmed, filters ?? stateRef.current.filters, 0, false);
    },
    [run],
  );

  const loadMore = useCallback(() => {
    const current = stateRef.current;
    if (!current.hasMore || current.status === 'loading' || current.status === 'loadingMore')
      return;
    if (!current.query) return;
    void run(current.query, current.filters, current.page + 1, true);
  }, [run]);

  const retry = useCallback(() => {
    const current = stateRef.current;
    if (current.query) void run(current.query, current.filters, 0, false);
  }, [run]);

  const setFilters = useCallback(
    (filters: SearchFilters) => {
      const current = stateRef.current;
      if (current.query) {
        void run(current.query, filters, 0, false);
      } else {
        dispatch({ type: 'SET_FILTERS', filters });
      }
    },
    [run],
  );

  useEffect(() => () => abortRef.current?.abort(), []);

  return { ...state, search, loadMore, retry, setFilters };
}
