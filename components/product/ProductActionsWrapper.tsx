'use client'

import { useState } from 'react'
import { ProductActions } from './ProductActions'
import { AIModalPlaceholder } from '@/components/ai-assistant/AIModalPlaceholder'
import type { Product } from '@/types'

export function ProductActionsWrapper({ product }: { product: Product }) {
  const [aiOpen, setAiOpen] = useState(false)
  return (
    <>
      <ProductActions product={product} onOpenAI={() => setAiOpen(true)} variant="page" />
      <AIModalPlaceholder open={aiOpen} onOpenChange={setAiOpen} product={product} />
    </>
  )
}
