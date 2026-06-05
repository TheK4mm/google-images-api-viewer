import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'recent-searches';
const MAX_RECENT = 8;

function load(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === 'string') : [];
  } catch {
    return [];
  }
}

export function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
    } catch {
      /* ignore */
    }
  }, [searches]);

  const addSearch = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setSearches((prev) => {
      const deduped = prev.filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
      return [trimmed, ...deduped].slice(0, MAX_RECENT);
    });
  }, []);

  const removeSearch = useCallback((term: string) => {
    setSearches((prev) => prev.filter((s) => s !== term));
  }, []);

  const clearSearches = useCallback(() => setSearches([]), []);

  return { searches, addSearch, removeSearch, clearSearches };
}
