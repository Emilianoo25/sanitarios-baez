import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Rate-limiting distribuido con Upstash. Si faltan las env vars, se desactiva
// (fail-open) para no romper el deploy: cargá UPSTASH_REDIS_REST_URL y
// UPSTASH_REDIS_REST_TOKEN en Vercel para activarlo.
const url = process.env.UPSTASH_REDIS_REST_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN

let redis: Redis | null = null
if (url && token) {
  redis = new Redis({ url, token })
} else if (process.env.NODE_ENV === 'production') {
  console.warn('[rateLimit] Upstash no configurado: rate-limiting DESACTIVADO')
}

const limiters = redis
  ? {
      // Asistente IA: caro (llama a Anthropic), límite ajustado.
      assistant: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(15, '60 s'),
        prefix: 'rl:assistant',
        analytics: false,
      }),
      // Checkout: crea preferencia en MercadoPago.
      checkout: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(20, '60 s'),
        prefix: 'rl:checkout',
        analytics: false,
      }),
    }
  : null

export function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') || '127.0.0.1'
}

/** Devuelve true si la request está permitida (o si el rate-limit está desactivado). */
export async function checkRateLimit(
  bucket: 'assistant' | 'checkout',
  identifier: string
): Promise<boolean> {
  if (!limiters) return true
  const { success } = await limiters[bucket].limit(identifier)
  return success
}
