import productsData from '@/data/products.json'
import type { Product } from '@/types'

// Catálogo con overlay comercial desde Airtable: products.json es dueño de lo
// estructural (nombre, fotos, specs) y Airtable de lo comercial (precio,
// descuento, promo, stock, destacado), cruzados por SKU. Si Airtable no está
// configurado o falla, se usa products.json tal cual (fallback).
const base = productsData as Product[]

interface AirtableRecord {
  fields: Record<string, unknown>
}

async function fetchOverlay(): Promise<Map<string, Partial<Product>>> {
  const token = process.env.AIRTABLE_TOKEN
  const baseId = process.env.AIRTABLE_BASE_ID
  const table = process.env.AIRTABLE_TABLE || 'Productos'
  const overlay = new Map<string, Partial<Product>>()
  if (!token || !baseId) return overlay

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}?pageSize=100`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 120 },
      }
    )
    if (!res.ok) {
      console.error('[catalog] Airtable respondió', res.status)
      return overlay
    }
    const data = (await res.json()) as { records: AirtableRecord[] }
    for (const r of data.records) {
      const f = r.fields
      const sku = typeof f.SKU === 'string' ? f.SKU : null
      if (!sku) continue
      const disc = typeof f['Descuento %'] === 'number' ? (f['Descuento %'] as number) : 0
      overlay.set(sku, {
        price: typeof f.Precio === 'number' ? (f.Precio as number) : undefined,
        priceCash: typeof f['Precio contado'] === 'number' ? (f['Precio contado'] as number) : undefined,
        discount: disc > 0 ? disc : undefined,
        onPromo: f['En promo'] === true,
        inStock: f['Stock'] === true,
        featured: f['Destacado'] === true,
      })
    }
  } catch (e) {
    console.error('[catalog] Falló el fetch a Airtable', e)
  }
  return overlay
}

/** Catálogo completo con precios/descuentos/stock actualizados desde Airtable. */
export async function getCatalog(): Promise<Product[]> {
  const overlay = await fetchOverlay()
  if (overlay.size === 0) return base

  return base.map(p => {
    const o = overlay.get(p.sku)
    if (!o) return p
    const price = o.price ?? p.price
    return {
      ...p,
      price,
      priceCash: o.priceCash ?? p.priceCash,
      discount: o.discount,
      onPromo: o.onPromo ?? p.onPromo,
      inStock: o.inStock ?? p.inStock,
      featured: o.featured ?? p.featured,
      installments: {
        count: p.installments.count,
        amount: Math.round(price / p.installments.count),
      },
    }
  })
}

export async function getCatalogProduct(slug: string): Promise<Product | undefined> {
  return (await getCatalog()).find(p => p.slug === slug)
}
