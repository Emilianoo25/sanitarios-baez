import type { Product } from '@/types'

/** True si el producto tiene un descuento activo. */
export function hasDiscount(p: Product): boolean {
  return !!(p.onPromo && p.discount && p.discount > 0)
}

/** Precio efectivo de venta: aplica el descuento sobre el precio de lista si está en promo. */
export function salePrice(p: Product): number {
  return hasDiscount(p) ? Math.round(p.price * (1 - (p.discount as number) / 100)) : p.price
}
