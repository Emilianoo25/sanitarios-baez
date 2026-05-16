# Sanitarios Báez — E-commerce Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir demo navegable de e-commerce premium para Sanitarios Báez lista para presentar al cliente.

**Architecture:** Enfoque A — data layer primero. Todo acceso a datos pasa por `lib/products.ts` (ahora lee JSON, en v1 swapea a Sanity sin tocar componentes). Next.js 14 App Router con TypeScript estricto, Tailwind 3.4 + shadcn/ui, Framer Motion para animaciones sutiles.

**Tech Stack:** Next.js 14, TypeScript strict, Tailwind CSS 3.4, shadcn/ui, Framer Motion, Lucide React, Vitest + RTL

**Working directory:** `C:\Users\Emiliano\Desktop\Portafolio\sanitarios baez`

---

## Phase 1: Project Setup

### Task 1: Scaffold Next.js 14 project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`

- [ ] **Step 1: Scaffold desde la carpeta del proyecto**

```bash
cd "C:\Users\Emiliano\Desktop\Portafolio\sanitarios baez"
npx create-next-app@14 . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --eslint
```

Cuando pregunte si quiere sobreescribir `docs/`, decir **No**.

- [ ] **Step 2: Verificar que levanta**

```bash
npm run dev
```

Esperado: servidor en `http://localhost:3000` sin errores.

- [ ] **Step 3: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 14 App Router"
```

---

### Task 2: Instalar dependencias adicionales

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Instalar deps de producción**

```bash
npm install framer-motion lucide-react
```

- [ ] **Step 2: Instalar shadcn/ui**

```bash
npx shadcn@latest init
```

Opciones al prompt:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**

- [ ] **Step 3: Instalar componentes shadcn necesarios**

```bash
npx shadcn@latest add button badge dialog separator accordion sheet slider checkbox
```

- [ ] **Step 4: Instalar Vitest + RTL**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @types/testing-library__jest-dom
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: install framer-motion, lucide, shadcn/ui, vitest"
```

---

### Task 3: Configurar Tailwind con design tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Reemplazar `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A4D8C',
          light: '#1E6BAD',
          dark: '#073661',
        },
        accent: {
          DEFAULT: '#FF6B35',
          hover: '#E55520',
        },
        bone: '#F8F7F4',
        ink: '#1A1A1A',
        muted: '#5A6B7D',
        border: { DEFAULT: '#E8E8E8' },
        success: '#16A34A',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Verificar build sin errores**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "chore: configure Tailwind design tokens"
```

---

### Task 4: Configurar Vitest

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`

- [ ] **Step 1: Crear `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

- [ ] **Step 2: Crear `vitest.setup.ts`**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 3: Agregar script en `package.json`**

En la sección `scripts`, agregar:
```json
"test": "vitest",
"test:run": "vitest run"
```

- [ ] **Step 4: Verificar que Vitest inicia**

```bash
npm run test:run
```

Esperado: "No test files found" (sin error).

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts vitest.setup.ts package.json
git commit -m "chore: configure Vitest + RTL"
```

---

### Task 5: Configurar fuentes y root layout

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Reemplazar `app/layout.tsx`**

```typescript
import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK'],
})

export const metadata: Metadata = {
  title: 'Sanitarios Báez — Griferías y Sanitarios Premium',
  description: 'FV, Ferrum, Peirano. Asesoramiento sin vueltas. Envío en el día CABA y GBA.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${fraunces.variable} font-sans bg-white text-ink antialiased`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded">
          Ir al contenido principal
        </a>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Limpiar `app/globals.css`** — dejar solo:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-white text-ink;
  }
}
```

- [ ] **Step 3: Verificar en browser**

```bash
npm run dev
```

Abrir `http://localhost:3000`. Las fuentes Fraunces e Inter deben cargar sin FOUT.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: setup Fraunces + Inter fonts, root layout, skip link"
```

---

## Phase 2: Data Layer

### Task 6: Tipos TypeScript para Product

**Files:**
- Create: `types/product.ts`
- Create: `types/index.ts`

- [ ] **Step 1: Crear `types/product.ts`**

```typescript
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
  tags: string[]
}
```

- [ ] **Step 2: Crear `types/index.ts`**

```typescript
export type { Product, ProductSpec, ProductInstallments, ProductCategory } from './product'
```

- [ ] **Step 3: Commit**

```bash
git add types/
git commit -m "feat: add Product TypeScript types"
```

---

### Task 7: Datos de productos (products.json)

**Files:**
- Create: `data/products.json`

- [ ] **Step 1: Crear `data/products.json`** con los 6 productos del spec:

```json
[
  {
    "id": "1",
    "slug": "griferia-fv-arizona-monocomando",
    "name": "FV Arizona Monocomando Lavatorio",
    "brand": "FV",
    "sku": "0103/B1.CR",
    "category": "griferias",
    "subcategory": "lavatorio",
    "price": 185000,
    "priceCash": 166500,
    "installments": { "count": 3, "amount": 61666 },
    "images": ["https://placehold.co/800x800/F8F7F4/0A4D8C/png?text=FV+Arizona"],
    "description": "Grifería monocomando para lavatorio con cartucho cerámico de 35mm. Acabado cromo de alta resistencia. Garantía oficial FV.",
    "specs": [
      { "key": "Tipo", "value": "Monocomando" },
      { "key": "Acabado", "value": "Cromo" },
      { "key": "Garantía", "value": "5 años" }
    ],
    "inStock": true,
    "featured": true,
    "tags": ["bestseller", "fv-clasico"]
  },
  {
    "id": "2",
    "slug": "ferrum-andina-inodoro-deposito",
    "name": "Ferrum Andina Inodoro con Depósito",
    "brand": "Ferrum",
    "sku": "IAB-D",
    "category": "sanitarios",
    "subcategory": "inodoros",
    "price": 245000,
    "priceCash": 220500,
    "installments": { "count": 3, "amount": 81666 },
    "images": ["https://placehold.co/800x800/F8F7F4/0A4D8C/png?text=Ferrum+Andina"],
    "description": "Inodoro largo con depósito dual flush. Diseño moderno con líneas limpias. Incluye tornillería de fijación.",
    "specs": [
      { "key": "Tipo", "value": "Largo con depósito" },
      { "key": "Sistema", "value": "Dual flush 3/6L" },
      { "key": "Color", "value": "Blanco" }
    ],
    "inStock": true,
    "featured": true,
    "tags": ["combo-bano"]
  },
  {
    "id": "3",
    "slug": "ferrum-bari-bacha-redonda",
    "name": "Ferrum Bari Bacha Redonda de Apoyar",
    "brand": "Ferrum",
    "sku": "BSB",
    "category": "bachas",
    "subcategory": "de-apoyar",
    "price": 115000,
    "priceCash": 103500,
    "installments": { "count": 3, "amount": 38333 },
    "images": ["https://placehold.co/800x800/F8F7F4/0A4D8C/png?text=Bacha+Bari"],
    "description": "Bacha redonda de apoyar en porcelana blanca. Diseño minimalista ideal para baños modernos.",
    "specs": [
      { "key": "Material", "value": "Porcelana" },
      { "key": "Diámetro", "value": "42cm" },
      { "key": "Tipo", "value": "De apoyar" }
    ],
    "inStock": true,
    "featured": true,
    "tags": ["moderno"]
  },
  {
    "id": "4",
    "slug": "peirano-tres-griferia-cocina",
    "name": "Peirano Tres Monocomando Cocina",
    "brand": "Peirano",
    "sku": "70-130",
    "category": "griferias",
    "subcategory": "cocina",
    "price": 155000,
    "priceCash": 139500,
    "installments": { "count": 3, "amount": 51666 },
    "images": ["https://placehold.co/800x800/F8F7F4/0A4D8C/png?text=Peirano+Tres"],
    "description": "Grifería monocomando para cocina con caño alto giratorio. Excelente caudal y durabilidad.",
    "specs": [
      { "key": "Tipo", "value": "Monocomando" },
      { "key": "Acabado", "value": "Cromo" },
      { "key": "Caño", "value": "Alto giratorio" }
    ],
    "inStock": true,
    "featured": true,
    "tags": ["cocina"]
  },
  {
    "id": "5",
    "slug": "ferrum-receptaculo-ducha-80x80",
    "name": "Ferrum Receptáculo de Ducha 80x80cm",
    "brand": "Ferrum",
    "sku": "RDB80",
    "category": "duchas",
    "subcategory": "receptaculos",
    "price": 385000,
    "priceCash": 346500,
    "installments": { "count": 3, "amount": 128333 },
    "images": ["https://placehold.co/800x800/F8F7F4/0A4D8C/png?text=Receptaculo+80x80"],
    "description": "Receptáculo de ducha en porcelana esmaltada. Antideslizante. Medidas 80x80cm.",
    "specs": [
      { "key": "Medidas", "value": "80x80cm" },
      { "key": "Material", "value": "Porcelana" },
      { "key": "Acabado", "value": "Antideslizante" }
    ],
    "inStock": true,
    "featured": true,
    "tags": ["ducha"]
  },
  {
    "id": "6",
    "slug": "fv-allegro-columna-ducha-termostatica",
    "name": "FV Allegro Columna de Ducha Termostática",
    "brand": "FV",
    "sku": "0310/B1.CR",
    "category": "griferias",
    "subcategory": "duchas",
    "price": 425000,
    "priceCash": 382500,
    "installments": { "count": 3, "amount": 141666 },
    "images": ["https://placehold.co/800x800/F8F7F4/0A4D8C/png?text=FV+Allegro"],
    "description": "Columna de ducha con válvula termostática. Mantiene temperatura constante. Incluye ducha de mano y rociador superior.",
    "specs": [
      { "key": "Tipo", "value": "Termostática" },
      { "key": "Incluye", "value": "Ducha de mano + rociador" },
      { "key": "Garantía", "value": "5 años" }
    ],
    "inStock": true,
    "featured": true,
    "tags": ["premium", "lujo"]
  }
]
```

- [ ] **Step 2: Commit**

```bash
git add data/products.json
git commit -m "feat: add products demo data"
```

---

### Task 8: Data access layer (lib/products.ts)

**Files:**
- Create: `lib/products.ts`
- Create: `lib/__tests__/products.test.ts`

- [ ] **Step 1: Escribir el test primero**

Crear `lib/__tests__/products.test.ts`:

```typescript
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
    const products = getAllProducts()
    products.forEach(p => {
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
```

- [ ] **Step 2: Correr test — debe fallar**

```bash
npm run test:run
```

Esperado: error "Cannot find module '../products'".

- [ ] **Step 3: Crear `lib/products.ts`**

```typescript
import productsData from '@/data/products.json'
import type { Product, ProductCategory } from '@/types'

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

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit)
}

export function getAllBrands(): string[] {
  return [...new Set(products.map(p => p.brand))].sort()
}

export function getPriceRange(): { min: number; max: number } {
  const prices = products.map(p => p.price)
  return { min: Math.min(...prices), max: Math.max(...prices) }
}
```

- [ ] **Step 4: Correr test — debe pasar**

```bash
npm run test:run
```

Esperado: todos los tests en verde.

- [ ] **Step 5: Commit**

```bash
git add lib/products.ts lib/__tests__/products.test.ts
git commit -m "feat: add products data access layer with tests"
```

---

### Task 9: WhatsApp URL helper (lib/whatsapp.ts)

**Files:**
- Create: `lib/whatsapp.ts`
- Create: `lib/__tests__/whatsapp.test.ts`

- [ ] **Step 1: Escribir test primero**

Crear `lib/__tests__/whatsapp.test.ts`:

```typescript
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
  tags: [],
}

describe('whatsappUrl', () => {
  it('includes the Báez phone number', () => {
    expect(whatsappUrl(mockProduct)).toContain('5491163658651')
  })
  it('includes the product name in the message', () => {
    const url = whatsappUrl(mockProduct)
    expect(decodeURIComponent(url)).toContain('FV Arizona Monocomando Lavatorio')
  })
  it('includes the SKU', () => {
    const url = whatsappUrl(mockProduct)
    expect(decodeURIComponent(url)).toContain('0103/B1.CR')
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
```

- [ ] **Step 2: Correr test — debe fallar**

```bash
npm run test:run
```

- [ ] **Step 3: Crear `lib/whatsapp.ts`**

```typescript
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
```

- [ ] **Step 4: Correr test — debe pasar**

```bash
npm run test:run
```

- [ ] **Step 5: Commit**

```bash
git add lib/whatsapp.ts lib/__tests__/whatsapp.test.ts
git commit -m "feat: add WhatsApp URL helper with tests"
```

---

## Phase 3: Layout Shell

### Task 10: BrandLogo component

**Files:**
- Create: `components/common/BrandLogo.tsx`

- [ ] **Step 1: Crear `components/common/BrandLogo.tsx`**

```typescript
import Link from 'next/link'

interface BrandLogoProps {
  className?: string
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className ?? ''}`} aria-label="Sanitarios Báez — Inicio">
      <svg width="42" height="42" viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M16 4 C 10 12, 6 18, 6 22 C 6 27, 10 30, 16 30 C 22 30, 26 27, 26 22 C 26 18, 22 12, 16 4 Z"
          fill="#0A4D8C"
        />
        <circle cx="13" cy="20" r="2.5" fill="#FFFFFF" opacity="0.4" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-[9px] tracking-[3px] text-muted font-medium uppercase">Sanitarios</span>
        <span className="font-display text-lg text-primary font-medium -tracking-[0.5px] mt-0.5">Baez</span>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/common/BrandLogo.tsx
git commit -m "feat: add BrandLogo component"
```

---

### Task 11: Container y Section components

**Files:**
- Create: `components/common/Container.tsx`
- Create: `components/common/Section.tsx`

- [ ] **Step 1: Crear `components/common/Container.tsx`**

```typescript
interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-container px-4 sm:px-8 lg:px-16 ${className ?? ''}`}>
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Crear `components/common/Section.tsx`**

```typescript
interface SectionProps {
  children: React.ReactNode
  className?: string
  as?: 'section' | 'div' | 'article'
}

export function Section({ children, className, as: Tag = 'section' }: SectionProps) {
  return (
    <Tag className={`py-12 md:py-16 lg:py-20 ${className ?? ''}`}>
      {children}
    </Tag>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/common/
git commit -m "feat: add Container and Section layout primitives"
```

---

### Task 12: Navbar (desktop + mobile trigger)

**Files:**
- Create: `components/layout/Navbar.tsx`

- [ ] **Step 1: Crear `components/layout/Navbar.tsx`**

```typescript
'use client'

import Link from 'next/link'
import { ShoppingCart, Search, Menu } from 'lucide-react'
import { BrandLogo } from '@/components/common/BrandLogo'
import { MobileMenu } from './MobileMenu'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Griferías', href: '/productos?categoria=griferias' },
  { label: 'Sanitarios', href: '/productos?categoria=sanitarios' },
  { label: 'Bachas', href: '/productos?categoria=bachas' },
  { label: 'Duchas', href: '/productos?categoria=duchas' },
  { label: 'Obras', href: '/obras' },
  { label: 'Contacto', href: '/contacto' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-white/95 backdrop-blur-sm">
        <nav className="mx-auto flex h-16 max-w-container items-center justify-between px-4 sm:px-8 lg:px-16" aria-label="Navegación principal">
          <BrandLogo />

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-6" role="list">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-ink hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Buscar"
              className="hidden sm:flex p-2 text-muted hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Search size={20} />
            </button>
            <button
              aria-label="Carrito (0 productos)"
              className="relative p-2 text-muted hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-white leading-none">
                0
              </span>
            </button>
            <Link
              href="/contacto"
              className="hidden sm:inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Consultar
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-ink hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={NAV_LINKS} />
    </>
  )
}
```

- [ ] **Step 2: Commit (provisional — MobileMenu se crea en Task 13)**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: add Navbar component"
```

---

### Task 13: MobileMenu (drawer Sheet)

**Files:**
- Create: `components/layout/MobileMenu.tsx`

- [ ] **Step 1: Crear `components/layout/MobileMenu.tsx`**

```typescript
'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { BrandLogo } from '@/components/common/BrandLogo'

interface NavLink {
  label: string
  href: string
}

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  links: NavLink[]
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <BrandLogo />
          <button
            onClick={onClose}
            className="p-2 text-muted hover:text-ink rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>
        <nav aria-label="Menú móvil">
          <ul className="px-4 py-6 space-y-1" role="list">
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center px-3 py-3 text-base font-medium text-ink hover:text-primary hover:bg-bone rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-6 py-4 border-t border-border">
          <Link
            href="/contacto"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
          >
            Consultar ahora
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
```

- [ ] **Step 2: Verificar en mobile (375px)**

```bash
npm run dev
```

Abrir DevTools → 375px. Verificar que el drawer abre y cierra correctamente, que el foco queda atrapado.

- [ ] **Step 3: Commit**

```bash
git add components/layout/MobileMenu.tsx
git commit -m "feat: add MobileMenu drawer component"
```

---

### Task 14: Footer

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Crear `components/layout/Footer.tsx`**

```typescript
import Link from 'next/link'
import { BrandLogo } from '@/components/common/BrandLogo'

const FOOTER_LINKS = {
  productos: [
    { label: 'Griferías', href: '/productos?categoria=griferias' },
    { label: 'Sanitarios', href: '/productos?categoria=sanitarios' },
    { label: 'Bachas', href: '/productos?categoria=bachas' },
    { label: 'Duchas', href: '/productos?categoria=duchas' },
  ],
  empresa: [
    { label: 'Obras realizadas', href: '/obras' },
    { label: 'Contacto', href: '/contacto' },
  ],
  legales: [
    { label: 'Política de privacidad', href: '#' },
    { label: 'Términos y condiciones', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-bone">
      <div className="mx-auto max-w-container px-4 sm:px-8 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <BrandLogo />
            <p className="text-sm text-muted leading-relaxed">
              Griferías y sanitarios premium para reformas que duran décadas. Villa Madero, Buenos Aires.
            </p>
            <div className="space-y-1 text-sm text-muted">
              <p>
                <a href="https://wa.me/5491163658651" className="hover:text-primary transition-colors">
                  +54 9 11 6365-8651
                </a>
              </p>
              <p>
                <a href="mailto:sanitariosbaezcorp@gmail.com" className="hover:text-primary transition-colors">
                  sanitariosbaezcorp@gmail.com
                </a>
              </p>
              <p>Villa Madero, Buenos Aires</p>
            </div>
          </div>

          {/* Productos */}
          <div>
            <h3 className="text-sm font-medium text-ink mb-4">Productos</h3>
            <ul className="space-y-2" role="list">
              {FOOTER_LINKS.productos.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-sm font-medium text-ink mb-4">Empresa</h3>
            <ul className="space-y-2" role="list">
              {FOOTER_LINKS.empresa.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legales */}
          <div>
            <h3 className="text-sm font-medium text-ink mb-4">Legales</h3>
            <ul className="space-y-2" role="list">
              {FOOTER_LINKS.legales.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted">© 2026 Sanitarios Báez. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Conectar Navbar + Footer al root layout**

Modificar `app/layout.tsx` para importar y usar `Navbar` y `Footer`:

```typescript
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

// En el body:
<body ...>
  <a href="#main" ...>Ir al contenido principal</a>
  <Navbar />
  <main id="main">{children}</main>
  <Footer />
</body>
```

- [ ] **Step 3: Verificar en browser**

```bash
npm run dev
```

Verificar: Navbar sticky, Footer visible, skip link funcional con Tab.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Footer.tsx app/layout.tsx
git commit -m "feat: add Footer, wire Navbar+Footer to root layout"
```

---

## Phase 4: Product Components

### Task 15: ProductActions (botones dobles)

**Files:**
- Create: `components/product/ProductActions.tsx`

- [ ] **Step 1: Crear `components/product/ProductActions.tsx`**

```typescript
'use client'

import { Sparkles, MessageCircle } from 'lucide-react'
import { whatsappUrl } from '@/lib/whatsapp'
import type { Product } from '@/types'

interface ProductActionsProps {
  product: Product
  onOpenAI: () => void
  variant?: 'card' | 'page'
}

export function ProductActions({ product, onOpenAI, variant = 'page' }: ProductActionsProps) {
  if (variant === 'card') {
    return (
      <div className="flex flex-col gap-2 mt-3">
        <button
          onClick={e => { e.preventDefault(); onOpenAI() }}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-primary px-3 py-2 text-xs font-medium text-primary hover:bg-primary hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Sparkles size={14} />
          Consultar con asistente IA
        </button>
        <a
          href={whatsappUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-3 py-2 text-xs font-medium text-white hover:bg-[#1fba58] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
        >
          <MessageCircle size={14} />
          Consultar por WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={onOpenAI}
        className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-primary px-4 py-3.5 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Sparkles size={16} />
        Consultar con asistente IA
      </button>
      <a
        href={whatsappUrl(product)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-3.5 text-sm font-medium text-white hover:bg-[#1fba58] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
      >
        <MessageCircle size={16} />
        Consultar por WhatsApp con Báez
      </a>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/product/ProductActions.tsx
git commit -m "feat: add dual CTA ProductActions component"
```

---

### Task 16: ProductCard

**Files:**
- Create: `components/product/ProductCard.tsx`

- [ ] **Step 1: Crear `components/product/ProductCard.tsx`**

```typescript
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProductActions } from './ProductActions'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onOpenAI: () => void
  isPremium?: boolean
}

export function ProductCard({ product, onOpenAI, isPremium = false }: ProductCardProps) {
  const [actionsVisible, setActionsVisible] = useState(false)

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`group relative flex flex-col rounded-xl bg-white overflow-hidden ${
        isPremium ? 'ring-2 ring-accent' : 'border border-border'
      }`}
      onMouseEnter={() => setActionsVisible(true)}
      onMouseLeave={() => setActionsVisible(false)}
    >
      {isPremium && (
        <div className="absolute top-3 right-3 z-10">
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white">
            Premium
          </span>
        </div>
      )}
      {!product.inStock && (
        <div className="absolute top-3 left-3 z-10">
          <span className="rounded-full bg-muted/80 px-2.5 py-0.5 text-[10px] font-medium text-white">
            Sin stock
          </span>
        </div>
      )}

      <Link href={`/productos/${product.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-t-xl">
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
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted">{product.brand}</span>
        <Link href={`/productos/${product.slug}`} className="mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
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

        {/* Mobile: always visible. Desktop: on hover */}
        <div className={`mt-auto sm:transition-all sm:duration-200 ${
          actionsVisible ? 'sm:opacity-100 sm:translate-y-0' : 'sm:opacity-0 sm:translate-y-2'
        }`}>
          <ProductActions product={product} onOpenAI={onOpenAI} variant="card" />
        </div>
      </div>
    </motion.article>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/product/ProductCard.tsx
git commit -m "feat: add ProductCard with hover actions and premium variant"
```

---

### Task 17: ProductGrid

**Files:**
- Create: `components/product/ProductGrid.tsx`

- [ ] **Step 1: Crear `components/product/ProductGrid.tsx`**

```typescript
import { ProductCard } from './ProductCard'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  onOpenAI: () => void
  premiumSlug?: string
}

export function ProductGrid({ products, onOpenAI, premiumSlug }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium text-ink">No se encontraron productos</p>
        <p className="text-sm text-muted mt-2">Probá con otros filtros</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onOpenAI={onOpenAI}
          isPremium={product.slug === premiumSlug}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/product/ProductGrid.tsx
git commit -m "feat: add ProductGrid responsive component"
```

---

### Task 18: ProductGallery

**Files:**
- Create: `components/product/ProductGallery.tsx`

- [ ] **Step 1: Crear `components/product/ProductGallery.tsx`**

```typescript
'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="space-y-3">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-bone">
        <Image
          src={images[activeIndex]}
          alt={`${productName} — imagen ${activeIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2" role="list" aria-label="Miniaturas de producto">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                i === activeIndex ? 'border-primary' : 'border-border hover:border-muted'
              }`}
              aria-label={`Ver imagen ${i + 1}`}
              aria-pressed={i === activeIndex}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/product/ProductGallery.tsx
git commit -m "feat: add ProductGallery with thumbnail switcher"
```

---

### Task 19: ProductSpecs (acordeón)

**Files:**
- Create: `components/product/ProductSpecs.tsx`

- [ ] **Step 1: Crear `components/product/ProductSpecs.tsx`**

```typescript
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { ProductSpec } from '@/types'

interface ProductSpecsProps {
  specs: ProductSpec[]
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <Accordion type="multiple" defaultValue={['specs']}>
      <AccordionItem value="specs">
        <AccordionTrigger className="text-sm font-medium">Especificaciones</AccordionTrigger>
        <AccordionContent>
          <dl className="divide-y divide-border">
            {specs.map(spec => (
              <div key={spec.key} className="flex justify-between py-2.5 text-sm">
                <dt className="text-muted">{spec.key}</dt>
                <dd className="font-medium text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="shipping">
        <AccordionTrigger className="text-sm font-medium">Envíos y devoluciones</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted leading-relaxed">
            Envío en el día para CABA y GBA. Coordinar entrega via WhatsApp. Devoluciones dentro de los 30 días con producto sin uso.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="warranty">
        <AccordionTrigger className="text-sm font-medium">Garantía</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted leading-relaxed">
            Garantía oficial del fabricante. Para griferías FV: 5 años. Para sanitarios Ferrum: 1 año. Consultar por WhatsApp para activar garantía.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/product/ProductSpecs.tsx
git commit -m "feat: add ProductSpecs accordion component"
```

---

## Phase 5: Filter System

### Task 20: FilterSidebar + FilterChips

**Files:**
- Create: `components/filters/FilterSidebar.tsx`
- Create: `components/filters/FilterChips.tsx`
- Create: `hooks/useProductFilters.ts`

- [ ] **Step 1: Crear `hooks/useProductFilters.ts`**

```typescript
'use client'

import { useState, useMemo } from 'react'
import { getAllProducts, getPriceRange } from '@/lib/products'
import type { Product, ProductCategory } from '@/types'

export interface FilterState {
  categories: ProductCategory[]
  brands: string[]
  priceMax: number
  inStockOnly: boolean
  sortBy: 'featured' | 'price-asc' | 'price-desc'
}

export function useProductFilters() {
  const allProducts = getAllProducts()
  const { max: globalMax } = getPriceRange()

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
    setFilters({ categories: [], brands: [], priceMax: globalMax, inStockOnly: false, sortBy: 'featured' })
  }

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.priceMax < globalMax ? 1 : 0)

  return { filters, filtered, toggleCategory, toggleBrand, removeFilter, resetFilters, activeCount, globalMax, setFilters }
}
```

- [ ] **Step 2: Crear `components/filters/FilterSidebar.tsx`**

```typescript
'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { getAllBrands } from '@/lib/products'
import type { FilterState, useProductFilters } from '@/hooks/useProductFilters'
import type { ProductCategory } from '@/types'

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'griferias', label: 'Griferías' },
  { value: 'sanitarios', label: 'Sanitarios' },
  { value: 'bachas', label: 'Bachas' },
  { value: 'duchas', label: 'Duchas' },
]

type FilterActions = ReturnType<typeof useProductFilters>

interface FilterSidebarProps {
  filters: FilterState
  globalMax: number
  onToggleCategory: FilterActions['toggleCategory']
  onToggleBrand: FilterActions['toggleBrand']
  onSetFilters: FilterActions['setFilters']
}

export function FilterSidebar({ filters, globalMax, onToggleCategory, onToggleBrand, onSetFilters }: FilterSidebarProps) {
  const brands = getAllBrands()

  return (
    <aside className="space-y-6" aria-label="Filtros de productos">
      {/* Categoría */}
      <div>
        <h3 className="text-sm font-medium text-ink mb-3">Categoría</h3>
        <ul className="space-y-2" role="list">
          {CATEGORIES.map(cat => (
            <li key={cat.value} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat.value}`}
                checked={filters.categories.includes(cat.value)}
                onCheckedChange={() => onToggleCategory(cat.value)}
              />
              <label htmlFor={`cat-${cat.value}`} className="text-sm text-ink cursor-pointer">
                {cat.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Marca */}
      <div>
        <h3 className="text-sm font-medium text-ink mb-3">Marca</h3>
        <ul className="space-y-2" role="list">
          {brands.map(brand => (
            <li key={brand} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => onToggleBrand(brand)}
              />
              <label htmlFor={`brand-${brand}`} className="text-sm text-ink cursor-pointer">
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Precio */}
      <div>
        <h3 className="text-sm font-medium text-ink mb-3">
          Precio máximo: ${filters.priceMax.toLocaleString('es-AR')}
        </h3>
        <Slider
          min={0}
          max={globalMax}
          step={5000}
          value={[filters.priceMax]}
          onValueChange={([val]) => onSetFilters(f => ({ ...f, priceMax: val }))}
          className="w-full"
          aria-label="Precio máximo"
        />
      </div>

      {/* Stock */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="in-stock"
          checked={filters.inStockOnly}
          onCheckedChange={v => onSetFilters(f => ({ ...f, inStockOnly: !!v }))}
        />
        <label htmlFor="in-stock" className="text-sm text-ink cursor-pointer">
          Solo en stock
        </label>
      </div>
    </aside>
  )
}
```

- [ ] **Step 3: Crear `components/filters/FilterChips.tsx`**

```typescript
'use client'

import { X } from 'lucide-react'
import type { FilterState } from '@/hooks/useProductFilters'

interface FilterChipsProps {
  filters: FilterState
  onRemove: (type: 'category' | 'brand', value: string) => void
  onReset: () => void
  activeCount: number
}

const CATEGORY_LABELS: Record<string, string> = {
  griferias: 'Griferías',
  sanitarios: 'Sanitarios',
  bachas: 'Bachas',
  duchas: 'Duchas',
}

export function FilterChips({ filters, onRemove, onReset, activeCount }: FilterChipsProps) {
  if (activeCount === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2" role="list" aria-label="Filtros activos">
      {filters.categories.map(cat => (
        <span key={cat} role="listitem" className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {CATEGORY_LABELS[cat]}
          <button onClick={() => onRemove('category', cat)} aria-label={`Quitar filtro ${CATEGORY_LABELS[cat]}`} className="ml-1 hover:text-primary-dark">
            <X size={12} />
          </button>
        </span>
      ))}
      {filters.brands.map(brand => (
        <span key={brand} role="listitem" className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {brand}
          <button onClick={() => onRemove('brand', brand)} aria-label={`Quitar filtro ${brand}`} className="ml-1 hover:text-primary-dark">
            <X size={12} />
          </button>
        </span>
      ))}
      <button onClick={onReset} className="text-xs text-muted underline hover:text-ink transition-colors">
        Limpiar filtros
      </button>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add hooks/useProductFilters.ts components/filters/
git commit -m "feat: add filter system with useProductFilters hook"
```

---

## Phase 6: AI Modal + Floating Buttons

### Task 21: AIModalPlaceholder + AIButton

**Files:**
- Create: `components/ai-assistant/AIModalPlaceholder.tsx`
- Create: `components/ai-assistant/AIButton.tsx`

- [ ] **Step 1: Crear `components/ai-assistant/AIModalPlaceholder.tsx`**

```typescript
'use client'

import { Sparkles, Check, MessageCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { whatsappBaseUrl } from '@/lib/whatsapp'

interface AIModalPlaceholderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CAPABILITIES = [
  'Responder consultas sobre productos al instante',
  'Recomendarte el combo ideal para tu reforma',
  'Analizar fotos de tu ambiente y sugerir productos',
  'Asesorarte 24/7 sobre marcas y especificaciones',
]

export function AIModalPlaceholder({ open, onOpenChange }: AIModalPlaceholderProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" size={22} />
            <DialogTitle className="font-display text-2xl font-medium">Asistente IA Báez</DialogTitle>
            <Badge className="bg-accent text-white border-0 text-[10px]">Próximamente</Badge>
          </div>
        </DialogHeader>

        <p className="text-sm text-muted mt-2">Nuestro asistente con inteligencia artificial te ayudará a:</p>

        <ul className="mt-4 space-y-3">
          {CAPABILITIES.map(cap => (
            <li key={cap} className="flex items-start gap-3">
              <Check size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm text-ink">{cap}</span>
            </li>
          ))}
        </ul>

        <Separator className="my-4" />

        <p className="text-sm text-muted">Mientras tanto, podés consultar directamente:</p>
        <a
          href={whatsappBaseUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-3 text-sm font-medium text-white hover:bg-[#1fba58] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
        >
          <MessageCircle size={16} />
          Hablar por WhatsApp con Báez
        </a>
      </DialogContent>
    </Dialog>
  )
}
```

- [ ] **Step 2: Crear `components/ai-assistant/AIButton.tsx`**

```typescript
'use client'

import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { AIModalPlaceholder } from './AIModalPlaceholder'

export function AIButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label="Abrir asistente IA"
      >
        <Sparkles size={22} />
      </motion.button>
      <AIModalPlaceholder open={open} onOpenChange={setOpen} />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ai-assistant/
git commit -m "feat: add AIModalPlaceholder and floating AIButton"
```

---

### Task 22: WhatsApp flotante

**Files:**
- Create: `components/whatsapp/WhatsAppButton.tsx`

- [ ] **Step 1: Crear `components/whatsapp/WhatsAppButton.tsx`**

```typescript
import { MessageCircle } from 'lucide-react'
import { whatsappBaseUrl } from '@/lib/whatsapp'

export function WhatsAppButton() {
  return (
    <a
      href={whatsappBaseUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1fba58] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={22} />
    </a>
  )
}
```

- [ ] **Step 2: Agregar AIButton + WhatsAppButton al root layout**

En `app/layout.tsx`, importar y agregar DENTRO del `<body>`, después del `<main>`:

```typescript
import { AIButton } from '@/components/ai-assistant/AIButton'
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton'

// En el body, después de </main>:
<AIButton />
<WhatsAppButton />
```

- [ ] **Step 3: Verificar en browser**

Ambos botones flotantes visibles. Modal abre con ESC para cerrar. Focus regresa al trigger.

- [ ] **Step 4: Commit**

```bash
git add components/whatsapp/WhatsAppButton.tsx app/layout.tsx
git commit -m "feat: add floating WhatsApp button, wire floating buttons to layout"
```

---

## Phase 7: Home Sections

### Task 23: Hero section

**Files:**
- Create: `components/home/Hero.tsx`

- [ ] **Step 1: Crear `components/home/Hero.tsx`**

```typescript
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/common/Container'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24" aria-label="Hero principal">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.p variants={item} className="text-[11px] font-medium uppercase tracking-[2px] text-accent">
              Diseñá tu baño ideal
            </motion.p>
            <motion.h1 variants={item} className="font-display text-4xl font-medium leading-tight text-ink sm:text-5xl lg:text-[52px]">
              Curaduría premium para reformas que duran décadas.
            </motion.h1>
            <motion.p variants={item} className="text-base text-muted leading-relaxed max-w-lg">
              FV, Ferrum, Roca, Peirano. Asesoramiento sin vueltas. Envío en el día CABA y GBA.
            </motion.p>
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/productos"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Ver catálogo
                <ArrowRight size={16} />
              </Link>
              <button
                className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-primary px-6 py-3.5 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Abrir asistente IA"
                onClick={() => document.querySelector<HTMLButtonElement>('[aria-label="Abrir asistente IA"]')?.click()}
              >
                <Sparkles size={16} />
                Asistente IA
                <Badge className="bg-accent text-white border-0 text-[9px] py-0 px-1.5">Nuevo</Badge>
              </button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="relative aspect-square w-full max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden bg-bone"
          >
            <Image
              src="https://placehold.co/800x800/F8F7F4/0A4D8C/png?text=Baño+Premium"
              alt="Ambiente de baño premium con griferías FV y sanitarios Ferrum"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 50vw"
              priority
            />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/Hero.tsx
git commit -m "feat: add Hero section with Framer Motion stagger animation"
```

---

### Task 24: Categories section

**Files:**
- Create: `components/home/Categories.tsx`

- [ ] **Step 1: Crear `components/home/Categories.tsx`**

```typescript
'use client'

import Link from 'next/link'
import { Droplets, LayoutGrid, Circle, Waves } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { getAllProducts } from '@/lib/products'

const CATEGORIES = [
  { slug: 'griferias', label: 'Griferías', icon: Droplets },
  { slug: 'sanitarios', label: 'Sanitarios', icon: LayoutGrid },
  { slug: 'bachas', label: 'Bachas', icon: Circle },
  { slug: 'duchas', label: 'Duchas', icon: Waves },
]

export function Categories() {
  const allProducts = getAllProducts()

  return (
    <Section className="bg-bone">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => {
            const count = allProducts.filter(p => p.category === cat.slug).length
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={`/productos?categoria=${cat.slug}`}
                  className="group flex flex-col items-center gap-4 rounded-xl bg-white p-6 text-center border border-border hover:border-primary hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon size={26} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-ink">{cat.label}</p>
                    <p className="text-xs text-muted mt-0.5">{count} {count === 1 ? 'producto' : 'productos'}</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/Categories.tsx
git commit -m "feat: add Categories section"
```

---

### Task 25: FeaturedProducts section

**Files:**
- Create: `components/home/FeaturedProducts.tsx`

- [ ] **Step 1: Crear `components/home/FeaturedProducts.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { getFeaturedProducts } from '@/lib/products'
import { ProductGrid } from '@/components/product/ProductGrid'
import { AIModalPlaceholder } from '@/components/ai-assistant/AIModalPlaceholder'
import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'

const PREMIUM_SLUG = 'fv-allegro-columna-ducha-termostatica'

export function FeaturedProducts() {
  const [aiOpen, setAiOpen] = useState(false)
  const featured = getFeaturedProducts()

  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <p className="text-[11px] font-medium uppercase tracking-[2px] text-accent mb-2">Selección del mes</p>
          <h2 className="font-display text-3xl font-medium text-ink">Productos destacados</h2>
        </motion.div>
        <ProductGrid products={featured} onOpenAI={() => setAiOpen(true)} premiumSlug={PREMIUM_SLUG} />
      </Container>
      <AIModalPlaceholder open={aiOpen} onOpenChange={setAiOpen} />
    </Section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/FeaturedProducts.tsx
git commit -m "feat: add FeaturedProducts section"
```

---

### Task 26: ServiceBadges section

**Files:**
- Create: `components/home/ServiceBadges.tsx`

- [ ] **Step 1: Crear `components/home/ServiceBadges.tsx`**

```typescript
'use client'

import { Truck, CreditCard, Percent, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'

const BADGES = [
  { icon: Truck, title: 'Envío en el día', description: 'CABA y GBA' },
  { icon: CreditCard, title: '3 cuotas sin interés', description: 'con Mercado Pago' },
  { icon: Percent, title: '10% off', description: 'pagando con transferencia' },
  { icon: Sparkles, title: 'Asistente IA 24/7', description: 'próximamente' },
]

export function ServiceBadges() {
  return (
    <Section className="bg-primary">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {BADGES.map((badge, i) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <Icon size={28} className="text-white/80" aria-hidden="true" />
                <div>
                  <p className="font-medium text-white text-sm">{badge.title}</p>
                  <p className="text-white/60 text-xs mt-0.5">{badge.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/ServiceBadges.tsx
git commit -m "feat: add ServiceBadges section"
```

---

### Task 27: ObrasPreview section

**Files:**
- Create: `components/home/ObrasPreview.tsx`

- [ ] **Step 1: Crear `components/home/ObrasPreview.tsx`**

```typescript
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'

const OBRAS_PREVIEW = [
  { title: 'Reforma baño principal', description: 'Griferías FV + Bacha Ferrum de apoyar', img: 'https://placehold.co/600x400/F8F7F4/0A4D8C/png?text=Obra+1' },
  { title: 'Cocina moderna', description: 'Grifería Peirano monocomando', img: 'https://placehold.co/600x400/F8F7F4/0A4D8C/png?text=Obra+2' },
  { title: 'Baño suite', description: 'Columna FV termostática + receptáculo Ferrum', img: 'https://placehold.co/600x400/F8F7F4/0A4D8C/png?text=Obra+3' },
]

export function ObrasPreview() {
  return (
    <Section className="bg-bone">
      <Container>
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[2px] text-accent mb-2">Casos reales</p>
            <h2 className="font-display text-3xl font-medium text-ink">Obras realizadas</h2>
          </div>
          <Link
            href="/obras"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Ver todas <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {OBRAS_PREVIEW.map((obra, i) => (
            <motion.article
              key={obra.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="overflow-hidden rounded-xl bg-white border border-border"
            >
              <div className="relative aspect-video">
                <Image src={obra.img} alt={obra.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-ink text-sm">{obra.title}</h3>
                <p className="text-xs text-muted mt-1">{obra.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link href="/obras" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
            Ver todas las obras
          </Link>
        </div>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/ObrasPreview.tsx
git commit -m "feat: add ObrasPreview section"
```

---

## Phase 8: Pages Assembly

### Task 28: Homepage (/)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Reemplazar `app/page.tsx`**

```typescript
import { Hero } from '@/components/home/Hero'
import { Categories } from '@/components/home/Categories'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { ServiceBadges } from '@/components/home/ServiceBadges'
import { ObrasPreview } from '@/components/home/ObrasPreview'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <ServiceBadges />
      <ObrasPreview />
    </>
  )
}
```

- [ ] **Step 2: Verificar la homepage completa en browser**

```bash
npm run dev
```

Verificar en 375px, 768px, 1280px. Todas las secciones visibles, animaciones funcionando.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble homepage"
```

---

### Task 29: Catálogo /productos

**Files:**
- Create: `app/productos/page.tsx`

- [ ] **Step 1: Crear `app/productos/page.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { FilterSidebar } from '@/components/filters/FilterSidebar'
import { FilterChips } from '@/components/filters/FilterChips'
import { ProductGrid } from '@/components/product/ProductGrid'
import { AIModalPlaceholder } from '@/components/ai-assistant/AIModalPlaceholder'
import { Container } from '@/components/common/Container'
import { useProductFilters } from '@/hooks/useProductFilters'
import { SlidersHorizontal } from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Destacados' },
  { value: 'price-asc', label: 'Menor precio' },
  { value: 'price-desc', label: 'Mayor precio' },
] as const

export default function ProductosPage() {
  const [aiOpen, setAiOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { filters, filtered, toggleCategory, toggleBrand, removeFilter, resetFilters, activeCount, globalMax, setFilters } = useProductFilters()

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-medium text-ink">Catálogo</h1>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(s => !s)}
              className="lg:hidden flex items-center gap-2 text-sm font-medium text-ink border border-border rounded-md px-3 py-2 hover:border-primary transition-colors"
            >
              <SlidersHorizontal size={16} /> Filtros {activeCount > 0 && `(${activeCount})`}
            </button>
            <p className="text-sm text-muted">
              Mostrando <span className="font-medium text-ink">{filtered.length}</span> productos
            </p>
          </div>
          <select
            value={filters.sortBy}
            onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value as typeof filters.sortBy }))}
            className="text-sm border border-border rounded-md px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Ordenar por"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Active chips */}
        <FilterChips filters={filters} onRemove={removeFilter} onReset={resetFilters} activeCount={activeCount} />

        <div className="mt-4 flex gap-8">
          {/* Sidebar desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              globalMax={globalMax}
              onToggleCategory={toggleCategory}
              onToggleBrand={toggleBrand}
              onSetFilters={setFilters}
            />
          </aside>

          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setSidebarOpen(false)}>
              <div className="absolute left-0 top-0 h-full w-72 bg-white p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
                <FilterSidebar
                  filters={filters}
                  globalMax={globalMax}
                  onToggleCategory={toggleCategory}
                  onToggleBrand={toggleBrand}
                  onSetFilters={setFilters}
                />
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="flex-1 min-w-0">
            <ProductGrid products={filtered} onOpenAI={() => setAiOpen(true)} />
          </div>
        </div>
      </Container>
      <AIModalPlaceholder open={aiOpen} onOpenChange={setAiOpen} />
    </div>
  )
}
```

- [ ] **Step 2: Verificar filtros**

```bash
npm run dev
```

Ir a `/productos`. Checkear filtros por categoría, marca, precio. Verificar que el contador "Mostrando X productos" actualiza en tiempo real.

- [ ] **Step 3: Commit**

```bash
git add app/productos/page.tsx
git commit -m "feat: add /productos catalog page with live filters"
```

---

### Task 30: Detalle de producto /productos/[slug]

**Files:**
- Create: `app/productos/[slug]/page.tsx`

- [ ] **Step 1: Crear `app/productos/[slug]/page.tsx`**

```typescript
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProductBySlug, getRelatedProducts, getAllProducts } from '@/lib/products'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductSpecs } from '@/components/product/ProductSpecs'
import { ProductActionsWrapper } from '@/components/product/ProductActionsWrapper'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/ui/badge'
import { ChevronRight } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map(p => ({ slug: p.slug }))
}

export default function ProductoPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const related = getRelatedProducts(product)

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <ChevronRight size={12} aria-hidden="true" />
          <Link href="/productos" className="hover:text-primary transition-colors">Productos</Link>
          <ChevronRight size={12} aria-hidden="true" />
          <Link href={`/productos?categoria=${product.category}`} className="hover:text-primary transition-colors capitalize">
            {product.category}
          </Link>
          <ChevronRight size={12} aria-hidden="true" />
          <span className="text-ink truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16">
          {/* Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Info */}
          <div className="space-y-5">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {product.brand}
              </span>
              <h1 className="font-display text-3xl font-medium text-ink mt-2 leading-snug">
                {product.name}
              </h1>
              <p className="text-xs text-muted mt-1">SKU: {product.sku}</p>
            </div>

            <div>
              <p className="font-display text-4xl font-medium text-primary">
                ${product.price.toLocaleString('es-AR')}
              </p>
              <p className="text-sm text-muted mt-1">
                Efectivo: <span className="font-medium">${product.priceCash.toLocaleString('es-AR')}</span>
                {' · '}
                {product.installments.count}x ${product.installments.amount.toLocaleString('es-AR')} sin interés
              </p>
            </div>

            <div>
              {product.inStock ? (
                <Badge className="bg-success/10 text-success border-0">En stock</Badge>
              ) : (
                <Badge className="bg-muted/10 text-muted border-0">Sin stock</Badge>
              )}
            </div>

            <p className="text-sm text-muted leading-relaxed">{product.description}</p>

            {/* Dual CTAs */}
            <ProductActionsWrapper product={product} />

            {/* Specs accordion */}
            <ProductSpecs specs={product.specs} />
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-display text-2xl font-medium text-ink mb-6">
              Productos relacionados
            </h2>
            <ProductGrid products={related} onOpenAI={() => {}} />
          </section>
        )}
      </Container>
    </div>
  )
}
```

- [ ] **Step 2: Crear `components/product/ProductActionsWrapper.tsx`** (client wrapper para la página de detalle)

```typescript
'use client'

import { useState } from 'react'
import { ProductActions } from './ProductActions'
import { AIModalPlaceholder } from '@/components/ai-assistant/AIModalPlaceholder'
import type { Product } from '@/types'

export function ProductActionsWrapper({ product }: { product: Product }) {
  const [aiOpen, setAiOpen] = useState(false)
  return (
    <>
      <ProductActions product={product} onOpenAI={() => setAiOpen(true)} variant="page" />
      <AIModalPlaceholder open={aiOpen} onOpenChange={setAiOpen} />
    </>
  )
}
```

- [ ] **Step 3: Verificar en browser**

Navegar a `/productos/griferia-fv-arizona-monocomando`. Verificar: breadcrumb, galería, precio, badges, botones dobles, acordeón de specs, productos relacionados.

- [ ] **Step 4: Commit**

```bash
git add app/productos/[slug]/page.tsx components/product/ProductActionsWrapper.tsx
git commit -m "feat: add product detail page with dual CTAs and related products"
```

---

### Task 31: Página /obras

**Files:**
- Create: `app/obras/page.tsx`

- [ ] **Step 1: Crear `app/obras/page.tsx`**

```typescript
import Image from 'next/image'
import { Container } from '@/components/common/Container'

const OBRAS = [
  {
    title: 'Reforma baño principal — Caballito',
    description: 'Renovación completa con griferías FV Arizona, bacha Ferrum Bari de apoyar y accesorios inox. Resultado: baño minimalista de alto impacto.',
    img: 'https://placehold.co/800x600/F8F7F4/0A4D8C/png?text=Obra+Caballito',
    tags: ['Griferías FV', 'Sanitarios Ferrum'],
  },
  {
    title: 'Cocina abierta — Palermo',
    description: 'Instalación de grifería Peirano Tres monocomando con caño alto giratorio. Cliente eligió acabado cromo mate.',
    img: 'https://placehold.co/800x600/F8F7F4/0A4D8C/png?text=Obra+Palermo',
    tags: ['Griferías Peirano', 'Cocina'],
  },
  {
    title: 'Suite master — Pilar',
    description: 'Columna de ducha termostática FV Allegro + receptáculo Ferrum 80x80. Obra de alta gama con asesoramiento completo.',
    img: 'https://placehold.co/800x600/F8F7F4/0A4D8C/png?text=Obra+Pilar',
    tags: ['FV Premium', 'Ducha completa'],
  },
]

export default function ObrasPage() {
  return (
    <div className="min-h-screen bg-white">
      <Container className="py-12">
        <div className="mb-10">
          <p className="text-[11px] font-medium uppercase tracking-[2px] text-accent mb-2">Casos reales</p>
          <h1 className="font-display text-4xl font-medium text-ink">Obras realizadas</h1>
          <p className="text-muted mt-3 max-w-xl">Reformas donde asesoramos desde la elección del producto hasta la instalación.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OBRAS.map(obra => (
            <article key={obra.title} className="rounded-xl overflow-hidden border border-border bg-white">
              <div className="relative aspect-video">
                <Image src={obra.img} alt={obra.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-5 space-y-3">
                <h2 className="font-medium text-ink">{obra.title}</h2>
                <p className="text-sm text-muted leading-relaxed">{obra.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {obra.tags.map(tag => (
                    <span key={tag} className="rounded-full bg-bone px-2.5 py-0.5 text-xs text-muted">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/obras/page.tsx
git commit -m "feat: add /obras page with placeholder cards"
```

---

### Task 32: Página /contacto

**Files:**
- Create: `app/contacto/page.tsx`

- [ ] **Step 1: Crear `app/contacto/page.tsx`**

```typescript
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { whatsappBaseUrl } from '@/lib/whatsapp'

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Container className="py-12">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-medium text-ink">Contacto</h1>
          <p className="text-muted mt-3">Consultá por productos, presupuestos y asesoramiento.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <form className="space-y-5" aria-label="Formulario de contacto" noValidate>
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-ink mb-1.5">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  className="w-full rounded-md border border-border px-3 py-2.5 text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-ink mb-1.5">Teléfono</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  autoComplete="tel"
                  className="w-full rounded-md border border-border px-3 py-2.5 text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+54 11 XXXX-XXXX"
                />
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-ink mb-1.5">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  className="w-full rounded-md border border-border px-3 py-2.5 text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Contanos qué necesitás..."
                />
              </div>
              <a
                href={whatsappBaseUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-white hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Enviar consulta por WhatsApp
              </a>
              <p className="text-xs text-muted text-center">Te respondemos en menos de 2 horas en horario comercial.</p>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-ink">Ubicación</p>
                <p className="text-sm text-muted mt-0.5">Villa Madero, Buenos Aires, Argentina</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={20} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-ink">WhatsApp</p>
                <a href={whatsappBaseUrl()} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-primary transition-colors mt-0.5 block">
                  +54 9 11 6365-8651
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={20} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-ink">Email</p>
                <a href="mailto:sanitariosbaezcorp@gmail.com" className="text-sm text-muted hover:text-primary transition-colors mt-0.5 block">
                  sanitariosbaezcorp@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={20} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-ink">Horario</p>
                <p className="text-sm text-muted mt-0.5">Lunes a viernes 9–18 hs · Sábados 9–13 hs</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/contacto/page.tsx
git commit -m "feat: add /contacto page"
```

---

## Phase 9: Polish & Verification

### Task 33: Verificación final y QA

- [ ] **Step 1: Correr todos los tests**

```bash
npm run test:run
```

Esperado: todos en verde.

- [ ] **Step 2: Build de producción**

```bash
npm run build
```

Esperado: 0 errores de TypeScript, 0 warnings críticos.

- [ ] **Step 3: Verificar accesibilidad**

Con `npm run dev`, revisar manualmente:
- Tab desde skip link navega a `#main`
- Modal AI: Tab atrapa el foco dentro, ESC cierra, foco regresa al botón trigger
- Todos los botones e inputs tienen labels legibles por screen reader
- Imágenes tienen `alt` text descriptivo

- [ ] **Step 4: Verificar responsividad**

Con DevTools en 375px, 768px, 1280px:
- Navbar muestra hamburger en mobile, links en desktop
- Hero stack vertical en mobile
- Grid productos: 1 col (375px) → 2 col (768px) → 3 col (1280px)
- Detalle producto: imagen arriba en mobile, lado a lado en desktop
- Botones flotantes visibles en todas las resoluciones

- [ ] **Step 5: Commit final**

```bash
git add .
git commit -m "chore: final QA pass — build clean, tests green, a11y verified"
```

---

## Cómo agregar productos en el futuro

Para agregar más productos (pre-Sanity):
1. Abrir `data/products.json`
2. Agregar un nuevo objeto siguiendo el schema de `types/product.ts`
3. Guardar — los cambios se reflejan en todas las páginas automáticamente

Para migrar a Sanity en v1:
1. Instalar `@sanity/client`
2. Reemplazar el contenido de `lib/products.ts` con queries GROQ
3. Cero cambios en componentes ni páginas
