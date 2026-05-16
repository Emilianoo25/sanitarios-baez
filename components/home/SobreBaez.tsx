import Link from 'next/link'
import { Container } from '@/components/common/Container'

const STATS = [
  { value: '+15', label: 'Años en el rubro' },
  { value: '+500', label: 'Productos en stock' },
  { value: '3', label: 'Marcas premium' },
  { value: '100%', label: 'Garantía oficial' },
]

export function SobreBaez() {
  return (
    <section className="bg-primary py-16 lg:py-20" aria-labelledby="sobre-baez-heading">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div className="space-y-6 text-white">
            <p className="text-[11px] font-medium uppercase tracking-[2px] text-white/60">
              Sobre nosotros
            </p>
            <h2
              id="sobre-baez-heading"
              className="font-display text-3xl font-medium leading-snug sm:text-4xl"
            >
              Sanitarios Báez: más de 15 años llevando calidad a tu hogar.
            </h2>
            <p className="text-white/75 leading-relaxed text-sm sm:text-base">
              Somos una empresa familiar de Villa Madero, Buenos Aires. Trabajamos con las mejores
              marcas del mercado — FV, Ferrum, Peirano — para darte el producto correcto al primer
              intento, con asesoramiento de verdad y envío en el día para CABA y GBA.
            </p>
            <p className="text-white/75 leading-relaxed text-sm sm:text-base">
              Nada de vueltas, nada de promesas vacías. Si lo tenés que cambiar, lo cambiamos.
              Si tenés dudas, te asesoramos por WhatsApp sin costo.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center rounded-md border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Contactanos
            </Link>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map(stat => (
              <div
                key={stat.label}
                className="rounded-xl bg-white/10 p-6 text-white"
              >
                <p className="font-display text-4xl font-medium">{stat.value}</p>
                <p className="mt-1 text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
