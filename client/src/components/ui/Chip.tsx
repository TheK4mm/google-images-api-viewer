import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface ChipProps {
  children: ReactNode;
  onClick?: () => void;
  onRemove?: () => void;
  removeLabel?: string;
}

export function Chip({ children, onClick, onRemove, removeLabel = 'Quitar' }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white pl-3 text-sm text-zinc-700 transition-colors',
        'dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200',
        onRemove ? 'pr-1' : 'pr-3',
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className="py-1.5 font-medium transition-colors hover:text-brand-600 focus-visible:outline-none dark:hover:text-brand-400"
      >
        {children}
      </button>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          className="grid h-5 w-5 place-items-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </span>
  );
}
