import * as React from "react"
import { cn } from "@/lib/utils"
import { Pencil } from "lucide-react"

export interface FileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <label className={cn("flex items-center cursor-pointer", className)}>
        <input
          type="file"
          className="hidden"
          ref={ref}
          {...props}
        />
        <div className={cn(
          "flex items-center justify-center h-12 w-12 rounded-full border-2 border-black bg-background text-center ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}>
          <Pencil className="text-lg" />
        </div>
      </label>
    )
  }
)

FileInput.displayName = "FileInput"

export { FileInput }
