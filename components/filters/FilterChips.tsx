'use client'

import { X } from 'lucide-react'
import type { FilterState } from '@/hooks/useProductFilters'

interface FilterChipsProps {
  filters: FilterState
  onRemove: (type: 'category' | 'brand', value: string) => void
  onReset: () => void
  activeCount: number
}

const CATEGORY_LABELS: Record<string, string> = {
  griferias: 'Griferías',
  sanitarios: 'Sanitarios',
  bachas: 'Bachas',
  duchas: 'Duchas',
}

export function FilterChips({ filters, onRemove, onReset, activeCount }: FilterChipsProps) {
  if (activeCount === 0) return null

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="list"
      aria-label="Filtros activos"
    >
      {filters.categories.map(cat => (
        <span
          key={cat}
          role="listitem"
          className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
        >
          {CATEGORY_LABELS[cat]}
          <button
            onClick={() => onRemove('category', cat)}
            aria-label={`Quitar filtro ${CATEGORY_LABELS[cat]}`}
            className="ml-1 hover:text-primary-dark"
          >
            <X size={12} />
          </button>
        </span>
      ))}
      {filters.brands.map(brand => (
        <span
          key={brand}
          role="listitem"
          className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
        >
          {brand}
          <button
            onClick={() => onRemove('brand', brand)}
            aria-label={`Quitar filtro ${brand}`}
            className="ml-1 hover:text-primary-dark"
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <button
        onClick={onReset}
        className="text-xs text-muted underline hover:text-ink transition-colors"
      >
        Limpiar filtros
      </button>
    </div>
  )
}
