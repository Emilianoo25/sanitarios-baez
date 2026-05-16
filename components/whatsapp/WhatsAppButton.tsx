import { MessageCircle } from 'lucide-react'
import { whatsappBaseUrl } from '@/lib/whatsapp'

export function WhatsAppButton() {
  return (
    <a
      href={whatsappBaseUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1fba58] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={22} />
    </a>
  )
}
