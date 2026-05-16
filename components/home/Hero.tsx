'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/common/Container'

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0, 0, 1] } },
}

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-white py-16 lg:py-24"
      aria-label="Hero principal"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.p
              variants={item}
              className="text-[11px] font-medium uppercase tracking-[2px] text-accent"
            >
              Diseñá tu baño ideal
            </motion.p>
            <motion.h1
              variants={item}
              className="font-display text-4xl font-medium leading-tight text-ink sm:text-5xl lg:text-[52px]"
            >
              Curaduría premium para reformas que duran décadas.
            </motion.h1>
            <motion.p
              variants={item}
              className="text-base text-muted leading-relaxed max-w-lg"
            >
              FV, Ferrum, Roca, Peirano. Asesoramiento sin vueltas. Envío en el día CABA y GBA.
            </motion.p>
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/productos"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Ver catálogo
                <ArrowRight size={16} />
              </Link>
              <button
                className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-primary px-6 py-3.5 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Abrir asistente IA"
                onClick={() =>
                  document
                    .querySelector<HTMLButtonElement>('[aria-label="Abrir asistente IA"]')
                    ?.click()
                }
              >
                <Sparkles size={16} />
                Asistente IA
                <Badge className="bg-accent text-white text-[9px] py-0 px-1.5 ml-1">
                  Nuevo
                </Badge>
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="relative aspect-square w-full max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden bg-bone"
          >
            <Image
              src="https://placehold.co/800x800/F8F7F4/0A4D8C/png?text=Baño+Premium"
              alt="Ambiente de baño premium con griferías FV y sanitarios Ferrum"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 50vw"
              priority
            />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
