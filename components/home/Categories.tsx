'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { getAllProducts } from '@/lib/products'

const CATEGORIES = [
  {
    slug: 'griferias',
    label: 'Griferías',
    image: 'https://images.unsplash.com/photo-1542855368-ca6ea825bca2?w=600&q=80',
  },
  {
    slug: 'accesorios',
    label: 'Accesorios',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&q=80',
  },
  {
    slug: 'bachas',
    label: 'Bachas',
    image: 'https://images.unsplash.com/photo-1595428774862-a79ab68dbabb?w=600&q=80',
  },
  {
    slug: 'duchas',
    label: 'Duchas',
    image: 'https://images.unsplash.com/photo-1652662700928-5a4685e87d64?w=600&q=80',
  },
]

export function Categories() {
  const allProducts = getAllProducts()

  return (
    <Section className="bg-bone">
      <Container>
        <div className="mb-7">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[3px] text-accent mb-3">
            <span className="h-px w-8 bg-accent" />
            Categorías
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Explorá por categoría
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {CATEGORIES.map((cat, i) => {
            const count = allProducts.filter(p => p.category === cat.slug).length
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
                  className="group relative block aspect-[4/5] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:aspect-[3/4]"
                >
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-colors group-hover:from-primary/90" />

                  <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-white/15 text-white backdrop-blur-sm transition-colors group-hover:bg-accent">
                    <ArrowUpRight size={16} />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-display text-lg font-semibold leading-tight text-white sm:text-xl">
                      {cat.label}
                    </p>
                    <p className="mt-0.5 text-[11px] text-white/70">
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
