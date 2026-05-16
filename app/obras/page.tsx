import Image from 'next/image'
import { Container } from '@/components/common/Container'

const OBRAS = [
  {
    title: 'Reforma baño principal — Caballito',
    description:
      'Renovación completa con griferías FV Arizona, bacha Ferrum Bari de apoyar y accesorios inox. Resultado: baño minimalista de alto impacto.',
    img: 'https://placehold.co/800x600/F8F7F4/0A4D8C/png?text=Obra+Caballito',
    tags: ['Griferías FV', 'Sanitarios Ferrum'],
  },
  {
    title: 'Cocina abierta — Palermo',
    description:
      'Instalación de grifería Peirano Tres monocomando con caño alto giratorio. Cliente eligió acabado cromo mate.',
    img: 'https://placehold.co/800x600/F8F7F4/0A4D8C/png?text=Obra+Palermo',
    tags: ['Griferías Peirano', 'Cocina'],
  },
  {
    title: 'Suite master — Pilar',
    description:
      'Columna de ducha termostática FV Allegro + receptáculo Ferrum 80x80. Obra de alta gama con asesoramiento completo.',
    img: 'https://placehold.co/800x600/F8F7F4/0A4D8C/png?text=Obra+Pilar',
    tags: ['FV Premium', 'Ducha completa'],
  },
]

export default function ObrasPage() {
  return (
    <div className="min-h-screen bg-white">
      <Container className="py-12">
        <div className="mb-10">
          <p className="text-[11px] font-medium uppercase tracking-[2px] text-accent mb-2">
            Casos reales
          </p>
          <h1 className="font-display text-4xl font-medium text-ink">Obras realizadas</h1>
          <p className="text-muted mt-3 max-w-xl">
            Reformas donde asesoramos desde la elección del producto hasta la instalación.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OBRAS.map(obra => (
            <article
              key={obra.title}
              className="rounded-xl overflow-hidden border border-border bg-white"
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
              <div className="p-5 space-y-3">
                <h2 className="font-medium text-ink">{obra.title}</h2>
                <p className="text-sm text-muted leading-relaxed">{obra.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {obra.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-full bg-bone px-2.5 py-0.5 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  )
}
