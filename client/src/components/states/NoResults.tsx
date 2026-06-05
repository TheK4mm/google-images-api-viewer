import { SearchX } from 'lucide-react';

interface NoResultsProps {
  query: string;
}

export function NoResults({ query }: NoResultsProps) {
  return (
    <div className="mx-auto max-w-md animate-fade-in py-16 text-center">
      <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
        <SearchX className="h-7 w-7" />
      </div>
      <h2 className="text-xl font-semibold">Sin resultados para «{query}»</h2>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400">
        Prueba con otras palabras o ajusta los filtros de búsqueda.
      </p>
    </div>
  );
}
