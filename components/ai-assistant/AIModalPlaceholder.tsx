'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, X, Send, ImagePlus, Camera, MessageCircle } from 'lucide-react'
import { getTextRecommendation, getPhotoRecommendation } from '@/lib/aiAssistant'
import { getProductBySlug } from '@/lib/products'
import { whatsappUrl, whatsappBaseUrl } from '@/lib/whatsapp'
import type { Product } from '@/types'

const HANDOFF_URL = `${whatsappBaseUrl()}?text=${encodeURIComponent(
  'Hola Báez! Estaba en la web con el asistente y quiero hacer una consulta.'
)}`

interface AIModalPlaceholderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text?: string
  image?: string
  products?: Product[]
  whatsapp?: boolean
}

const QUICK_PROMPTS = [
  'Necesito una grifería para el baño',
  'Quiero renovar el baño completo',
  'Mostrame las ofertas',
  'Una ducha tipo lluvia',
]

const GREETING: ChatMessage = {
  id: 'greeting',
  role: 'assistant',
  text: '¡Hola! 👋 Soy el asistente de Sanitarios Báez. Contame qué estás buscando o mandame una foto de tu ambiente y te recomiendo el producto ideal.',
}

let idc = 0
const newId = () => `m${++idc}-${Date.now()}`

export function AIModalPlaceholder({ open, onOpenChange }: AIModalPlaceholderProps) {
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [pendingImage, setPendingImage] = useState<{ dataUrl: string; base64: string; mediaType: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  function historyFrom(extra?: { role: 'user' | 'assistant'; text: string }) {
    const turns = messages
      .filter(m => m.text)
      .map(m => ({ role: m.role, text: m.text as string }))
    if (extra) turns.push(extra)
    return turns
  }

  async function runAssistant(
    history: { role: 'user' | 'assistant'; text: string }[],
    image?: { data: string; mediaType: string }
  ) {
    setTyping(true)
    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history, image: image ?? null }),
      })
      if (!res.ok) throw new Error('api')
      const data = await res.json()
      const products = Array.isArray(data.slugs)
        ? (data.slugs.map((s: string) => getProductBySlug(s)).filter(Boolean) as Product[])
        : []
      setMessages(m => [...m, { id: newId(), role: 'assistant', text: data.text || '…', products }])
    } catch {
      // Fallback al motor local (sin costo) si la IA no responde
      const fb = image
        ? getPhotoRecommendation()
        : getTextRecommendation(history[history.length - 1]?.text ?? '')
      setMessages(m => [...m, { id: newId(), role: 'assistant', text: fb.text, products: fb.products, whatsapp: fb.whatsapp }])
    } finally {
      setTyping(false)
    }
  }

  function sendText(value: string) {
    const text = value.trim()
    if (!text || typing) return
    const history = historyFrom({ role: 'user', text })
    setMessages(m => [...m, { id: newId(), role: 'user', text }])
    setInput('')
    runAssistant(history)
  }

  // Adjunta la foto a la previsualización (NO la manda).
  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      setPendingImage({
        dataUrl,
        base64: dataUrl.slice(dataUrl.indexOf(',') + 1),
        mediaType: dataUrl.slice(5, dataUrl.indexOf(';')),
      })
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  // Envía texto y/o la foto adjunta juntos.
  function handleSend() {
    const text = input.trim()
    if ((!text && !pendingImage) || typing) return
    const history = historyFrom(text ? { role: 'user', text } : undefined)
    setMessages(m => [...m, { id: newId(), role: 'user', text: text || undefined, image: pendingImage?.dataUrl }])
    const img = pendingImage ? { data: pendingImage.base64, mediaType: pendingImage.mediaType } : undefined
    setInput('')
    setPendingImage(null)
    runAssistant(history, img)
  }

  if (!mounted || !open) return null

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-end sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)} />

      {/* Panel */}
      <div className="relative flex h-[92vh] w-full flex-col bg-white shadow-2xl sm:h-[640px] sm:max-h-[85vh] sm:w-[400px] sm:border sm:border-border">
        {/* Header */}
        <div className="flex items-center gap-3 bg-primary px-4 py-3.5 text-white">
          <span className="relative flex h-10 w-10 items-center justify-center bg-white/15">
            <Sparkles size={20} />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-primary bg-green-400" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-display text-base font-semibold leading-tight">Asistente Báez</p>
            <p className="text-[11px] text-white/70 leading-tight">En línea · responde al instante</p>
          </div>
          <a
            href={HANDOFF_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Hablar con una persona por WhatsApp"
            className="flex h-9 w-9 items-center justify-center bg-white/15 text-white hover:bg-[#25D366] transition-colors"
            aria-label="Hablar con una persona por WhatsApp"
          >
            <MessageCircle size={18} />
          </a>
          <button onClick={() => onOpenChange(false)} className="p-1.5 text-white/80 hover:text-white" aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-bone px-4 py-4">
          {messages.map(msg => (
            <div key={msg.id} className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
              <div className={`max-w-[85%] ${msg.role === 'user' ? '' : 'w-full'}`}>
                {msg.image && (
                  <div className="relative mb-1 h-40 w-40 overflow-hidden border border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={msg.image} alt="Foto enviada" className="h-full w-full object-cover" />
                  </div>
                )}
                {msg.text && (
                  <div
                    className={`px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-white text-ink border border-border'
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {msg.products.map(p => (
                      <ProductMiniCard key={p.id} product={p} onNavigate={() => onOpenChange(false)} />
                    ))}
                  </div>
                )}
                {msg.whatsapp && (
                  <a
                    href={HANDOFF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex w-full items-center justify-center gap-2 bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1fba58] transition-colors"
                  >
                    <MessageCircle size={16} />
                    Hablar por WhatsApp (+54 9 11 6365-8651)
                  </a>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="flex gap-1 bg-white border border-border px-3.5 py-3">
                <Dot /> <Dot delay="0.15s" /> <Dot delay="0.3s" />
              </div>
            </div>
          )}

          {/* Quick prompts (solo al inicio) */}
          {messages.length === 1 && !typing && (
            <div className="flex flex-wrap gap-2 pt-1">
              {QUICK_PROMPTS.map(q => (
                <button
                  key={q}
                  onClick={() => sendText(q)}
                  className="border border-primary/30 bg-white px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border bg-white px-3 py-2.5">
          {/* Previsualización de la foto adjunta */}
          {pendingImage && (
            <div className="mb-2 flex items-center gap-2">
              <div className="relative h-16 w-16 overflow-hidden border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pendingImage.dataUrl} alt="Foto adjunta" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPendingImage(null)}
                  aria-label="Quitar foto"
                  className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center bg-black/60 text-white hover:bg-black/80"
                >
                  <X size={12} />
                </button>
              </div>
              <span className="text-xs text-muted">Foto lista. Escribí una descripción (opcional) y enviá.</span>
            </div>
          )}

          <form
            onSubmit={e => { e.preventDefault(); handleSend() }}
            className="flex items-center gap-1.5"
          >
            <input ref={fileRef} type="file" accept="image/*" onChange={onPickFile} className="hidden" />
            <input ref={cameraRef} type="file" accept="image/*" capture="environment" onChange={onPickFile} className="hidden" />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex h-10 w-9 shrink-0 items-center justify-center text-primary hover:bg-primary/10 transition-colors"
              aria-label="Adjuntar foto de la galería"
            >
              <ImagePlus size={20} />
            </button>
            <button
              type="button"
              onClick={() => cameraRef.current?.click()}
              className="flex h-10 w-9 shrink-0 items-center justify-center text-primary hover:bg-primary/10 transition-colors"
              aria-label="Sacar foto con la cámara"
            >
              <Camera size={20} />
            </button>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={pendingImage ? 'Describí lo que necesitás…' : 'Escribí tu consulta…'}
              className="min-w-0 flex-1 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={!input.trim() && !pendingImage}
              className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent text-white hover:bg-accent-hover disabled:opacity-40 transition-colors"
              aria-label="Enviar"
            >
              <Send size={18} />
            </button>
          </form>
          <p className="mt-1.5 text-center text-[10px] text-muted">
            Asistente de demostración · respuestas orientativas
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

function ProductMiniCard({ product, onNavigate }: { product: Product; onNavigate: () => void }) {
  return (
    <div className="flex gap-3 border border-border bg-white p-2.5">
      <div className="relative h-16 w-16 shrink-0 bg-bone">
        <Image src={product.images[0]} alt={product.name} fill className="object-contain p-1" sizes="64px" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted">{product.brand}</p>
        <p className="line-clamp-2 text-xs font-medium text-ink leading-snug">{product.name}</p>
        <p className="mt-0.5 font-display text-sm font-semibold text-primary">
          ${product.price.toLocaleString('es-AR')}
        </p>
        <div className="mt-1 flex gap-2">
          <Link
            href={`/productos/${product.slug}`}
            onClick={onNavigate}
            className="text-[11px] font-semibold text-primary underline underline-offset-2"
          >
            Ver producto
          </Link>
          <a
            href={whatsappUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-semibold text-[#1fa855]"
          >
            <MessageCircle size={12} /> Consultar
          </a>
        </div>
      </div>
    </div>
  )
}

function Dot({ delay = '0s' }: { delay?: string }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
      style={{ animationDelay: delay }}
    />
  )
}
