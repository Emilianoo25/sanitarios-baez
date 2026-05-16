import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef } from "react"

function Badge({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium transition-colors",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
