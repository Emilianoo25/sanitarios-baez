'use client'

import Link from 'next/link'
import { Droplets, LayoutGrid, Circle, Waves } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { getAllProducts } from '@/lib/products'

const CATEGORIES = [
  { slug: 'griferias', label: 'Griferías', icon: Droplets },
  { slug: 'sanitarios', label: 'Sanitarios', icon: LayoutGrid },
  { slug: 'bachas', label: 'Bachas', icon: Circle },
  { slug: 'duchas', label: 'Duchas', icon: Waves },
]

export function Categories() {
  const allProducts = getAllProducts()

  return (
    <Section className="bg-bone">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => {
            const count = allProducts.filter(p => p.category === cat.slug).length
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={`/productos?categoria=${cat.slug}`}
                  className="group flex flex-col items-center gap-4 rounded-xl bg-white p-6 text-center border border-border hover:border-primary hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon size={26} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-ink">{cat.label}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {count} {count === 1 ? 'producto' : 'productos'}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
