import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { ImageResult } from '../../types/serpapi';
import { cn } from '../../lib/cn';

interface ImageCardProps {
  image: ImageResult;
  onClick: () => void;
}

export function ImageCard({ image, onClick }: ImageCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-zinc-800 dark:bg-zinc-900 dark:focus-visible:ring-offset-zinc-950"
    >
      <div className="relative">
        {!loaded && !errored && (
          <div className="aspect-[4/3] w-full animate-pulse bg-zinc-200 dark:bg-zinc-800" />
        )}
        {errored ? (
          <div className="flex aspect-[4/3] w-full items-center justify-center bg-zinc-100 text-xs text-zinc-400 dark:bg-zinc-800">
            Imagen no disponible
          </div>
        ) : (
          <img
            src={image.thumbnail}
            alt={image.title}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            className={cn(
              'w-full object-cover transition-opacity duration-300',
              loaded ? 'opacity-100' : 'absolute inset-0 opacity-0',
            )}
          />
        )}
        <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/0 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="w-full p-3">
            <p className="line-clamp-2 text-sm font-medium text-white">{image.title}</p>
            {image.source && (
              <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-white/70">
                <ExternalLink className="h-3 w-3 shrink-0" /> {image.source}
              </p>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
