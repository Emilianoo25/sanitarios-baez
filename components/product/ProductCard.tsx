'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ProductActions } from './ProductActions'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onOpenAI: () => void
  isPremium?: boolean
}

export function ProductCard({ product, onOpenAI, isPremium = false }: ProductCardProps) {
  return (
    <motion.article
      className={`group relative flex flex-col bg-white overflow-hidden ${
        isPremium ? 'ring-2 ring-accent' : 'border border-border'
      }`}
    >
      {isPremium && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-accent px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white">
            Premium
          </span>
        </div>
      )}
      {!product.inStock && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-gray-600/80 px-2.5 py-0.5 text-[10px] font-medium text-white">
            Sin stock
          </span>
        </div>
      )}

      <Link
        href={`/productos/${product.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="relative aspect-square bg-bone overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-4">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
          {product.brand}
        </span>
        <Link
          href={`/productos/${product.slug}`}
          className="mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          <h2 className="text-sm font-medium text-ink leading-snug line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h2>
        </Link>

        <div className="mt-3">
          <p className="text-lg font-display font-medium text-primary">
            ${product.price.toLocaleString('es-AR')}
          </p>
          <p className="text-xs text-muted mt-0.5">
            Efectivo: ${product.priceCash.toLocaleString('es-AR')} · {product.installments.count}x ${product.installments.amount.toLocaleString('es-AR')}
          </p>
        </div>

        <div className="mt-auto">
          <ProductActions product={product} onOpenAI={onOpenAI} variant="card" />
        </div>
      </div>
    </motion.article>
  )
}
