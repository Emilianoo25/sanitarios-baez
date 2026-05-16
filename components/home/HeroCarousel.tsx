'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react'
import { AIModalPlaceholder } from '@/components/ai-assistant/AIModalPlaceholder'

interface Slide {
  id: string
  badge: string
  discount?: string
  title: string
  subtitle: string
  originalPrice?: string
  promoPrice: string
  priceNote: string
  ctaLabel: string
  ctaHref: string
  image: string
  imageAlt: string
}

const SLIDES: Slide[] = [
  {
    id: 'fv-griferia',
    badge: 'PROMO DEL MES',
    discount: '-10%',
    title: 'Griferías FV con 10% off',
    subtitle: 'Línea Arizona y Allegro. Cromo, garantía oficial, envío en el día.',
    originalPrice: '$185.000',
    promoPrice: 'desde $166.500',
    priceNote: '3 cuotas sin interés',
    ctaLabel: 'Ver griferías',
    ctaHref: '/productos?categoria=griferias',
    image: 'https://images.unsplash.com/photo-1542855368-ca6ea825bca2?w=1400&q=85',
    imageAlt: 'Grifería cromada de baño moderna',
  },
  {
    id: 'kit-bano',
    badge: 'COMBO ESPECIAL',
    discount: 'KIT',
    title: 'Armá tu baño completo',
    subtitle: 'Inodoro + Bidet + Bacha Ferrum. Todo en un solo pedido, instalación incluida.',
    promoPrice: 'Consultá el precio',
    priceNote: 'Financiación hasta 12 cuotas',
    ctaLabel: 'Ver sanitarios',
    ctaHref: '/productos?categoria=sanitarios',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1400&q=85',
    imageAlt: 'Baño moderno con sanitarios Ferrum blancos',
  },
  {
    id: 'duchas',
    badge: 'NUEVO INGRESO',
    discount: 'HOT',
    title: 'Columnas de ducha termostáticas',
    subtitle: 'FV Allegro y Dominic. Temperatura constante. Diseño premium que dura décadas.',
    originalPrice: '$425.000',
    promoPrice: 'desde $382.500',
    priceNote: 'Efectivo con 10% de descuento',
    ctaLabel: 'Ver duchas',
    ctaHref: '/productos?categoria=duchas',
    image: 'https://images.unsplash.com/photo-1652662700928-5a4685e87d64?w=1400&q=85',
    imageAlt: 'Ducha moderna con rociador de techo',
  },
  {
    id: 'cocina',
    badge: 'OFERTA ESPECIAL',
    discount: '-15%',
    title: 'Grifería de cocina Peirano',
    subtitle: 'Monocomando con caño alto giratorio. Calidad y durabilidad en cada uso.',
    originalPrice: '$155.000',
    promoPrice: 'desde $131.750',
    priceNote: '6 cuotas sin interés',
    ctaLabel: 'Ver cocina',
    ctaHref: '/productos?categoria=griferias',
    image: 'https://images.unsplash.com/photo-1595428774862-a79ab68dbabb?w=1400&q=85',
    imageAlt: 'Cocina moderna con grifería cromada',
  },
]

const AUTO_PLAY_MS = 5500

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), [])
  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, AUTO_PLAY_MS)
    return () => clearInterval(id)
  }, [paused, next])

  const slide = SLIDES[current]

  return (
    <>
      <section
        className="relative w-full overflow-hidden bg-ink"
        aria-label="Ofertas y promociones"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Background image */}
        <div className="relative h-[480px] sm:h-[520px] lg:h-[580px] w-full">
          <Image
            key={slide.id}
            src={slide.image}
            alt={slide.imageAlt}
            fill
            className="object-cover"
            priority={current === 0}
            sizes="100vw"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-2xl px-6 text-center sm:px-10">
              {/* Badge row */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-[2px] text-white/70">
                  {slide.badge}
                </span>
                {slide.discount && (
                  <span className="rounded bg-accent px-2 py-0.5 text-xs font-bold text-white">
                    {slide.discount}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="font-display text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
                {slide.title}
              </h2>

              {/* Subtitle */}
              <p className="mt-3 text-sm text-white/75 leading-relaxed sm:text-base max-w-lg mx-auto">
                {slide.subtitle}
              </p>

              {/* Price */}
              <div className="mt-5 flex items-baseline justify-center gap-3">
                {slide.originalPrice && (
                  <span className="text-lg text-white/50 line-through">
                    {slide.originalPrice}
                  </span>
                )}
                <span className="font-display text-3xl font-medium text-accent sm:text-4xl">
                  {slide.promoPrice}
                </span>
              </div>
              <p className="mt-1 text-xs text-white/50">{slide.priceNote}</p>

              {/* CTAs */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href={slide.ctaHref}
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {slide.ctaLabel}
                  <ArrowRight size={15} />
                </Link>
                <button
                  onClick={() => setAiOpen(true)}
                  className="inline-flex items-center gap-2 rounded-md bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20 transition-colors border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Sparkles size={15} />
                  Asistente IA
                  <span className="rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide leading-none">
                    Nuevo
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2.5 text-white backdrop-blur-sm hover:bg-black/55 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2.5 text-white backdrop-blur-sm hover:bg-black/55 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Siguiente slide"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrent(i)}
                aria-label={`Ir al slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none ${
                  i === current ? 'w-7 bg-accent' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <AIModalPlaceholder open={aiOpen} onOpenChange={setAiOpen} />
    </>
  )
}
