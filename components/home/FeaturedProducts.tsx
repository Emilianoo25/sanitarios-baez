'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProductGrid } from '@/components/product/ProductGrid'
import { AIModalPlaceholder } from '@/components/ai-assistant/AIModalPlaceholder'
import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import type { Product } from '@/types'

const PREMIUM_SLUG = 'combo-bano-beat-lavatorio-pared-bidet'

export function FeaturedProducts({ products }: { products: Product[] }) {
  const [aiOpen, setAiOpen] = useState(false)
  const featured = products

  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[3px] text-accent mb-3">
            <span className="h-px w-8 bg-accent" />
            Selección del mes
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink">
            Productos destacados
          </h2>
        </motion.div>
        <ProductGrid
          products={featured}
          onOpenAI={() => setAiOpen(true)}
          premiumSlug={PREMIUM_SLUG}
        />
      </Container>
      <AIModalPlaceholder open={aiOpen} onOpenChange={setAiOpen} />
    </Section>
  )
}
