import { describe, it, expect } from 'vitest'
import { whatsappUrl, whatsappBaseUrl } from '../whatsapp'
import type { Product } from '@/types'

const mockProduct: Product = {
  id: '1',
  slug: 'test-product',
  name: 'FV Arizona Monocomando Lavatorio',
  brand: 'FV',
  sku: '0103/B1.CR',
  category: 'griferias',
  subcategory: 'lavatorio',
  price: 185000,
  priceCash: 166500,
  installments: { count: 3, amount: 61666 },
  images: [],
  description: 'Test',
  specs: [],
  inStock: true,
  featured: true,
  onPromo: false,
  tags: [],
}

describe('whatsappUrl', () => {
  it('includes the Báez phone number', () => {
    expect(whatsappUrl(mockProduct)).toContain('5491163658651')
  })
  it('includes the product name in the message', () => {
    expect(decodeURIComponent(whatsappUrl(mockProduct))).toContain('FV Arizona Monocomando Lavatorio')
  })
  it('includes the SKU', () => {
    expect(decodeURIComponent(whatsappUrl(mockProduct))).toContain('0103/B1.CR')
  })
  it('starts with wa.me URL', () => {
    expect(whatsappUrl(mockProduct)).toMatch(/^https:\/\/wa\.me\//)
  })
})

describe('whatsappBaseUrl', () => {
  it('returns base wa.me URL', () => {
    expect(whatsappBaseUrl()).toBe('https://wa.me/5491163658651')
  })
})
