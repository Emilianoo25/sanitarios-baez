'use client'

import { useState } from 'react'
import { Sparkles, MessageCircle, ShoppingCart, Check } from 'lucide-react'
import { whatsappUrl } from '@/lib/whatsapp'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/types'

interface ProductActionsProps {
  product: Product
  onOpenAI: () => void
  variant?: 'card' | 'page'
}

export function ProductActions({ product, onOpenAI, variant = 'page' }: ProductActionsProps) {
  const [added, setAdded] = useState(false)
  const { addToCart, openCart } = useCart()

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    addToCart(product)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      openCart()
    }, 600)
  }

  if (variant === 'card') {
    return (
      <div className="flex flex-col gap-2 mt-3">
        <button
          onClick={handleAddToCart}
          className={`flex w-full items-center justify-center gap-2 rounded-none border-2 px-3 py-2 text-xs font-medium transition-colors ${
            added
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-primary text-primary hover:bg-primary hover:text-white'
          }`}
        >
          {added ? <><Check size={13} /> ¡Agregado!</> : <><ShoppingCart size={13} /> Agregar al carrito</>}
        </button>
        <a
          href={whatsappUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="flex w-full items-center justify-center gap-2 rounded-none bg-[#25D366] px-3 py-2 text-xs font-medium text-white hover:bg-[#1fba58] transition-colors"
        >
          <MessageCircle size={13} />
          Consultar por WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Add to cart */}
      <button
        onClick={handleAddToCart}
        className={`flex w-full items-center justify-center gap-2 rounded-md border-2 px-4 py-3.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          added
            ? 'border-green-500 bg-green-50 text-green-700'
            : 'border-primary text-primary hover:bg-primary hover:text-white'
        }`}
      >
        {added ? (
          <>
            <Check size={16} />
            ¡Agregado al carrito!
          </>
        ) : (
          <>
            <ShoppingCart size={16} />
            Agregar al carrito
          </>
        )}
      </button>

      {/* WhatsApp */}
      <a
        href={whatsappUrl(product)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-3 text-sm font-medium text-white hover:bg-[#1fba58] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
      >
        <MessageCircle size={16} />
        Consultar por WhatsApp con Báez
      </a>

      {/* AI */}
      <button
        onClick={onOpenAI}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Sparkles size={15} />
        Asistente virtual
        <span className="ml-0.5 rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white leading-none">
          Nuevo
        </span>
      </button>
    </div>
  )
}
