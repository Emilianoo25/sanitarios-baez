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
    if (!product.inStock) return
    addToCart(product)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      openCart()
    }, 600)
  }

  if (variant === 'card') {
    return (
      <div className="flex flex-col gap-2.5">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`flex w-full items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold tracking-wide transition-colors ${
            !product.inStock
              ? 'cursor-not-allowed bg-gray-200 text-gray-400'
              : added
                ? 'bg-green-600 text-white'
                : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          {!product.inStock
            ? 'Sin stock'
            : added ? <><Check size={14} /> ¡Agregado!</> : <><ShoppingCart size={14} /> Agregar al carrito</>}
        </button>
        <div className="flex items-center justify-center gap-4 text-[11px] font-medium">
          <a
            href={whatsappUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-1 text-[#1fa855] hover:text-[#157d40] transition-colors"
          >
            <MessageCircle size={13} /> WhatsApp
          </a>
          <span className="h-3 w-px bg-border" />
          <button
            onClick={e => { e.preventDefault(); onOpenAI() }}
            className="flex items-center gap-1 text-primary hover:text-primary-dark transition-colors"
          >
            <Sparkles size={13} /> Asistente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Add to cart */}
      <button
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className={`flex w-full items-center justify-center gap-2 rounded-md border-2 px-4 py-3.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          !product.inStock
            ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
            : added
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-primary text-primary hover:bg-primary hover:text-white'
        }`}
      >
        {!product.inStock ? (
          'Sin stock disponible'
        ) : added ? (
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
        Consultar por WhatsApp
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
