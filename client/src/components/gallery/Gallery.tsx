import type { ImageResult } from '../../types/serpapi';
import { ImageCard } from './ImageCard';

interface GalleryProps {
  results: ImageResult[];
  onSelect: (index: number) => void;
}

export function Gallery({ results, onSelect }: GalleryProps) {
  return (
    <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
      {results.map((image, index) => (
        <ImageCard key={image.original} image={image} onClick={() => onSelect(index)} />
      ))}
    </div>
  );
}
