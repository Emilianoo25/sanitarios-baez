'use client'

import { ProductCard } from './ProductCard'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  onOpenAI: () => void
  premiumSlug?: string
}

export function ProductGrid({ products, onOpenAI, premiumSlug }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium text-ink">No se encontraron productos</p>
        <p className="text-sm text-muted mt-2">Probá con otros filtros</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onOpenAI={onOpenAI}
          isPremium={product.slug === premiumSlug}
        />
      ))}
    </div>
  )
}
