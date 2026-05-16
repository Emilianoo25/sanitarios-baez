'use client'

import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export function CartDrawer() {
  const { items, totalPrice, totalItems, isOpen, closeCart, removeFromCart, updateQuantity } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!mounted) return null

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-display text-lg font-medium text-ink">
            Carrito <span className="text-sm text-gray-400 font-sans font-normal">({totalItems})</span>
          </h2>
          <button onClick={closeCart} className="p-1 text-gray-400 hover:text-ink transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <ShoppingBag size={48} className="text-gray-200" />
              <p className="text-sm text-gray-400">Tu carrito está vacío</p>
              <button
                onClick={closeCart}
                className="text-sm text-primary underline"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 py-4">
                  <div className="relative h-20 w-20 shrink-0 bg-bone border border-border overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1 min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">{product.brand}</p>
                    <p className="text-xs font-medium text-ink line-clamp-2 leading-snug">{product.name}</p>
                    <p className="text-sm font-medium text-primary mt-auto">
                      ${(product.price * quantity).toLocaleString('es-AR')}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2 py-1 hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-2.5 text-xs font-medium min-w-[1.5rem] text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-5 py-5 space-y-3">
            <div className="flex justify-between text-sm font-medium text-ink">
              <span>Subtotal</span>
              <span className="font-display text-base">${totalPrice.toLocaleString('es-AR')}</span>
            </div>
            <p className="text-xs text-gray-400">Envío calculado en el siguiente paso.</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex w-full items-center justify-center gap-2 bg-accent py-3.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
            >
              Finalizar compra
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </>,
    document.body
  )
}
