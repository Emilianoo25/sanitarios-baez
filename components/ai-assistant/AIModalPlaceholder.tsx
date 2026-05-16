'use client'

import { Sparkles, Check, MessageCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { whatsappBaseUrl } from '@/lib/whatsapp'

interface AIModalPlaceholderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CAPABILITIES = [
  'Responder consultas sobre productos al instante',
  'Recomendarte el combo ideal para tu reforma',
  'Analizar fotos de tu ambiente y sugerir productos',
  'Asesorarte 24/7 sobre marcas y especificaciones',
]

export function AIModalPlaceholder({ open, onOpenChange }: AIModalPlaceholderProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => onOpenChange(isOpen)}>
      <DialogContent className="max-w-md" showCloseButton>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" size={22} />
            <DialogTitle className="font-display text-2xl font-medium">
              Asistente IA Báez
            </DialogTitle>
            <Badge className="bg-accent text-white text-[10px] py-0 px-1.5">
              Próximamente
            </Badge>
          </div>
        </DialogHeader>

        <p className="text-sm text-muted mt-2">
          Nuestro asistente con inteligencia artificial te ayudará a:
        </p>

        <ul className="mt-4 space-y-3">
          {CAPABILITIES.map(cap => (
            <li key={cap} className="flex items-start gap-3">
              <Check size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm text-ink">{cap}</span>
            </li>
          ))}
        </ul>

        <Separator className="my-4" />

        <p className="text-sm text-muted">Mientras tanto, podés consultar directamente:</p>
        <a
          href={whatsappBaseUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-3 text-sm font-medium text-white hover:bg-[#1fba58] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
        >
          <MessageCircle size={16} />
          Hablar por WhatsApp con Báez
        </a>
      </DialogContent>
    </Dialog>
  )
}
