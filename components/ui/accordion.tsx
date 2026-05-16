'use client'

import { createContext, useContext, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface AccordionCtx {
  openItems: string[]
  toggle: (value: string) => void
}
const AccordionContext = createContext<AccordionCtx>({ openItems: [], toggle: () => {} })

interface AccordionItemCtx { value: string }
const ItemContext = createContext<AccordionItemCtx>({ value: "" })

interface AccordionProps {
  children: ReactNode
  defaultValue?: string | string[]
  multiple?: boolean
  className?: string
}

function Accordion({ children, defaultValue, multiple = false, className }: AccordionProps) {
  const initial = defaultValue
    ? Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    : []
  const [openItems, setOpenItems] = useState<string[]>(initial)

  function toggle(value: string) {
    setOpenItems(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : multiple ? [...prev, value] : [value]
    )
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={cn("flex w-full flex-col", className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

function AccordionItem({
  value,
  children,
  className,
}: {
  value: string
  children: ReactNode
  className?: string
}) {
  return (
    <ItemContext.Provider value={{ value }}>
      <div className={cn("border-b border-border last:border-b-0", className)}>
        {children}
      </div>
    </ItemContext.Provider>
  )
}

function AccordionTrigger({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { openItems, toggle } = useContext(AccordionContext)
  const { value } = useContext(ItemContext)
  const isOpen = openItems.includes(value)

  return (
    <button
      type="button"
      onClick={() => toggle(value)}
      aria-expanded={isOpen}
      className={cn(
        "flex w-full items-center justify-between py-3 text-left text-sm font-medium text-ink transition-all hover:underline",
        className
      )}
    >
      {children}
      <ChevronDown
        size={16}
        className={cn(
          "shrink-0 text-gray-400 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  )
}

function AccordionContent({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { openItems } = useContext(AccordionContext)
  const { value } = useContext(ItemContext)

  if (!openItems.includes(value)) return null

  return (
    <div className={cn("pb-3 text-sm", className)}>
      {children}
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
