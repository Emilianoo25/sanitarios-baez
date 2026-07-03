'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, Tag } from 'lucide-react'
import { FilterSidebar } from '@/components/filters/FilterSidebar'
import { FilterChips } from '@/components/filters/FilterChips'
import { ProductGrid } from '@/components/product/ProductGrid'
import { AIModalPlaceholder } from '@/components/ai-assistant/AIModalPlaceholder'
import { Container } from '@/components/common/Container'
import { useProductFilters } from '@/hooks/useProductFilters'
import type { Product } from '@/types'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Destacados' },
  { value: 'price-asc', label: 'Menor precio' },
  { value: 'price-desc', label: 'Mayor precio' },
] as const

export function ProductosClient({ products }: { products: Product[] }) {
  return (
    <Suspense>
      <ProductosContent products={products} />
    </Suspense>
  )
}

function ProductosContent({ products }: { products: Product[] }) {
  const searchParams = useSearchParams()
  const promoOnly = searchParams.get('promo') === 'true'
  const initialCategory = searchParams.get('categoria')
  const [aiOpen, setAiOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const {
    filters,
    filtered,
    toggleCategory,
    toggleBrand,
    removeFilter,
    resetFilters,
    activeCount,
    globalMax,
    setFilters,
  } = useProductFilters(products, initialCategory)

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-medium text-ink">
              {promoOnly ? 'Ofertas y promociones' : 'Catálogo'}
            </h1>
            {promoOnly && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <Tag size={12} />
                Productos en promo
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(s => !s)}
              className="lg:hidden flex items-center gap-2 text-sm font-medium text-ink border border-border rounded-md px-3 py-2 hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <SlidersHorizontal size={16} />
              Filtros {activeCount > 0 && `(${activeCount})`}
            </button>
            <p className="text-sm text-muted">
              Mostrando{' '}
              <span className="font-medium text-ink">{filtered.length}</span> productos
            </p>
          </div>
          <select
            value={filters.sortBy}
            onChange={e =>
              setFilters(f => ({
                ...f,
                sortBy: e.target.value as typeof filters.sortBy,
              }))
            }
            className="text-sm border border-border rounded-md px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            aria-label="Ordenar por"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <FilterChips
          filters={filters}
          onRemove={removeFilter}
          onReset={resetFilters}
          activeCount={activeCount}
        />

        <div className="mt-4 flex gap-8">
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              globalMax={globalMax}
              onToggleCategory={toggleCategory}
              onToggleBrand={toggleBrand}
              onSetFilters={setFilters}
            />
          </aside>

          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            >
              <div
                className="absolute left-0 top-0 h-full w-72 bg-white p-6 overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <FilterSidebar
                  filters={filters}
                  globalMax={globalMax}
                  onToggleCategory={toggleCategory}
                  onToggleBrand={toggleBrand}
                  onSetFilters={setFilters}
                />
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <ProductGrid
              products={promoOnly ? filtered.filter(p => p.onPromo) : filtered}
              onOpenAI={() => setAiOpen(true)}
            />
          </div>
        </div>
      </Container>
      <AIModalPlaceholder open={aiOpen} onOpenChange={setAiOpen} />
    </div>
  )
}
