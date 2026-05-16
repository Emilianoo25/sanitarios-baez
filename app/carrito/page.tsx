'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Container } from '@/components/common/Container'

export default function CarritoPage() {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Container className="py-20 text-center">
          <ShoppingBag size={56} className="mx-auto text-gray-200 mb-6" />
          <h1 className="font-display text-2xl font-medium text-ink mb-2">Tu carrito está vacío</h1>
          <p className="text-sm text-gray-500 mb-8">Explorá nuestro catálogo y agregá los productos que necesitás.</p>
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
          >
            Ver catálogo
            <ArrowRight size={15} />
          </Link>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-display text-3xl font-medium text-ink">
            Carrito <span className="text-lg text-gray-400 font-normal">({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
          </h1>
          <button onClick={clearCart} className="text-xs text-gray-400 hover:text-red-500 transition-colors">
            Vaciar carrito
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
          {/* Items */}
          <div className="divide-y divide-border">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 py-5">
                <Link href={`/productos/${product.slug}`} className="shrink-0">
                  <div className="relative h-24 w-24 bg-bone border border-border overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col gap-1 min-w-0">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">{product.brand}</span>
                  <Link href={`/productos/${product.slug}`} className="text-sm font-medium text-ink hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </Link>
                  <p className="text-xs text-gray-400">SKU: {product.sku}</p>
                  <div className="mt-auto flex items-center justify-between">
                    {/* Qty controls */}
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors"
                        aria-label="Reducir cantidad"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="px-3 text-sm font-medium min-w-[2rem] text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-display text-base font-medium text-primary">
                        ${(product.price * quantity).toLocaleString('es-AR')}
                      </p>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="border border-border p-6 space-y-4">
              <h2 className="font-display text-lg font-medium text-ink">Resumen del pedido</h2>
              <div className="space-y-2 text-sm">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-gray-500">
                    <span className="truncate mr-2">{product.name} × {quantity}</span>
                    <span className="shrink-0">${(product.price * quantity).toLocaleString('es-AR')}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 flex justify-between font-medium text-ink">
                <span>Subtotal</span>
                <span className="font-display text-lg">${totalPrice.toLocaleString('es-AR')}</span>
              </div>
              <p className="text-xs text-gray-400">Envío calculado en el siguiente paso.</p>
              <Link
                href="/checkout"
                className="flex w-full items-center justify-center gap-2 bg-accent py-3.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
              >
                Proceder al pago
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/productos"
                className="flex w-full items-center justify-center text-sm text-gray-500 hover:text-primary transition-colors py-2"
              >
                ← Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
