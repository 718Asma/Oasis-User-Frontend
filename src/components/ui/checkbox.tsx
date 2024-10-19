import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <label className={cn("flex items-center cursor-pointer", className)}>
        <input
          type="checkbox"
          className={cn(
            "appearance-none h-5 w-5 border border-gray-300 rounded-sm checked:bg-ring checked:border-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <span className="ml-2 text-sm text-gray-700">{props.children}</span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };