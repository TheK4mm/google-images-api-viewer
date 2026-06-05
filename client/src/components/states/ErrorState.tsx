import { RefreshCw, TriangleAlert } from 'lucide-react';
import { Button } from '../ui/Button';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="mx-auto max-w-md animate-fade-in py-16 text-center">
      <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400">
        <TriangleAlert className="h-7 w-7" />
      </div>
      <h2 className="text-xl font-semibold">Algo salió mal</h2>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400">{message}</p>
      <Button variant="secondary" size="md" className="mt-5" onClick={onRetry}>
        <RefreshCw className="h-4 w-4" /> Reintentar
      </Button>
    </div>
  );
}
