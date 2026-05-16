'use client'

import { Sparkles, MessageCircle } from 'lucide-react'
import { whatsappUrl } from '@/lib/whatsapp'
import type { Product } from '@/types'

interface ProductActionsProps {
  product: Product
  onOpenAI: () => void
  variant?: 'card' | 'page'
}

export function ProductActions({ product, onOpenAI, variant = 'page' }: ProductActionsProps) {
  if (variant === 'card') {
    return (
      <div className="flex flex-col gap-2 mt-3">
        <button
          onClick={e => {
            e.preventDefault()
            onOpenAI()
          }}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-primary px-3 py-2 text-xs font-medium text-primary hover:bg-primary hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Sparkles size={14} />
          Consultar con asistente IA
        </button>
        <a
          href={whatsappUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-3 py-2 text-xs font-medium text-white hover:bg-[#1fba58] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
        >
          <MessageCircle size={14} />
          Consultar por WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={onOpenAI}
        className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-primary px-4 py-3.5 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Sparkles size={16} />
        Consultar con asistente IA
      </button>
      <a
        href={whatsappUrl(product)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-3.5 text-sm font-medium text-white hover:bg-[#1fba58] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
      >
        <MessageCircle size={16} />
        Consultar por WhatsApp con Báez
      </a>
    </div>
  )
}
