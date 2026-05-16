'use client'

import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { AIModalPlaceholder } from './AIModalPlaceholder'

export function AIButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label="Abrir asistente IA"
      >
        <Sparkles size={22} />
      </motion.button>
      <AIModalPlaceholder open={open} onOpenChange={setOpen} />
    </>
  )
}
