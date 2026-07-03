'use client'

import Link from 'next/link'
import { ShoppingCart, Search, Menu, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { BrandLogo } from '@/components/common/BrandLogo'
import { MobileMenu } from './MobileMenu'
import { useCart } from '@/context/CartContext'

const CATEGORY_LINKS = [
  { label: 'Griferías', href: '/productos?categoria=griferias' },
  { label: 'Bachas', href: '/productos?categoria=bachas' },
  { label: 'Duchas', href: '/productos?categoria=duchas' },
  { label: 'Accesorios', href: '/productos?categoria=accesorios' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems, openCart } = useCart()

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-white/95 backdrop-blur-sm">
        <nav
          className="mx-auto flex h-16 max-w-container items-center justify-between px-4 sm:px-8 lg:px-16"
          aria-label="Navegación principal"
        >
          <BrandLogo />

          <ul className="hidden lg:flex items-center gap-6" role="list">
            <li className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-ink hover:text-primary transition-colors">
                Categorías
                <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 invisible translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                <div className="min-w-[180px] border border-border bg-white py-2 shadow-[0_12px_40px_-12px_rgba(10,77,140,0.25)]">
                  {CATEGORY_LINKS.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-ink hover:bg-bone hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <Link
                href="/contacto"
                className="text-sm font-medium text-ink hover:text-primary transition-colors"
              >
                Contacto
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <button
              aria-label="Buscar"
              className="hidden sm:flex p-2 text-muted hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Search size={20} />
            </button>
            <button
              onClick={openCart}
              aria-label={`Carrito (${totalItems} productos)`}
              className="relative p-2 text-muted hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-white leading-none">
                  {totalItems}
                </span>
              )}
            </button>
            <Link
              href="/contacto"
              className="hidden sm:inline-flex items-center rounded-none bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        categories={CATEGORY_LINKS}
      />
    </>
  )
}
