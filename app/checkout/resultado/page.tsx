'use client'

import { Suspense, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, XCircle, Clock } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function ResultadoPage() {
  return (
    <Suspense>
      <Resultado />
    </Suspense>
  )
}

function Resultado() {
  const params = useSearchParams()
  const status = params.get('status') ?? 'pending'
  const { clearCart } = useCart()

  useEffect(() => {
    if (status === 'success') clearCart()
  }, [status, clearCart])

  const config = {
    success: {
      icon: <CheckCircle2 size={36} className="text-green-600" />,
      bg: 'bg-green-100',
      title: '¡Pago aprobado!',
      text: 'Recibimos tu pago. El equipo de Báez se va a contactar para coordinar la entrega.',
    },
    failure: {
      icon: <XCircle size={36} className="text-red-600" />,
      bg: 'bg-red-100',
      title: 'El pago no se completó',
      text: 'No se pudo procesar el pago. Podés intentar de nuevo o consultarnos por WhatsApp.',
    },
    pending: {
      icon: <Clock size={36} className="text-amber-600" />,
      bg: 'bg-amber-100',
      title: 'Pago pendiente',
      text: 'Tu pago está siendo procesado. Te avisamos apenas se confirme.',
    },
  }[status] ?? {
    icon: <Clock size={36} className="text-amber-600" />,
    bg: 'bg-amber-100',
    title: 'Pago pendiente',
    text: 'Tu pago está siendo procesado.',
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${config.bg}`}>
          {config.icon}
        </div>
        <h1 className="font-display text-2xl font-semibold text-ink">{config.title}</h1>
        <p className="mt-2 text-sm text-muted">{config.text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors">
            Volver al inicio
          </Link>
          {status !== 'success' && (
            <Link href="/checkout" className="border border-border px-6 py-3 text-sm font-medium text-ink hover:border-primary transition-colors">
              Volver al checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
