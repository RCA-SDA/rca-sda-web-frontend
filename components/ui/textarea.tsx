import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-gray-500 selection:bg-yellow-400 selection:text-black bg-white border-black min-h-20 w-full border-4 px-4 py-3 text-base font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[-2px] focus:translate-y-[-2px]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
