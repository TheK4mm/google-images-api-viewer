import { cn } from '../../lib/cn';

const HEIGHTS = ['h-48', 'h-64', 'h-56', 'h-72', 'h-52', 'h-60', 'h-44', 'h-68'];

export function GallerySkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="columns-2 gap-4 sm:columns-3 lg:columns-4" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'mb-4 w-full break-inside-avoid animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800',
            HEIGHTS[index % HEIGHTS.length],
          )}
        />
      ))}
    </div>
  );
}
