import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-black placeholder:text-gray-500 selection:bg-yellow-400 selection:text-black bg-white border-black h-11 w-full min-w-0 border-4 px-4 py-3 text-base font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-black disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[-2px] focus:translate-y-[-2px]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
