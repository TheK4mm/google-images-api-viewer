import { Clock, Trash2 } from 'lucide-react';
import { Chip } from '../ui/Chip';

interface RecentSearchesProps {
  searches: string[];
  onSelect: (term: string) => void;
  onRemove: (term: string) => void;
  onClear: () => void;
}

export function RecentSearches({ searches, onSelect, onRemove, onClear }: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400">
        <Clock className="h-4 w-4" /> Recientes
      </span>
      {searches.map((term) => (
        <Chip
          key={term}
          onClick={() => onSelect(term)}
          onRemove={() => onRemove(term)}
          removeLabel={`Quitar ${term}`}
        >
          {term}
        </Chip>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
      >
        <Trash2 className="h-3.5 w-3.5" /> Limpiar
      </button>
    </div>
  );
}
