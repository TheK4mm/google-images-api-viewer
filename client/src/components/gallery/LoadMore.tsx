import { useEffect, useRef } from 'react';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';

interface LoadMoreProps {
  onLoadMore: () => void;
  loading: boolean;
  hasMore: boolean;
}

export function LoadMore({ onLoadMore, loading, hasMore }: LoadMoreProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const onLoadMoreRef = useRef(onLoadMore);
  onLoadMoreRef.current = onLoadMore;

  useEffect(() => {
    if (!hasMore) return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onLoadMoreRef.current();
      },
      { rootMargin: '600px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore]);

  if (!hasMore) {
    return (
      <p className="py-10 text-center text-sm text-zinc-400">
        Has llegado al final de los resultados.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <div ref={sentinelRef} aria-hidden="true" className="h-px w-px" />
      <Button variant="secondary" size="lg" onClick={onLoadMore} disabled={loading}>
        {loading ? (
          <>
            <Spinner className="h-4 w-4" /> Cargando…
          </>
        ) : (
          'Cargar más'
        )}
      </Button>
    </div>
  );
}
