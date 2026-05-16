'use client'

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface DialogCtx {
  open: boolean
  onOpenChange: (open: boolean) => void
}
const DialogContext = React.createContext<DialogCtx>({ open: false, onOpenChange: () => {} })

function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}) {
  return (
    <DialogContext.Provider value={{ open: !!open, onOpenChange: onOpenChange ?? (() => {}) }}>
      {children}
    </DialogContext.Provider>
  )
}

function DialogTrigger({ children, ...props }: React.ComponentPropsWithoutRef<"button">) {
  const { onOpenChange } = React.useContext(DialogContext)
  return (
    <button type="button" onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  )
}

function DialogPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function DialogOverlay({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const { onOpenChange } = React.useContext(DialogContext)
  return (
    <div
      className={cn("fixed inset-0 z-50 bg-black/40 backdrop-blur-sm", className)}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { showCloseButton?: boolean }) {
  const { open, onOpenChange } = React.useContext(DialogContext)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => { setMounted(true) }, [])

  if (!mounted || !open) return null

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl sm:max-w-md",
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

function DialogHeader({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />
}

function DialogTitle({ className, ...props }: React.ComponentPropsWithoutRef<"h2">) {
  return (
    <h2 className={cn("font-display text-xl font-medium text-ink", className)} {...props} />
  )
}

function DialogDescription({ className, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-sm text-gray-500", className)} {...props} />
}

function DialogFooter({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("mt-4 flex flex-row justify-end gap-2", className)} {...props} />
  )
}

function DialogClose({ children, ...props }: React.ComponentPropsWithoutRef<"button">) {
  const { onOpenChange } = React.useContext(DialogContext)
  return (
    <button type="button" onClick={() => onOpenChange(false)} {...props}>
      {children}
    </button>
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
