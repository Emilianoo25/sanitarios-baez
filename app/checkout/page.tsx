'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, CreditCard, Building2, Banknote, Check } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const PROVINCIAS = [
  'Ciudad Autónoma de Buenos Aires','Buenos Aires','Catamarca','Chaco','Chubut',
  'Córdoba','Corrientes','Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja',
  'Mendoza','Misiones','Neuquén','Río Negro','Salta','San Juan','San Luis',
  'Santa Cruz','Santa Fe','Santiago del Estero','Tierra del Fuego','Tucumán',
]

type PaymentMethod = 'mercadopago' | 'transferencia' | 'efectivo'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [payment, setPayment] = useState<PaymentMethod>('mercadopago')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    email: '', nombre: '', apellidos: '', empresa: '',
    dni: '', direccion: '', ciudad: '', provincia: 'Ciudad Autónoma de Buenos Aires',
    cp: '', telefono: '', notasPedido: '', enviarOtra: false, factura: false,
  })

  function set(k: keyof typeof form, v: string | boolean) {
    setForm(f => ({ ...f, [k]: v }))
  }

  const discount = payment === 'transferencia' ? 0.10 : 0
  const finalPrice = totalPrice * (1 - discount)

  async function payWithMercadoPago() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            id: i.product.id,
            quantity: i.quantity,
          })),
          payer: { name: `${form.nombre} ${form.apellidos}`.trim(), email: form.email },
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error ?? 'No se pudo iniciar el pago.')
        setLoading(false)
        return
      }
      const url = data.init_point ?? data.sandbox_init_point
      if (!url) {
        setError('MercadoPago no devolvió un link de pago.')
        setLoading(false)
        return
      }
      window.location.href = url
    } catch {
      setError('Error de conexión con MercadoPago.')
      setLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (payment === 'mercadopago') {
      payWithMercadoPago()
      return
    }
    const lines = [
      `*Nuevo pedido — Sanitarios Báez*`,
      ``,
      `*Cliente:* ${form.nombre} ${form.apellidos}`,
      `*Email:* ${form.email}`,
      `*Teléfono:* ${form.telefono}`,
      `*DNI:* ${form.dni}`,
      `*Dirección:* ${form.direccion}, ${form.ciudad}, ${form.provincia} (CP ${form.cp})`,
      form.empresa ? `*Empresa:* ${form.empresa}` : '',
      ``,
      `*Productos:*`,
      ...items.map(i => `• ${i.product.name} × ${i.quantity} — $${(i.product.price * i.quantity).toLocaleString('es-AR')}`),
      ``,
      `*Método de pago:* ${payment === 'transferencia' ? 'Transferencia bancaria (-10%)' : 'Efectivo'}`,
      `*Total:* $${finalPrice.toLocaleString('es-AR')}`,
      form.notasPedido ? `*Notas:* ${form.notasPedido}` : '',
    ].filter(Boolean).join('\n')

    const url = `https://wa.me/5491163658651?text=${encodeURIComponent(lines)}`
    clearCart()
    setDone(true)
    setTimeout(() => window.open(url, '_blank'), 500)
  }

  if (items.length === 0 && !done) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-10">
          <p className="text-gray-500 mb-4">No tenés productos en el carrito.</p>
          <Link href="/productos" className="text-primary underline text-sm">Ver catálogo</Link>
        </div>
      </div>
    )
  }

  if (done) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-10 max-w-md">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-6">
            <Check size={32} className="text-green-600" />
          </div>
          <h1 className="font-display text-2xl font-medium text-ink mb-2">¡Pedido enviado!</h1>
          <p className="text-sm text-gray-500 mb-6">
            Te abrimos WhatsApp para confirmar tu pedido con el equipo de Báez. Si no se abrió,{' '}
            <a href="https://wa.me/5491163658651" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              hacé click acá
            </a>.
          </p>
          <Link href="/" className="inline-block bg-primary text-white text-sm px-6 py-3 hover:bg-primary-dark transition-colors">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Breadcrumb steps */}
      <div className="bg-white border-b border-border py-3">
        <div className="mx-auto max-w-4xl px-4 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/carrito" className="hover:text-primary transition-colors">Carrito</Link>
          <ChevronRight size={12} />
          <span className="font-medium text-ink">Detalles del pago</span>
          <ChevronRight size={12} />
          <span>Pedido completado</span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

            {/* Left — Billing form */}
            <div className="bg-white border border-border p-6 space-y-5">
              <h1 className="font-display text-xl font-medium text-ink">Detalles de facturación</h1>

              {/* Email */}
              <Field label="Dirección de correo electrónico *">
                <input required type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
              </Field>

              {/* Nombre + Apellidos */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Nombre *">
                  <input required value={form.nombre} onChange={e => set('nombre', e.target.value)}
                    className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                </Field>
                <Field label="Apellidos *">
                  <input required value={form.apellidos} onChange={e => set('apellidos', e.target.value)}
                    className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                </Field>
              </div>

              {/* Empresa */}
              <Field label="Nombre de la empresa (opcional)">
                <input value={form.empresa} onChange={e => set('empresa', e.target.value)}
                  className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
              </Field>

              {/* Checkboxes */}
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.factura} onChange={e => set('factura', e.target.checked)} className="accent-primary" />
                  ¿Necesita factura A? (opcional)
                </label>
              </div>

              {/* DNI */}
              <Field label="DNI *">
                <input required value={form.dni} onChange={e => set('dni', e.target.value)} placeholder="número de identificación"
                  className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-gray-300" />
              </Field>

              {/* País */}
              <Field label="País / Región *">
                <div className="w-full border border-border px-3 py-2.5 text-sm bg-gray-50 text-gray-500">Argentina</div>
              </Field>

              {/* Dirección */}
              <Field label="Dirección de la calle *">
                <input required value={form.direccion} onChange={e => set('direccion', e.target.value)} placeholder="Nombre de la calle y número"
                  className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-gray-300" />
              </Field>

              {/* Ciudad + CP */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Población *">
                  <input required value={form.ciudad} onChange={e => set('ciudad', e.target.value)}
                    className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                </Field>
                <Field label="Código postal *">
                  <input required value={form.cp} onChange={e => set('cp', e.target.value)}
                    className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                </Field>
              </div>

              {/* Provincia */}
              <Field label="Región / Provincia *">
                <select required value={form.provincia} onChange={e => set('provincia', e.target.value)}
                  className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors bg-white">
                  {PROVINCIAS.map(p => <option key={p}>{p}</option>)}
                </select>
              </Field>

              {/* Teléfono */}
              <Field label="Teléfono *">
                <input required type="tel" value={form.telefono} onChange={e => set('telefono', e.target.value)}
                  className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
              </Field>

              {/* Enviar a otra dirección */}
              <label className="flex items-center gap-2 text-sm cursor-pointer pt-2 border-t border-border">
                <input type="checkbox" checked={form.enviarOtra} onChange={e => set('enviarOtra', e.target.checked)} className="accent-primary" />
                ¿Enviar a una dirección diferente?
              </label>

              {/* Notas */}
              <Field label="Notas del pedido (opcional)">
                <textarea value={form.notasPedido} onChange={e => set('notasPedido', e.target.value)} rows={3}
                  placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega."
                  className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-gray-300" />
              </Field>
            </div>

            {/* Right — Order summary + payment */}
            <div className="space-y-4">
              <div className="bg-white border border-border p-6">
                <h2 className="font-display text-lg font-medium text-ink mb-4">Tu pedido</h2>
                <div className="space-y-2 text-sm border-b border-border pb-4 mb-4">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex justify-between">
                      <span className="text-gray-600 truncate mr-2 max-w-[180px]">{product.name} × {quantity}</span>
                      <span className="font-medium shrink-0">${(product.price * quantity).toLocaleString('es-AR')}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">${totalPrice.toLocaleString('es-AR')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600 mb-1">
                    <span>Descuento transferencia (10%)</span>
                    <span>-${(totalPrice * discount).toLocaleString('es-AR')}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium text-ink text-base border-t border-border pt-3 mt-2">
                  <span>TOTAL</span>
                  <span className="font-display text-lg">${finalPrice.toLocaleString('es-AR')}</span>
                </div>
              </div>

              {/* Payment methods */}
              <div className="bg-white border border-border p-6 space-y-3">
                <PayOption
                  id="mercadopago"
                  value={payment}
                  onChange={setPayment}
                  icon={<CreditCard size={18} className="text-sky-500" />}
                  label="Mercado Pago"
                  description="Pagá con tarjeta, débito o dinero en cuenta."
                />
                <PayOption
                  id="transferencia"
                  value={payment}
                  onChange={setPayment}
                  icon={<Building2 size={18} className="text-primary" />}
                  label="Transferencia bancaria directa"
                  badge="10% OFF"
                  description="Recibís los datos bancarios por WhatsApp al confirmar."
                />
                <PayOption
                  id="efectivo"
                  value={payment}
                  onChange={setPayment}
                  icon={<Banknote size={18} className="text-green-600" />}
                  label="Pago en efectivo"
                  description="Coordinamos la entrega y el pago en persona."
                />
              </div>

              <p className="text-xs text-gray-400 px-1">
                Tus datos personales se utilizarán para procesar tu pedido y mejorar tu experiencia de compra.
              </p>

              {error && (
                <p className="bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-600">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent py-4 text-sm font-semibold text-white hover:bg-accent-hover transition-colors tracking-wide disabled:opacity-50"
              >
                {loading
                  ? 'Redirigiendo a MercadoPago…'
                  : payment === 'mercadopago'
                    ? 'Pagar con MercadoPago →'
                    : 'Realizar el pedido →'}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-ink">{label}</label>
      {children}
    </div>
  )
}

function PayOption({
  id, value, onChange, icon, label, badge, description,
}: {
  id: PaymentMethod
  value: PaymentMethod
  onChange: (v: PaymentMethod) => void
  icon: React.ReactNode
  label: string
  badge?: string
  description?: string
}) {
  const selected = value === id
  return (
    <label className={`flex items-start gap-3 cursor-pointer p-3 border transition-colors ${selected ? 'border-primary bg-primary/5' : 'border-border hover:border-gray-300'}`}>
      <input
        type="radio"
        name="payment"
        value={id}
        checked={selected}
        onChange={() => onChange(id)}
        className="mt-0.5 accent-primary"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium text-ink">{label}</span>
          {badge && (
            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">{badge}</span>
          )}
        </div>
        {selected && description && (
          <p className="text-xs text-gray-500 mt-1 ml-6">{description}</p>
        )}
      </div>
    </label>
  )
}
