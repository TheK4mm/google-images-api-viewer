import { describe, expect, it } from 'vitest';
import { initialState, reducer, type SearchState } from './useImageSearch';
import { DEFAULT_FILTERS, type ImageResult, type SearchResponse } from '../types/serpapi';

function makeResult(id: number): ImageResult {
  return {
    position: id,
    title: `Image ${id}`,
    thumbnail: `https://example.com/thumb/${id}.jpg`,
    original: `https://example.com/original/${id}.jpg`,
    source: 'example.com',
    link: `https://example.com/page/${id}`,
  };
}

function response(results: ImageResult[], page = 0, hasMore = true): SearchResponse {
  return { query: 'cats', page, hasMore, count: results.length, results };
}

describe('useImageSearch reducer', () => {
  it('enters the loading state and clears previous results on a new search', () => {
    const dirty: SearchState = { ...initialState, results: [makeResult(1)], status: 'success' };
    const next = reducer(dirty, { type: 'SEARCH_START', query: 'cats', filters: DEFAULT_FILTERS });
    expect(next.status).toBe('loading');
    expect(next.query).toBe('cats');
    expect(next.results).toHaveLength(0);
  });

  it('marks an empty response as "empty"', () => {
    const loading = reducer(initialState, {
      type: 'SEARCH_START',
      query: 'cats',
      filters: DEFAULT_FILTERS,
    });
    const next = reducer(loading, { type: 'SUCCESS', response: response([]), append: false });
    expect(next.status).toBe('empty');
  });

  it('appends and de-duplicates results across pages', () => {
    const first = reducer(initialState, {
      type: 'SUCCESS',
      response: response([makeResult(1), makeResult(2)]),
      append: false,
    });
    const second = reducer(first, {
      type: 'SUCCESS',
      // result 2 is a duplicate and must be dropped
      response: response([makeResult(2), makeResult(3)], 1),
      append: true,
    });
    expect(second.status).toBe('success');
    expect(second.results.map((r) => r.position)).toEqual([1, 2, 3]);
  });

  it('captures the error message', () => {
    const next = reducer(initialState, { type: 'ERROR', message: 'boom' });
    expect(next.status).toBe('error');
    expect(next.error).toBe('boom');
  });
});
