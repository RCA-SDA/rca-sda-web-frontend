import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center border-3 border-black px-3 py-1 text-xs font-black uppercase tracking-wide w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-yellow-400 text-black [a&]:hover:bg-yellow-300",
        secondary: "bg-blue-400 text-white [a&]:hover:bg-blue-300",
        destructive: "bg-red-500 text-white [a&]:hover:bg-red-400",
        outline: "bg-white text-black [a&]:hover:bg-gray-100",
        ghost: "border-0 shadow-none [a&]:hover:bg-gray-100",
        link: "border-0 shadow-none text-black underline-offset-4 [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
