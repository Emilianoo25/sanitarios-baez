import { describe, it, expect } from 'vitest'
import { getTextRecommendation } from '@/lib/aiAssistant'

describe('asistente — base de conocimiento', () => {
  it('responde monocomando vs bicomando con info, no solo productos', () => {
    const r = getTextRecommendation('qué diferencia hay entre monocomando y bicomando?')
    expect(r.text).toMatch(/caudal y temperatura|una sola palanca/i)
  })

  it('explica qué es una ducha termostática', () => {
    const r = getTextRecommendation('qué es una ducha termostática?')
    expect(r.text).toMatch(/temperatura que vos fijás|termostática mantiene/i)
  })

  it('explica inodoro corto vs largo', () => {
    const r = getTextRecommendation('cuál es la diferencia entre inodoro corto y largo')
    expect(r.text).toMatch(/distancia|desagüe/i)
  })

  it('responde sobre garantía', () => {
    const r = getTextRecommendation('tienen garantía los productos?')
    expect(r.text).toMatch(/garantía oficial/i)
  })

  it('sigue recomendando cuando hay intención de compra', () => {
    const r = getTextRecommendation('necesito una grifería para el baño')
    expect(r.products.length).toBeGreaterThan(0)
  })

  it('deriva a WhatsApp cuando piden hablar con una persona', () => {
    const r = getTextRecommendation('quiero hablar con una persona')
    expect(r.whatsapp).toBe(true)
    expect(r.text).toMatch(/WhatsApp/i)
  })

  it('da guía cuando no entiende, sin tirar productos al azar', () => {
    const r = getTextRecommendation('cuanto pesa un elefante')
    expect(r.products.length).toBe(0)
    expect(r.text).toMatch(/griferías|WhatsApp/i)
  })
})
