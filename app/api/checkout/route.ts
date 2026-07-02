import { NextResponse } from 'next/server'
import { getAllProducts } from '@/lib/products'
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'

interface CartLine {
  id: string
  quantity: number
}

interface CheckoutBody {
  items: CartLine[]
  payer?: { name?: string; email?: string }
}

const MAX_LINES = 50
const MAX_QTY = 99

export async function POST(req: Request) {
  const token = process.env.MP_ACCESS_TOKEN
  if (!token) {
    return NextResponse.json(
      { error: 'MercadoPago no está configurado. Falta MP_ACCESS_TOKEN.' },
      { status: 503 }
    )
  }

  if (!(await checkRateLimit('checkout', getClientIp(req)))) {
    return NextResponse.json({ error: 'Demasiadas solicitudes. Esperá un momento.' }, { status: 429 })
  }

  let body: CheckoutBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

  if (!Array.isArray(body.items) || !body.items.length) {
    return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 })
  }
  if (body.items.length > MAX_LINES) {
    return NextResponse.json({ error: 'Demasiados productos' }, { status: 400 })
  }

  // Precios recalculados en el servidor desde el catálogo: NUNCA confiar en el
  // unit_price que manda el cliente (evita manipular montos).
  const catalog = new Map(getAllProducts().map(p => [p.id, p]))
  const items = []
  for (const line of body.items) {
    const product = catalog.get(String(line?.id))
    if (!product) {
      return NextResponse.json({ error: `Producto inexistente: ${line?.id}` }, { status: 400 })
    }
    const quantity = Math.min(MAX_QTY, Math.max(1, Math.trunc(Number(line.quantity) || 1)))
    items.push({
      id: product.id,
      title: product.name.slice(0, 250),
      quantity,
      unit_price: Math.round(product.price),
      currency_id: 'ARS',
    })
  }

  // Base confiable desde env; el origin del header solo se usa como fallback
  // de desarrollo (evita open-redirect en las back_urls).
  const origin =
    process.env.NEXT_PUBLIC_BASE_URL ||
    req.headers.get('origin') ||
    'http://localhost:3000'

  const email = body.payer?.email
  const preference = {
    items,
    payer: email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
      ? { name: body.payer?.name?.slice(0, 100), email }
      : undefined,
    back_urls: {
      success: `${origin}/checkout/resultado?status=success`,
      failure: `${origin}/checkout/resultado?status=failure`,
      pending: `${origin}/checkout/resultado?status=pending`,
    },
    auto_return: 'approved',
    statement_descriptor: 'SANITARIOS BAEZ',
  }

  const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(preference),
  })

  const data = await mpRes.json()

  if (!mpRes.ok) {
    // No filtrar el detalle interno de MercadoPago al cliente.
    console.error('[checkout] MercadoPago error', mpRes.status, data)
    return NextResponse.json(
      { error: 'No se pudo crear la preferencia de pago.' },
      { status: 502 }
    )
  }

  return NextResponse.json({
    id: data.id,
    init_point: data.init_point,
    sandbox_init_point: data.sandbox_init_point,
  })
}
