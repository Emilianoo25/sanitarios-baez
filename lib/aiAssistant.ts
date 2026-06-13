import { getAllProducts } from '@/lib/products'
import { KNOWLEDGE_BASE } from '@/lib/knowledgeBase'
import type { Product } from '@/types'

export interface AssistantReply {
  text: string
  products: Product[]
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  griferias: ['griferia', 'griferias', 'canilla', 'canillas', 'grifo', 'grifos', 'monocomando', 'mezclador', 'pico', 'cocina', 'lavatorio'],
  sanitarios: ['inodoro', 'inodoros', 'bidet', 'bidets', 'deposito', 'mochila', 'sanitario', 'sanitarios', 'vater', 'baño completo', 'bano completo'],
  bachas: ['bacha', 'bachas', 'bowl', 'mesada', 'apoyar', 'lavabo'],
  duchas: ['ducha', 'duchas', 'lluvia', 'columna', 'regadera', 'rociador', 'termostatica', 'termostatico'],
}

const BRANDS = ['fv', 'ferrum', 'peirano']

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

/** Busca la mejor coincidencia en la base de conocimiento. */
function matchKnowledge(q: string): { answer: string; category?: string; score: number } | null {
  let best: { answer: string; category?: string; score: number } | null = null
  for (const entry of KNOWLEDGE_BASE) {
    let score = 0
    for (const kw of entry.keywords) {
      if (q.includes(normalize(kw))) score += kw.includes(' ') ? 2 : 1
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { answer: entry.answer, category: entry.category, score }
    }
  }
  return best
}

// Pedido explícito de producto (quiere que le mostremos algo para comprar).
const PRODUCT_INTENT =
  /(necesito|busco|mostrame|muestrame|dame|pasame|comprar|comprame|cotiza|presupuesto|recomendame|precio|cuanto sale|cuanto cuesta|cuanto vale)/
// Marcadores de pregunta (quiere información, no necesariamente comprar).
const QUESTION_INTENT =
  /(que |qué|como|cómo|cual|cuál|por que|por qué|diferencia|sirve|significa|conviene|es mejor|explica|contame|sabes|saber|para que|cuando)/

/** Recomendación a partir de texto del usuario. */
export function getTextRecommendation(input: string): AssistantReply {
  const q = normalize(input)
  const all = getAllProducts()

  // 1) ¿Es una pregunta que responde la base de conocimiento?
  const kb = matchKnowledge(q)
  const productIntent = PRODUCT_INTENT.test(q)
  const isQuestion = QUESTION_INTENT.test(q)
  if (kb && (!productIntent || isQuestion)) {
    const related = kb.category ? all.filter(p => p.category === kb.category).slice(0, 2) : []
    return { text: kb.answer, products: related }
  }

  // Marca mencionada
  const brand = BRANDS.find(b => q.includes(b))

  // Categoría con más coincidencias
  let bestCat: string | null = null
  let bestScore = 0
  for (const [cat, words] of Object.entries(CATEGORY_KEYWORDS)) {
    const score = words.reduce((acc, w) => (q.includes(normalize(w)) ? acc + 1 : acc), 0)
    if (score > bestScore) {
      bestScore = score
      bestCat = cat
    }
  }

  const wantsCheap = /(barat|economic|menor precio|mas barato|gastar poco|precio bajo)/.test(q)
  const wantsPremium = /(premium|mejor|calidad|alta gama|top|lo mejor)/.test(q)
  const wantsPromo = /(oferta|promo|descuento|rebaj)/.test(q)

  let pool = all
  if (bestCat) pool = pool.filter(p => p.category === bestCat)
  if (brand) {
    const byBrand = pool.filter(p => normalize(p.brand) === brand)
    if (byBrand.length) pool = byBrand
  }
  if (wantsPromo) {
    const promo = pool.filter(p => p.onPromo)
    if (promo.length) pool = promo
  }
  if (pool.length === 0) pool = all

  if (wantsCheap) pool = [...pool].sort((a, b) => a.price - b.price)
  else if (wantsPremium) pool = [...pool].sort((a, b) => b.price - a.price)
  else pool = [...pool].sort((a, b) => Number(b.featured) - Number(a.featured))

  const picks = pool.slice(0, 3)

  // Saludo / sin intención clara
  if (!bestCat && !brand && !wantsCheap && !wantsPremium && !wantsPromo) {
    if (/(hola|buenas|buen dia|que tal|ayuda|ayudame)/.test(q)) {
      return {
        text: '¡Hola! Soy el asistente de Sanitarios Báez. Puedo responderte dudas sobre griferías, inodoros, bachas y duchas, o recomendarte productos. Por ejemplo: "¿qué diferencia hay entre monocomando y bicomando?" o "necesito una grifería para la cocina".',
        products: [],
      }
    }
    if (!productIntent) {
      // No hubo match en la base de conocimiento ni intención de compra clara.
      return {
        text: 'Mmm, esa no la tengo bien cubierta todavía. Puedo ayudarte con dudas sobre griferías, inodoros, bidets, bachas y duchas (materiales, medidas, instalación, marcas) o recomendarte un producto. Si es algo más específico, lo mejor es consultarlo por WhatsApp con el equipo de Báez.',
        products: [],
      }
    }
  }

  const catLabel: Record<string, string> = {
    griferias: 'griferías',
    sanitarios: 'sanitarios',
    bachas: 'bachas',
    duchas: 'duchas',
  }

  let text: string
  if (picks.length === 0) {
    text = 'Por ahora no tengo un producto exacto para eso, pero el equipo de Báez te puede conseguir lo que necesites por WhatsApp.'
  } else if (bestCat) {
    const extra = wantsCheap ? ' Te ordené de menor a mayor precio.' : wantsPremium ? ' Te muestro primero lo de mejor gama.' : ''
    text = `Para ${catLabel[bestCat] ?? 'lo que buscás'}${brand ? ` de ${brand.toUpperCase()}` : ''} te recomiendo esto.${extra}`
  } else if (brand) {
    text = `Estos son los productos de ${brand.toUpperCase()} que tenemos disponibles.`
  } else {
    text = 'Mirá, esto es lo que mejor encaja con lo que me contás.'
  }

  return { text, products: picks }
}

/** Recomendación simulada a partir de una foto subida. */
export function getPhotoRecommendation(caption?: string): AssistantReply {
  // Si hay texto junto a la foto, lo usamos para orientar.
  if (caption && caption.trim().length > 2) {
    const r = getTextRecommendation(caption)
    if (r.products.length) {
      return {
        text: `Miré tu foto 👀 ${r.text}`,
        products: r.products,
      }
    }
  }

  const all = getAllProducts()
  // Recomendación tipo "baño completo": una pieza de cada categoría clave.
  const pick = (cat: string) =>
    all.find(p => p.category === cat && p.featured) ?? all.find(p => p.category === cat)
  const combo = [pick('griferias'), pick('sanitarios'), pick('bachas')].filter(Boolean) as Product[]

  return {
    text:
      'Analicé tu imagen 👀 Veo un ambiente de baño con espacio para renovar las piezas principales. ' +
      'Para mantener una estética prolija y moderna, te armé una combinación que combina bien entre sí:',
    products: combo.length ? combo : all.slice(0, 3),
  }
}
