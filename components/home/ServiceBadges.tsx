'use client'

import { Truck, CreditCard, Percent, Sparkles } from 'lucide-react'
import { Container } from '@/components/common/Container'

const BADGES = [
  { icon: Truck, title: 'Envío en el día', description: 'CABA y GBA' },
  { icon: CreditCard, title: '3 cuotas sin interés', description: 'con Mercado Pago' },
  { icon: Percent, title: '10% off', description: 'pagando con transferencia' },
  { icon: Sparkles, title: 'Asistente IA', description: 'asesoramiento al instante' },
]

export function ServiceBadges() {
  return (
    <section className="border-y border-border bg-white">
      <Container>
        <div className="grid grid-cols-2 divide-x divide-border lg:grid-cols-4">
          {BADGES.map((badge, i) => {
            const Icon = badge.icon
            return (
              <div
                key={badge.title}
                className={`flex items-center gap-3.5 px-5 py-6 ${i >= 2 ? 'border-t border-border lg:border-t-0' : ''}`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary/10 text-primary">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink leading-tight">{badge.title}</p>
                  <p className="mt-0.5 text-xs text-muted leading-tight">{badge.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
