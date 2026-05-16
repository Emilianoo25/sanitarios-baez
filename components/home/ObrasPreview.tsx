'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'

const OBRAS_PREVIEW = [
  {
    title: 'Reforma baño principal',
    description: 'Griferías FV + Bacha Ferrum de apoyar',
    img: 'https://placehold.co/600x400/F8F7F4/0A4D8C/png?text=Obra+1',
  },
  {
    title: 'Cocina moderna',
    description: 'Grifería Peirano monocomando',
    img: 'https://placehold.co/600x400/F8F7F4/0A4D8C/png?text=Obra+2',
  },
  {
    title: 'Baño suite',
    description: 'Columna FV termostática + receptáculo Ferrum',
    img: 'https://placehold.co/600x400/F8F7F4/0A4D8C/png?text=Obra+3',
  },
]

export function ObrasPreview() {
  return (
    <Section className="bg-bone">
      <Container>
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[2px] text-accent mb-2">
              Casos reales
            </p>
            <h2 className="font-display text-3xl font-medium text-ink">Obras realizadas</h2>
          </div>
          <Link
            href="/obras"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Ver todas <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {OBRAS_PREVIEW.map((obra, i) => (
            <motion.article
              key={obra.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="overflow-hidden rounded-xl bg-white border border-border"
            >
              <div className="relative aspect-video">
                <Image
                  src={obra.img}
                  alt={obra.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-ink text-sm">{obra.title}</h3>
                <p className="text-xs text-muted mt-1">{obra.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/obras"
            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Ver todas las obras
          </Link>
        </div>
      </Container>
    </Section>
  )
}
