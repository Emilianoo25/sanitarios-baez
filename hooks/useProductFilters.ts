'use client'

import { useState, useMemo } from 'react'
import type { Product, ProductCategory } from '@/types'

export interface FilterState {
  categories: ProductCategory[]
  brands: string[]
  priceMax: number
  inStockOnly: boolean
  sortBy: 'featured' | 'price-asc' | 'price-desc'
}

export function useProductFilters(allProducts: Product[]) {
  const globalMax = useMemo(
    () => (allProducts.length ? Math.max(...allProducts.map(p => p.price)) : 0),
    [allProducts]
  )

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceMax: globalMax,
    inStockOnly: false,
    sortBy: 'featured',
  })

  const filtered = useMemo(() => {
    let result = allProducts

    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category))
    }
    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand))
    }
    result = result.filter(p => p.price <= filters.priceMax)
    if (filters.inStockOnly) {
      result = result.filter(p => p.inStock)
    }

    if (filters.sortBy === 'price-asc') return [...result].sort((a, b) => a.price - b.price)
    if (filters.sortBy === 'price-desc') return [...result].sort((a, b) => b.price - a.price)
    return result
  }, [allProducts, filters])

  function toggleCategory(cat: ProductCategory) {
    setFilters(f => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter(c => c !== cat)
        : [...f.categories, cat],
    }))
  }

  function toggleBrand(brand: string) {
    setFilters(f => ({
      ...f,
      brands: f.brands.includes(brand)
        ? f.brands.filter(b => b !== brand)
        : [...f.brands, brand],
    }))
  }

  function removeFilter(type: 'category' | 'brand', value: string) {
    if (type === 'category') {
      setFilters(f => ({ ...f, categories: f.categories.filter(c => c !== value) }))
    } else {
      setFilters(f => ({ ...f, brands: f.brands.filter(b => b !== value) }))
    }
  }

  function resetFilters() {
    setFilters({
      categories: [],
      brands: [],
      priceMax: globalMax,
      inStockOnly: false,
      sortBy: 'featured',
    })
  }

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.priceMax < globalMax ? 1 : 0)

  return {
    filters,
    filtered,
    toggleCategory,
    toggleBrand,
    removeFilter,
    resetFilters,
    activeCount,
    globalMax,
    setFilters,
  }
}
