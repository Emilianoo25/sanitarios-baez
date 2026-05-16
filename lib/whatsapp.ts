import type { Product } from '@/types'

const BAEZ_PHONE = '5491163658651'

export function whatsappUrl(product: Product): string {
  const message = `Hola Báez! Te consulto por: ${product.name}
SKU: ${product.sku}
Precio publicado: $${product.price.toLocaleString('es-AR')}

¿Tenés stock disponible?`

  return `https://wa.me/${BAEZ_PHONE}?text=${encodeURIComponent(message)}`
}

export function whatsappBaseUrl(): string {
  return `https://wa.me/${BAEZ_PHONE}`
}
