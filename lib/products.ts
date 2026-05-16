import productsData from '@/data/products.json'
import type { Product } from '@/types'

const products = productsData as Product[]

export function getAllProducts(): Product[] {
  return products
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

export function getPromoProducts(): Product[] {
  return products.filter(p => p.onPromo)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit)
}

export function getAllBrands(): string[] {
  return Array.from(new Set(products.map(p => p.brand))).sort()
}

export function getPriceRange(): { min: number; max: number } {
  const prices = products.map(p => p.price)
  return { min: Math.min(...prices), max: Math.max(...prices) }
}
