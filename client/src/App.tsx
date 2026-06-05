import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchBar } from './components/search/SearchBar';
import { FilterBar } from './components/search/FilterBar';
import { RecentSearches } from './components/search/RecentSearches';
import { Gallery } from './components/gallery/Gallery';
import { GallerySkeleton } from './components/gallery/GallerySkeleton';
import { LoadMore } from './components/gallery/LoadMore';
import { Lightbox } from './components/lightbox/Lightbox';
import { EmptyState } from './components/states/EmptyState';
import { NoResults } from './components/states/NoResults';
import { ErrorState } from './components/states/ErrorState';
import { useImageSearch } from './hooks/useImageSearch';
import { useRecentSearches } from './hooks/useRecentSearches';
import { useTheme } from './hooks/useTheme';
import type { SearchFilters } from './types/serpapi';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const { searches, addSearch, removeSearch, clearSearches } = useRecentSearches();
  const { status, query, filters, results, hasMore, error, search, loadMore, retry, setFilters } =
    useImageSearch();

  const [queryText, setQueryText] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const runSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setQueryText(trimmed);
    search(trimmed);
    addSearch(trimmed);
  };

  const handleFilterChange = (next: SearchFilters) => setFilters(next);

  const isSearching = status === 'loading';
  const hasResults = results.length > 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
        <section className="py-8 sm:py-10">
          {status === 'idle' && (
            <div className="mb-6 text-center">
              <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Buscador de imágenes
              </h1>
              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                Resultados de Google en tiempo real, impulsados por SerpApi.
              </p>
            </div>
          )}

          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <SearchBar
              value={queryText}
              onChange={setQueryText}
              onSubmit={() => runSearch(queryText)}
              onClear={() => setQueryText('')}
              loading={isSearching}
            />
            <FilterBar filters={filters} onChange={handleFilterChange} disabled={isSearching} />
            <RecentSearches
              searches={searches}
              onSelect={runSearch}
              onRemove={removeSearch}
              onClear={clearSearches}
            />
          </div>
        </section>

        <section className="pb-12">
          {status === 'idle' && <EmptyState onSuggestion={runSearch} />}
          {status === 'loading' && <GallerySkeleton />}
          {status === 'error' && (
            <ErrorState message={error ?? 'Error inesperado.'} onRetry={retry} />
          )}
          {status === 'empty' && <NoResults query={query} />}

          {(status === 'success' || status === 'loadingMore') && hasResults && (
            <>
              <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                Resultados para{' '}
                <span className="font-medium text-zinc-700 dark:text-zinc-200">«{query}»</span>
              </p>
              <Gallery results={results} onSelect={(index) => setLightboxIndex(index)} />
              <LoadMore
                onLoadMore={loadMore}
                loading={status === 'loadingMore'}
                hasMore={hasMore}
              />
            </>
          )}
        </section>
      </main>

      <Footer />

      {lightboxIndex !== null && (
        <Lightbox
          images={results}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      )}
    </div>
  );
}
