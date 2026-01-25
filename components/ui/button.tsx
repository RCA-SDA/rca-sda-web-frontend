import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-black uppercase tracking-wide transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]",
  {
    variants: {
      variant: {
        default: "bg-yellow-400 text-black hover:bg-yellow-300",
        destructive: "bg-red-500 text-white hover:bg-red-400",
        outline: "bg-white text-black hover:bg-gray-100",
        secondary: "bg-blue-400 text-white hover:bg-blue-300",
        ghost: "border-0 shadow-none hover:shadow-none hover:bg-gray-100 hover:translate-x-0 hover:translate-y-0 active:shadow-none active:translate-x-0 active:translate-y-0",
        link: "border-0 shadow-none text-black underline-offset-4 hover:underline hover:shadow-none hover:translate-x-0 hover:translate-y-0",
      },
      size: {
        default: "h-11 px-6 py-3",
        xs: "h-7 px-3 text-xs",
        sm: "h-9 px-4",
        lg: "h-14 px-8 text-base",
        icon: "size-11",
        "icon-xs": "size-7",
        "icon-sm": "size-9",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
