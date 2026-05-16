'use client'

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface SheetCtx {
  open: boolean
  onOpenChange: (open: boolean) => void
}
const SheetContext = React.createContext<SheetCtx>({ open: false, onOpenChange: () => {} })

function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}) {
  return (
    <SheetContext.Provider value={{ open: !!open, onOpenChange: onOpenChange ?? (() => {}) }}>
      {children}
    </SheetContext.Provider>
  )
}

function SheetTrigger({ children, ...props }: React.ComponentPropsWithoutRef<"button">) {
  const { onOpenChange } = React.useContext(SheetContext)
  return (
    <button type="button" onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  )
}

const SIDE_CLASSES = {
  right: "right-0 inset-y-0 h-full w-3/4 max-w-sm border-l",
  left: "left-0 inset-y-0 h-full w-3/4 max-w-sm border-r",
  top: "top-0 inset-x-0 h-auto border-b",
  bottom: "bottom-0 inset-x-0 h-auto border-t",
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  side?: "left" | "right" | "top" | "bottom"
  showCloseButton?: boolean
}) {
  const { open, onOpenChange } = React.useContext(SheetContext)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => { setMounted(true) }, [])

  if (!mounted || !open) return null

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          "fixed z-50 flex flex-col bg-white shadow-xl border-border",
          SIDE_CLASSES[side],
          className
        )}
        {...props}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute right-3 top-3 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-ink transition-colors"
            aria-label="Cerrar"
          >
            <X size={16} />
          </button>
        )}
        {children}
      </div>
    </>,
    document.body
  )
}

function SheetClose({ children, ...props }: React.ComponentPropsWithoutRef<"button">) {
  const { onOpenChange } = React.useContext(SheetContext)
  return (
    <button type="button" onClick={() => onOpenChange(false)} {...props}>
      {children}
    </button>
  )
}

function SheetHeader({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex flex-col gap-0.5 p-4", className)} {...props} />
}

function SheetFooter({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
}

function SheetTitle({ className, ...props }: React.ComponentPropsWithoutRef<"h2">) {
  return (
    <h2 className={cn("font-display text-lg font-medium text-ink", className)} {...props} />
  )
}

function SheetDescription({ className, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-sm text-gray-500", className)} {...props} />
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
