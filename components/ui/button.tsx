import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentPropsWithoutRef } from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-dark",
        outline: "border border-border bg-white hover:bg-gray-50 text-ink",
        ghost: "hover:bg-gray-100 text-ink",
        secondary: "bg-secondary text-ink hover:bg-gray-100",
        destructive: "bg-red-100 text-red-600 hover:bg-red-200",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-6 px-2 text-xs rounded-md",
        sm: "h-8 px-3 text-xs rounded-md",
        lg: "h-11 px-8",
        icon: "h-9 w-9",
        "icon-xs": "h-6 w-6 rounded-md",
        "icon-sm": "h-7 w-7 rounded-md",
        "icon-lg": "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
