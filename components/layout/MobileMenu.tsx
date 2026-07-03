'use client'

import Link from 'next/link'
import { BrandLogo } from '@/components/common/BrandLogo'
import { Sheet, SheetContent } from '@/components/ui/sheet'

interface NavLink {
  label: string
  href: string
}

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  categories: NavLink[]
}

export function MobileMenu({ open, onClose, categories }: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <SheetContent side="left" className="w-72 p-0" showCloseButton={false}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <BrandLogo />
        </div>
        <nav aria-label="Menú móvil">
          <ul className="px-4 py-6 space-y-1" role="list">
            <li className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[2px] text-muted">
              Categorías
            </li>
            {categories.map(link => (
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
            <li className="mt-2 border-t border-border pt-2">
              <Link
                href="/contacto"
                onClick={onClose}
                className="flex items-center px-3 py-3 text-base font-medium text-ink hover:text-primary hover:bg-bone rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Contacto
              </Link>
            </li>
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
