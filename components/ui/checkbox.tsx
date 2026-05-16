'use client'

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface CheckboxProps {
  id?: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  className?: string
  onCheckedChange?: (checked: boolean) => void
}

function Checkbox({ id, checked, disabled, className, onCheckedChange }: CheckboxProps) {
  return (
    <button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange?.(!checked)}
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded border border-input transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        checked ? "bg-primary border-primary" : "bg-white",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {checked && <Check size={11} className="text-white" strokeWidth={3} />}
    </button>
  )
}

export { Checkbox }
