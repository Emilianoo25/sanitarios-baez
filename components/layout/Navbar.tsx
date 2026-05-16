'use client'

import Link from 'next/link'
import { ShoppingCart, Search, Menu } from 'lucide-react'
import { useState } from 'react'
import { BrandLogo } from '@/components/common/BrandLogo'
import { MobileMenu } from './MobileMenu'

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
        <nav
          className="mx-auto flex h-16 max-w-container items-center justify-between px-4 sm:px-8 lg:px-16"
          aria-label="Navegación principal"
        >
          <BrandLogo />

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
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
      />
    </>
  )
}
