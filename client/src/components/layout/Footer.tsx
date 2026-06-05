export function Footer() {
  return (
    <footer className="border-t border-zinc-200/70 py-6 dark:border-zinc-800/70">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-zinc-500 dark:text-zinc-400 sm:px-6">
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
          . Construido con React, Express y Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
