import { useCallback, useEffect, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Copy, ExternalLink, X } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { IconButton } from '../ui/IconButton';
import type { ImageResult } from '../../types/serpapi';

interface LightboxProps {
  images: ImageResult[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const OVERLAY_LINK =
  'inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60';

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const image = images[index];
  const [copied, setCopied] = useState(false);

  const canPrev = index > 0;
  const canNext = index < images.length - 1;

  const goPrev = useCallback(() => {
    if (index > 0) onNavigate(index - 1);
  }, [index, onNavigate]);

  const goNext = useCallback(() => {
    if (index < images.length - 1) onNavigate(index + 1);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') goPrev();
      else if (event.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goPrev, goNext]);

  useEffect(() => setCopied(false), [index]);

  if (!image) return null;

  const targetUrl = image.link || image.original;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard may be blocked */
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      label={`Imagen: ${image.title}`}
      className="relative z-10 flex h-full max-h-screen w-full max-w-6xl flex-col p-4 outline-none sm:p-6"
    >
      <div className="flex items-center justify-end gap-2">
        <IconButton
          label={copied ? 'Enlace copiado' : 'Copiar enlace'}
          variant="overlay"
          onClick={copyLink}
        >
          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
        </IconButton>
        <a
          href={targetUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir página original"
          className={OVERLAY_LINK}
        >
          <ExternalLink className="h-5 w-5" />
        </a>
        <IconButton label="Cerrar (Esc)" variant="overlay" onClick={onClose}>
          <X className="h-5 w-5" />
        </IconButton>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center py-3">
        {canPrev && (
          <IconButton
            label="Anterior (←)"
            variant="overlay"
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2"
          >
            <ChevronLeft className="h-6 w-6" />
          </IconButton>
        )}

        <img
          key={image.original}
          src={image.original}
          alt={image.title}
          className="max-h-full max-w-full animate-scale-in rounded-lg object-contain shadow-2xl"
        />

        {canNext && (
          <IconButton
            label="Siguiente (→)"
            variant="overlay"
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            <ChevronRight className="h-6 w-6" />
          </IconButton>
        )}
      </div>

      <div className="text-center text-white">
        <p className="line-clamp-2 text-sm font-medium">{image.title}</p>
        <p className="mt-1 text-xs text-white/60">
          {index + 1} / {images.length}
          {image.source ? ` · ${image.source}` : ''}
        </p>
      </div>
    </Modal>
  );
}
