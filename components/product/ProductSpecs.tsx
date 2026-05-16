import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { ProductSpec } from '@/types'

interface ProductSpecsProps {
  specs: ProductSpec[]
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <Accordion defaultValue={['specs']} multiple>
      <AccordionItem value="specs">
        <AccordionTrigger className="text-sm font-medium">
          Especificaciones
        </AccordionTrigger>
        <AccordionContent>
          <dl className="divide-y divide-border">
            {specs.map(spec => (
              <div key={spec.key} className="flex justify-between py-2.5 text-sm">
                <dt className="text-muted">{spec.key}</dt>
                <dd className="font-medium text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="shipping">
        <AccordionTrigger className="text-sm font-medium">
          Envíos y devoluciones
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted leading-relaxed">
            Envío en el día para CABA y GBA. Coordinar entrega via WhatsApp. Devoluciones dentro de los 30 días con producto sin uso.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="warranty">
        <AccordionTrigger className="text-sm font-medium">
          Garantía
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted leading-relaxed">
            Garantía oficial del fabricante. Para griferías FV: 5 años. Para sanitarios Ferrum: 1 año. Consultar por WhatsApp para activar garantía.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
