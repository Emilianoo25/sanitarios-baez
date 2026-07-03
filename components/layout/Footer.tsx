import Link from 'next/link'
import { BrandLogo } from '@/components/common/BrandLogo'

const FOOTER_LINKS = {
  productos: [
    { label: 'Griferías', href: '/productos?categoria=griferias' },
    { label: 'Accesorios', href: '/productos?categoria=accesorios' },
    { label: 'Bachas', href: '/productos?categoria=bachas' },
    { label: 'Duchas', href: '/productos?categoria=duchas' },
  ],
  empresa: [
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
          <div className="space-y-4">
            <BrandLogo />
            <p className="text-sm text-muted leading-relaxed">
              Griferías y sanitarios premium para reformas que duran décadas. Villa Madero, Buenos Aires.
            </p>
            <div className="space-y-1 text-sm text-muted">
              <p>
                <a
                  href="https://wa.me/5491163658651"
                  className="hover:text-primary transition-colors"
                >
                  +54 9 11 6365-8651
                </a>
              </p>
              <p>
                <a
                  href="mailto:sanitariosbaezcorp@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  sanitariosbaezcorp@gmail.com
                </a>
              </p>
              <p>Villa Madero, Buenos Aires</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-ink mb-4">Productos</h3>
            <ul className="space-y-2" role="list">
              {FOOTER_LINKS.productos.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-ink mb-4">Empresa</h3>
            <ul className="space-y-2" role="list">
              {FOOTER_LINKS.empresa.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-ink mb-4">Legales</h3>
            <ul className="space-y-2" role="list">
              {FOOTER_LINKS.legales.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted">
            © 2026 Sanitarios Báez. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
