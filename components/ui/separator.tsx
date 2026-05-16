import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef } from "react"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: ComponentPropsWithoutRef<"hr"> & { orientation?: "horizontal" | "vertical" }) {
  return (
    <hr
      className={cn(
        "shrink-0 bg-border border-0",
        orientation === "horizontal" ? "h-px w-full" : "w-px self-stretch h-auto",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
