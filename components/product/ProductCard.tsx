'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ProductActions } from './ProductActions'
import { hasDiscount, salePrice } from '@/lib/price'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onOpenAI: () => void
  isPremium?: boolean
}

export function ProductCard({ product, onOpenAI, isPremium = false }: ProductCardProps) {
  return (
    <motion.article
      className={`group relative flex flex-col bg-white overflow-hidden transition-shadow duration-300 hover:shadow-[0_12px_40px_-12px_rgba(10,77,140,0.25)] ${
        isPremium ? 'ring-1 ring-accent' : 'border border-border'
      }`}
    >
      <div className="absolute top-3 left-3 right-3 z-10 flex items-start justify-between">
        <div className="flex flex-col gap-1.5">
          {product.onPromo && product.discount ? (
            <span className="bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white leading-none">
              -{product.discount}%
            </span>
          ) : null}
          {!product.inStock && (
            <span className="bg-gray-700/90 px-2 py-1 text-[10px] font-medium text-white leading-none">
              Sin stock
            </span>
          )}
        </div>
        {isPremium && (
          <span className="bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white leading-none">
            Premium
          </span>
        )}
      </div>

      <Link
        href={`/productos/${product.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="relative aspect-[4/3] bg-white overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.07]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <span className="text-[10px] font-semibold uppercase tracking-[1.5px] text-accent">
          {product.brand}
        </span>
        <Link
          href={`/productos/${product.slug}`}
          className="mt-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <h2 className="text-sm font-medium text-ink leading-snug line-clamp-2 group-hover:text-primary transition-colors min-h-[2.5rem]">
            {product.name}
          </h2>
        </Link>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <p className="font-display text-2xl font-semibold tracking-tight text-ink">
              ${salePrice(product).toLocaleString('es-AR')}
            </p>
            {hasDiscount(product) && (
              <span className="text-sm text-muted line-through">
                ${product.price.toLocaleString('es-AR')}
              </span>
            )}
          </div>
          <p className="text-xs text-muted mt-1">
            Efectivo ${product.priceCash.toLocaleString('es-AR')} · {product.installments.count}× ${product.installments.amount.toLocaleString('es-AR')}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-border/70">
          <ProductActions product={product} onOpenAI={onOpenAI} variant="card" />
        </div>
      </div>
    </motion.article>
  )
}
