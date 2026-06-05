import { Search, X } from 'lucide-react';
import type { FormEvent } from 'react';
import { Spinner } from '../ui/Spinner';
import { cn } from '../../lib/cn';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  loading?: boolean;
}

export function SearchBar({ value, onChange, onSubmit, onClear, loading = false }: SearchBarProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} role="search" className="relative w-full">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Busca imágenes… (p. ej. perros y gatos)"
        aria-label="Buscar imágenes"
        autoComplete="off"
        className={cn(
          'h-14 w-full rounded-2xl border border-zinc-200 bg-white pl-12 pr-32 text-base shadow-sm transition-colors',
          'placeholder:text-zinc-400 focus-visible:border-brand-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/15',
          'dark:border-zinc-800 dark:bg-zinc-900 dark:placeholder:text-zinc-500',
        )}
      />
      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
        {value && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Limpiar búsqueda"
            className="grid h-9 w-9 place-items-center rounded-xl text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-600 px-4 text-sm font-medium text-white transition-colors hover:bg-brand-500 disabled:pointer-events-none disabled:opacity-50"
        >
          {loading ? <Spinner className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          <span className="hidden sm:inline">Buscar</span>
        </button>
      </div>
    </form>
  );
}
