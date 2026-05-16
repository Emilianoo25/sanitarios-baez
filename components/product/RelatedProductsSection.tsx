'use client'

import { useState } from 'react'
import { ProductGrid } from './ProductGrid'
import { AIModalPlaceholder } from '@/components/ai-assistant/AIModalPlaceholder'
import type { Product } from '@/types'

export function RelatedProductsSection({ products }: { products: Product[] }) {
  const [aiOpen, setAiOpen] = useState(false)

  if (products.length === 0) return null

  return (
    <section className="mt-16" aria-labelledby="related-heading">
      <h2
        id="related-heading"
        className="font-display text-2xl font-medium text-ink mb-6"
      >
        Productos relacionados
      </h2>
      <ProductGrid products={products} onOpenAI={() => setAiOpen(true)} />
      <AIModalPlaceholder open={aiOpen} onOpenChange={setAiOpen} />
    </section>
  )
}
