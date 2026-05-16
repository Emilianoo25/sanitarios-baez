'use client'

import { cn } from "@/lib/utils"

interface SliderProps {
  value?: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  className?: string
  disabled?: boolean
  onValueChange?: (value: number[]) => void
  "aria-label"?: string
}

function Slider({
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  className,
  disabled,
  onValueChange,
  "aria-label": ariaLabel,
}: SliderProps) {
  const current = value?.[0] ?? defaultValue?.[0] ?? max
  const pct = ((current - min) / (max - min)) * 100

  return (
    <div className={cn("relative flex h-5 w-full items-center", className)}>
      <div className="relative h-1 w-full rounded-full bg-gray-200">
        <div
          className="absolute h-full rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(e) => onValueChange?.([Number(e.target.value)])}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
      <div
        className="pointer-events-none absolute size-3.5 rounded-full border-2 border-primary bg-white shadow"
        style={{ left: `calc(${pct}% - 7px)` }}
      />
    </div>
  )
}

export { Slider }
