'use client'

import { Truck, CreditCard, Percent, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'

const BADGES = [
  { icon: Truck, title: 'Envío en el día', description: 'CABA y GBA' },
  { icon: CreditCard, title: '3 cuotas sin interés', description: 'con Mercado Pago' },
  { icon: Percent, title: '10% off', description: 'pagando con transferencia' },
  { icon: Sparkles, title: 'Asistente IA 24/7', description: 'próximamente' },
]

export function ServiceBadges() {
  return (
    <Section className="bg-primary">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {BADGES.map((badge, i) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <Icon size={28} className="text-white/80" aria-hidden="true" />
                <div>
                  <p className="font-medium text-white text-sm">{badge.title}</p>
                  <p className="text-white/60 text-xs mt-0.5">{badge.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
