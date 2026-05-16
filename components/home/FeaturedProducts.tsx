'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { getFeaturedProducts } from '@/lib/products'
import { ProductGrid } from '@/components/product/ProductGrid'
import { AIModalPlaceholder } from '@/components/ai-assistant/AIModalPlaceholder'
import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'

const PREMIUM_SLUG = 'fv-allegro-columna-ducha-termostatica'

export function FeaturedProducts() {
  const [aiOpen, setAiOpen] = useState(false)
  const featured = getFeaturedProducts()

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
          <p className="text-[11px] font-medium uppercase tracking-[2px] text-accent mb-2">
            Selección del mes
          </p>
          <h2 className="font-display text-3xl font-medium text-ink">
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
