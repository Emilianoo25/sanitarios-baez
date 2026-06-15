import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getAllProducts } from '@/lib/products'
import { KNOWLEDGE_BASE } from '@/lib/knowledgeBase'

export const runtime = 'nodejs'
export const maxDuration = 30

const MODEL = 'claude-haiku-4-5'
const BAEZ_PHONE = '+54 9 11 6365-8651'

interface ChatTurn {
  role: 'user' | 'assistant'
  text: string
}
interface AssistantBody {
  history: ChatTurn[]
  image?: { data: string; mediaType: string } | null
}

function buildSystemPrompt(): string {
  const products = getAllProducts()
  const catalog = products
    .map(p => {
      const promo = p.onPromo && p.discount ? ` [EN PROMO -${p.discount}%]` : ''
      const specs = p.specs.map(s => `${s.key}: ${s.value}`).join('; ')
      return `- ${p.name} (marca ${p.brand}, categoría ${p.category})${promo}
  precio $${p.price.toLocaleString('es-AR')} | efectivo $${p.priceCash.toLocaleString('es-AR')} | ${p.installments.count}x $${p.installments.amount.toLocaleString('es-AR')}
  specs: ${specs}
  slug: ${p.slug}`
    })
    .join('\n')

  const kb = KNOWLEDGE_BASE.map(e => `- ${e.answer}`).join('\n')

  return `Sos el asistente virtual de **Sanitarios Báez**, una casa de sanitarios y griferías en Villa Madero, Buenos Aires (Argentina). Vendés marcas FV, Ferrum y Peirano.

TONO: español rioplatense (voseo), cercano, profesional y servicial. Respuestas BREVES (2-5 oraciones), claras, sin tecnicismos innecesarios. No uses markdown pesado ni listas largas salvo que ayude.

QUÉ PODÉS HACER:
- Responder dudas sobre griferías, inodoros, bidets, bachas, duchas (materiales, medidas, instalación, marcas, mantenimiento).
- Recomendar productos del catálogo según lo que necesita el cliente.
- Si te mandan una foto de un ambiente, analizala y recomendá productos del catálogo que encajen.
- Si piden "ofertas"/"promos"/"descuentos", listá SOLO los productos marcados [EN PROMO].

REGLAS IMPORTANTES:
- SOLO recomendá productos que están en el catálogo de abajo. NUNCA inventes productos, precios ni specs.
- Si no tenés el dato o el producto exacto, decilo con honestidad y ofrecé hablar con el equipo por WhatsApp (${BAEZ_PHONE}).
- Si el cliente quiere hablar con una persona, comprar, o pedir algo que no está, derivá a WhatsApp (${BAEZ_PHONE}).
- No prometas stock ni plazos exactos: para eso, WhatsApp.

FORMATO DE SALIDA:
- Escribí tu respuesta natural para el cliente.
- Cuando recomiendes productos puntuales del catálogo, agregá AL FINAL una línea EXACTA con sus slugs (máximo 3), así: <<<PRODUCTS:slug1,slug2>>>
- No menciones ni expliques esa línea; el sistema la usa para mostrar las tarjetas. Si no recomendás ningún producto puntual, no la pongas.

=== CATÁLOGO (único inventario disponible) ===
${catalog}

=== BASE DE CONOCIMIENTO (info de referencia del rubro) ===
${kb}`
}

const SYSTEM_PROMPT = buildSystemPrompt()

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'IA no configurada (falta ANTHROPIC_API_KEY)' }, { status: 503 })
  }

  let body: AssistantBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

  const history = Array.isArray(body.history) ? body.history.slice(-12) : []
  if (!history.length && !body.image) {
    return NextResponse.json({ error: 'Sin mensaje' }, { status: 400 })
  }

  const messages: Anthropic.MessageParam[] = history.map(t => ({
    role: t.role,
    content: t.text,
  }))

  // Adjuntar imagen al último turno del usuario (o crear uno).
  if (body.image?.data) {
    const imgBlock: Anthropic.ImageBlockParam = {
      type: 'image',
      source: {
        type: 'base64',
        media_type: body.image.mediaType as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif',
        data: body.image.data,
      },
    }
    const last = messages[messages.length - 1]
    if (last && last.role === 'user') {
      const text = typeof last.content === 'string' ? last.content : ''
      last.content = [
        imgBlock,
        { type: 'text', text: text || 'Te mando una foto de mi ambiente. ¿Qué productos del catálogo me recomendás?' },
      ]
    } else {
      messages.push({
        role: 'user',
        content: [imgBlock, { type: 'text', text: 'Te mando una foto de mi ambiente. ¿Qué productos del catálogo me recomendás?' }],
      })
    }
  }

  const client = new Anthropic({ apiKey })

  try {
    const resp = await client.messages.create({
      model: MODEL,
      max_tokens: 600,
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages,
    })

    const raw = resp.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map(b => b.text)
      .join('\n')

    // Extraer slugs recomendados de la línea <<<PRODUCTS:...>>>
    let slugs: string[] = []
    const m = raw.match(/<<<PRODUCTS:([^>]*)>>>/i)
    if (m) {
      slugs = m[1].split(',').map(s => s.trim()).filter(Boolean)
    }
    const text = raw.replace(/<<<PRODUCTS:[^>]*>>>/i, '').trim()

    return NextResponse.json({ text, slugs })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error de IA'
    return NextResponse.json({ error: msg }, { status: 502 })
  }
}
