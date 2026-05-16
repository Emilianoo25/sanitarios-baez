import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AIButton } from '@/components/ai-assistant/AIButton'
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
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
    <html lang="es" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans bg-white text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded"
        >
          Ir al contenido principal
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <AIButton />
        <WhatsAppButton />
      </body>
    </html>
  )
}
