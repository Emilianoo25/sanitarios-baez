import { NextResponse } from 'next/server'

interface CartLine {
  title: string
  quantity: number
  unit_price: number
}

interface CheckoutBody {
  items: CartLine[]
  payer?: { name?: string; email?: string }
}

export async function POST(req: Request) {
  const token = process.env.MP_ACCESS_TOKEN
  if (!token) {
    return NextResponse.json(
      { error: 'MercadoPago no está configurado. Falta MP_ACCESS_TOKEN.' },
      { status: 503 }
    )
  }

  let body: CheckoutBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

  if (!body.items?.length) {
    return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 })
  }

  const origin =
    req.headers.get('origin') ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    'http://localhost:3000'

  const preference = {
    items: body.items.map((i, idx) => ({
      id: String(idx),
      title: i.title.slice(0, 250),
      quantity: Math.max(1, Math.trunc(i.quantity)),
      unit_price: Math.round(i.unit_price),
      currency_id: 'ARS',
    })),
    payer: body.payer?.email
      ? { name: body.payer.name, email: body.payer.email }
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
    return NextResponse.json(
      { error: data?.message || 'Error al crear la preferencia de pago', detail: data },
      { status: mpRes.status }
    )
  }

  return NextResponse.json({
    id: data.id,
    init_point: data.init_point,
    sandbox_init_point: data.sandbox_init_point,
  })
}
