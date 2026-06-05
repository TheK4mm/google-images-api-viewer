import { Image as ImageIcon } from 'lucide-react';
import { Chip } from '../ui/Chip';

const SUGGESTIONS = [
  'Auroras boreales',
  'Arquitectura moderna',
  'Gatitos',
  'Montañas al atardecer',
  'Arte abstracto',
  'Comida saludable',
];

interface EmptyStateProps {
  onSuggestion: (term: string) => void;
}

export function EmptyState({ onSuggestion }: EmptyStateProps) {
  return (
    <div className="mx-auto max-w-xl animate-fade-in py-12 text-center sm:py-16">
      <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-fuchsia-500 text-white shadow-lg shadow-brand-600/30">
        <ImageIcon className="h-8 w-8" />
      </div>
      <h2 className="text-balance text-2xl font-semibold tracking-tight">
        Encuentra cualquier imagen, al instante
      </h2>
      <p className="mt-2 text-balance text-zinc-500 dark:text-zinc-400">
        Busca en Google Images en tiempo real. Prueba con una de estas ideas:
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <Chip key={suggestion} onClick={() => onSuggestion(suggestion)}>
            {suggestion}
          </Chip>
        ))}
      </div>
    </div>
  );
}
