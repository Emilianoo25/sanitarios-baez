'use client'

import { Sparkles, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AIModalPlaceholder } from './AIModalPlaceholder'

export function AIButton() {
  const [open, setOpen] = useState(false)
  const [hint, setHint] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('baez-ai-hint')) return
    const show = setTimeout(() => setHint(true), 1300)
    const hide = setTimeout(() => dismissHint(), 11000)
    return () => { clearTimeout(show); clearTimeout(hide) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function dismissHint() {
    setHint(false)
    try { sessionStorage.setItem('baez-ai-hint', '1') } catch {}
  }

  function openAssistant() {
    dismissHint()
    setOpen(true)
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex items-center">
        {/* Callout */}
        <AnimatePresence>
          {hint && (
            <motion.div
              initial={{ opacity: 0, x: 16, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 16, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative mr-3 w-52 bg-white p-3.5 shadow-[0_12px_40px_-8px_rgba(10,77,140,0.35)] border border-border"
            >
              <button
                onClick={dismissHint}
                aria-label="Cerrar aviso"
                className="absolute right-1.5 top-1.5 text-gray-300 hover:text-ink transition-colors"
              >
                <X size={14} />
              </button>
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                <Sparkles size={12} /> Nuevo
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug text-ink">
                Asistente IA
              </p>
              <p className="mt-0.5 text-xs leading-snug text-muted">
                Preguntá lo que quieras o mandá una foto y te recomiendo.
              </p>
              {/* Flecha hacia el botón */}
              <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-b border-r border-border bg-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón */}
        <div className="relative">
          {hint && (
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/40" />
          )}
          <motion.button
            onClick={openAssistant}
            animate={hint ? { scale: [1, 1.12, 1] } : { scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: hint ? 1.4 : 2.5, ease: 'easeInOut' }}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Abrir asistente IA"
          >
            <Sparkles size={22} />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[9px] font-bold leading-none text-white">
              IA
            </span>
          </motion.button>
        </div>
      </div>

      <AIModalPlaceholder open={open} onOpenChange={setOpen} />
    </>
  )
}
