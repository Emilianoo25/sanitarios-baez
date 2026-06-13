import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AIButton } from '@/components/ai-assistant/AIButton'
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton'
import { CartProvider } from '@/context/CartContext'
import { CartDrawer } from '@/components/cart/CartDrawer'

const hanken = localFont({
  variable: '--font-sans',
  display: 'swap',
  src: [
    { path: './fonts/hanken-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/hanken-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/hanken-600.woff2', weight: '600', style: 'normal' },
    { path: './fonts/hanken-700.woff2', weight: '700', style: 'normal' },
  ],
})

const bricolage = localFont({
  variable: '--font-display',
  display: 'swap',
  src: [
    { path: './fonts/bricolage-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/bricolage-600.woff2', weight: '600', style: 'normal' },
    { path: './fonts/bricolage-700.woff2', weight: '700', style: 'normal' },
    { path: './fonts/bricolage-800.woff2', weight: '800', style: 'normal' },
  ],
})

export const metadata: Metadata = {
  title: 'Sanitarios Báez — Griferías y Sanitarios Premium',
  description:
    'FV, Ferrum, Peirano. Asesoramiento sin vueltas. Envío en el día CABA y GBA.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${hanken.variable} ${bricolage.variable}`}>
      <body className="font-sans bg-white text-ink antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white">
          Ir al contenido principal
        </a>
        {/* Promo banner */}
        <div className="bg-ink text-white text-center text-xs py-2 px-4">
          10% OFF por transferencia bancaria&nbsp;&nbsp;|&nbsp;&nbsp;3 cuotas sin interés&nbsp;&nbsp;|&nbsp;&nbsp;Envíos gratis en CABA en compras mayores a $300.000
        </div>
        <CartProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <AIButton />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  )
}
