export interface ProductSpec {
  key: string
  value: string
}

export interface ProductInstallments {
  count: number
  amount: number
}

export type ProductCategory = 'griferias' | 'sanitarios' | 'bachas' | 'duchas'

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  sku: string
  category: ProductCategory
  subcategory: string
  price: number
  priceCash: number
  installments: ProductInstallments
  images: string[]
  description: string
  specs: ProductSpec[]
  inStock: boolean
  featured: boolean
  onPromo: boolean
  discount?: number
  tags: string[]
}
