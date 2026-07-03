import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/common/Container'

const STATS = [
  { value: '+15', label: 'Años en el rubro' },
  { value: '+500', label: 'Productos en stock' },
  { value: '3', label: 'Marcas premium' },
  { value: '100%', label: 'Garantía oficial' },
]

export function SobreBaez() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark py-20 lg:py-28"
      aria-labelledby="sobre-baez-heading"
    >
      {/* Decorative grid + glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-sky-400/20 blur-[120px]" />

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          {/* Text */}
          <div className="space-y-6 text-white">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[3px] text-white/60">
              <span className="h-px w-8 bg-accent" />
              Sobre nosotros
            </p>
            <h2
              id="sobre-baez-heading"
              className="font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl"
            >
              Más de 15 años llevando calidad real a tu hogar.
            </h2>
            <p className="max-w-xl text-white/70 leading-relaxed text-[15px]">
              Empresa familiar de Villa Madero, Buenos Aires. Trabajamos con FV, Ferrum y Peirano
              para darte el producto correcto al primer intento, con asesoramiento de verdad y
              envío en el día para CABA y GBA.
            </p>
            <p className="max-w-xl text-white/70 leading-relaxed text-[15px]">
              Nada de vueltas ni promesas vacías. Si lo tenés que cambiar, lo cambiamos. Si tenés
              dudas, te asesoramos por WhatsApp sin costo.
            </p>
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-2 bg-white px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Contactanos
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/15 bg-white/10">
            {STATS.map(stat => (
              <div
                key={stat.label}
                className="bg-primary/40 p-7 backdrop-blur-sm transition-colors hover:bg-primary/20"
              >
                <p className="font-display text-5xl font-bold tracking-tight text-white nums-tabular">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
