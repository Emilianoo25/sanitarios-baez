'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { salePrice } from '@/lib/price'
import type { Product } from '@/types'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartCtx {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, qty: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartCtx>({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
  openCart: () => {},
  closeCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem('baez-cart')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    if (mounted) localStorage.setItem('baez-cart', JSON.stringify(items))
  }, [items, mounted])

  function openCart() { setIsOpen(true) }
  function closeCart() { setIsOpen(false) }

  function addToCart(product: Product) {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  function removeFromCart(productId: string) {
    setItems(prev => prev.filter(i => i.product.id !== productId))
  }

  function updateQuantity(productId: string, qty: number) {
    if (qty < 1) return removeFromCart(productId)
    setItems(prev =>
      prev.map(i => (i.product.id === productId ? { ...i, quantity: qty } : i))
    )
  }

  function clearCart() {
    setItems([])
  }

  const totalItems = items.reduce((s, i) => s + i.quantity, 0)
  const totalPrice = items.reduce((s, i) => s + salePrice(i.product) * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, totalItems, totalPrice, isOpen, openCart, closeCart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
