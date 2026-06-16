export function Footer() {
  return (
    <footer className="border-t border-zinc-200/70 py-6 dark:border-zinc-800/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-1.5 px-4 text-center text-sm text-zinc-500 dark:text-zinc-400 sm:px-6">
        <p>
          Resultados de Google Images vía{' '}
          <a
            href="https://serpapi.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-brand-600 hover:underline dark:text-brand-400"
          >
            SerpApi
          </a>
          .
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Las imágenes pertenecen a sus respectivos propietarios y se muestran solo con fines de
          búsqueda.
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          © 2026 · Construido con React, Express y Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
