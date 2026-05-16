import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { whatsappBaseUrl } from '@/lib/whatsapp'

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Container className="py-12">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-medium text-ink">Contacto</h1>
          <p className="text-muted mt-3">
            Consultá por productos, presupuestos y asesoramiento.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <form
              className="space-y-5"
              aria-label="Formulario de contacto"
              noValidate
            >
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-ink mb-1.5"
                >
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  className="w-full rounded-md border border-border px-3 py-2.5 text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium text-ink mb-1.5"
                >
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  autoComplete="tel"
                  className="w-full rounded-md border border-border px-3 py-2.5 text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder="+54 11 XXXX-XXXX"
                />
              </div>
              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-sm font-medium text-ink mb-1.5"
                >
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  className="w-full rounded-md border border-border px-3 py-2.5 text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary bg-white resize-none"
                  placeholder="Contanos qué necesitás..."
                />
              </div>
              <a
                href={whatsappBaseUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-white hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Enviar consulta por WhatsApp
              </a>
              <p className="text-xs text-muted text-center">
                Te respondemos en menos de 2 horas en horario comercial.
              </p>
            </form>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-ink">Ubicación</p>
                <p className="text-sm text-muted mt-0.5">
                  Villa Madero, Buenos Aires, Argentina
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={20} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-ink">WhatsApp</p>
                <a
                  href={whatsappBaseUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-primary transition-colors mt-0.5 block"
                >
                  +54 9 11 6365-8651
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={20} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-ink">Email</p>
                <a
                  href="mailto:sanitariosbaezcorp@gmail.com"
                  className="text-sm text-muted hover:text-primary transition-colors mt-0.5 block"
                >
                  sanitariosbaezcorp@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={20} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-ink">Horario</p>
                <p className="text-sm text-muted mt-0.5">
                  Lunes a viernes 9–18 hs · Sábados 9–13 hs
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
