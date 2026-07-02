'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { getAllBrands } from '@/lib/products'
import type { FilterState } from '@/hooks/useProductFilters'
import type { ProductCategory } from '@/types'

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'griferias', label: 'Griferías' },
  { value: 'accesorios', label: 'Accesorios' },
  { value: 'bachas', label: 'Bachas' },
  { value: 'duchas', label: 'Duchas' },
]

interface FilterSidebarProps {
  filters: FilterState
  globalMax: number
  onToggleCategory: (cat: ProductCategory) => void
  onToggleBrand: (brand: string) => void
  onSetFilters: React.Dispatch<React.SetStateAction<FilterState>>
}

export function FilterSidebar({
  filters,
  globalMax,
  onToggleCategory,
  onToggleBrand,
  onSetFilters,
}: FilterSidebarProps) {
  const brands = getAllBrands()

  return (
    <aside className="space-y-6" aria-label="Filtros de productos">
      <div>
        <h3 className="text-sm font-medium text-ink mb-3">Categoría</h3>
        <ul className="space-y-2" role="list">
          {CATEGORIES.map(cat => (
            <li key={cat.value} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat.value}`}
                checked={filters.categories.includes(cat.value)}
                onCheckedChange={() => onToggleCategory(cat.value)}
              />
              <label
                htmlFor={`cat-${cat.value}`}
                className="text-sm text-ink cursor-pointer"
              >
                {cat.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-medium text-ink mb-3">Marca</h3>
        <ul className="space-y-2" role="list">
          {brands.map(brand => (
            <li key={brand} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => onToggleBrand(brand)}
              />
              <label
                htmlFor={`brand-${brand}`}
                className="text-sm text-ink cursor-pointer"
              >
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-medium text-ink mb-3">
          Precio máximo: ${filters.priceMax.toLocaleString('es-AR')}
        </h3>
        <Slider
          min={0}
          max={globalMax}
          step={5000}
          value={[filters.priceMax]}
          onValueChange={(value) => {
            const val = Array.isArray(value) ? value[0] : value
            onSetFilters(f => ({ ...f, priceMax: val as number }))
          }}
          className="w-full"
          aria-label="Precio máximo"
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="in-stock"
          checked={filters.inStockOnly}
          onCheckedChange={(checked) =>
            onSetFilters(f => ({ ...f, inStockOnly: !!checked }))
          }
        />
        <label htmlFor="in-stock" className="text-sm text-ink cursor-pointer">
          Solo en stock
        </label>
      </div>
    </aside>
  )
}
