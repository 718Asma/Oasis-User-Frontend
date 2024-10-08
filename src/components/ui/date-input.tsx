import * as React from "react"
import { cn } from "@/lib/utils"

export interface DateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value?: Date | null; // Allow Date or null as a value
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, value, ...props }, ref) => {
    const stringValue = value ? value.toISOString().split('T')[0] : '';

    return (
      <input
        type="date"
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        value={stringValue}
        {...props}
      />
    )
  }
)

DateInput.displayName = "DateInput"

export { DateInput }
