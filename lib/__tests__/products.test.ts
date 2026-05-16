import { describe, it, expect } from 'vitest'
import {
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
  getFeaturedProducts,
} from '../products'

describe('getAllProducts', () => {
  it('returns all 6 products', () => {
    expect(getAllProducts()).toHaveLength(6)
  })
  it('returns products with required fields', () => {
    getAllProducts().forEach(p => {
      expect(p).toHaveProperty('id')
      expect(p).toHaveProperty('slug')
      expect(p).toHaveProperty('price')
      expect(p).toHaveProperty('category')
    })
  })
})

describe('getProductBySlug', () => {
  it('finds product by slug', () => {
    const product = getProductBySlug('griferia-fv-arizona-monocomando')
    expect(product?.name).toBe('FV Arizona Monocomando Lavatorio')
  })
  it('returns undefined for unknown slug', () => {
    expect(getProductBySlug('no-existe')).toBeUndefined()
  })
})

describe('getProductsByCategory', () => {
  it('filters by category', () => {
    const griferias = getProductsByCategory('griferias')
    expect(griferias.length).toBeGreaterThan(0)
    griferias.forEach(p => expect(p.category).toBe('griferias'))
  })
  it('returns empty array for unknown category', () => {
    expect(getProductsByCategory('inexistente')).toHaveLength(0)
  })
})

describe('getFeaturedProducts', () => {
  it('returns only featured products', () => {
    const featured = getFeaturedProducts()
    featured.forEach(p => expect(p.featured).toBe(true))
  })
})
