import { SlidersHorizontal } from 'lucide-react';
import { Select } from '../ui/Select';
import type { ImageSize, ImageType, SafeSearch, SearchFilters } from '../../types/serpapi';

interface FilterBarProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  disabled?: boolean;
}

const COLOR_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Cualquier color' },
  { value: 'red', label: 'Rojo' },
  { value: 'orange', label: 'Naranja' },
  { value: 'yellow', label: 'Amarillo' },
  { value: 'green', label: 'Verde' },
  { value: 'teal', label: 'Turquesa' },
  { value: 'blue', label: 'Azul' },
  { value: 'purple', label: 'Morado' },
  { value: 'pink', label: 'Rosa' },
  { value: 'white', label: 'Blanco' },
  { value: 'gray', label: 'Gris' },
  { value: 'black', label: 'Negro' },
  { value: 'brown', label: 'Marrón' },
  { value: 'black_and_white', label: 'Blanco y negro' },
  { value: 'transparent', label: 'Transparente' },
];

export function FilterBar({ filters, onChange, disabled }: FilterBarProps) {
  const update = (patch: Partial<SearchFilters>) => onChange({ ...filters, ...patch });

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-zinc-200 bg-white/60 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
      <span className="inline-flex items-center gap-1.5 self-center px-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
        <SlidersHorizontal className="h-4 w-4" /> Filtros
      </span>

      <div className="min-w-[7.5rem] flex-1">
        <Select
          label="Tamaño"
          value={filters.size ?? ''}
          disabled={disabled}
          onChange={(event) =>
            update({ size: (event.target.value || undefined) as ImageSize | undefined })
          }
        >
          <option value="">Cualquiera</option>
          <option value="l">Grande</option>
          <option value="m">Mediano</option>
          <option value="i">Icono</option>
        </Select>
      </div>

      <div className="min-w-[7.5rem] flex-1">
        <Select
          label="Tipo"
          value={filters.type ?? ''}
          disabled={disabled}
          onChange={(event) =>
            update({ type: (event.target.value || undefined) as ImageType | undefined })
          }
        >
          <option value="">Cualquiera</option>
          <option value="photo">Foto</option>
          <option value="clipart">Clipart</option>
          <option value="lineart">Líneas</option>
          <option value="gif">GIF animado</option>
        </Select>
      </div>

      <div className="min-w-[7.5rem] flex-1">
        <Select
          label="Color"
          value={filters.color ?? ''}
          disabled={disabled}
          onChange={(event) => update({ color: event.target.value || undefined })}
        >
          {COLOR_OPTIONS.map((color) => (
            <option key={color.value} value={color.value}>
              {color.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="min-w-[7.5rem] flex-1">
        <Select
          label="SafeSearch"
          value={filters.safe}
          disabled={disabled}
          onChange={(event) => update({ safe: event.target.value as SafeSearch })}
        >
          <option value="active">Activado</option>
          <option value="off">Desactivado</option>
        </Select>
      </div>
    </div>
  );
}
