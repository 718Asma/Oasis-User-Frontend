import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import "../styles/slider.css";

const sliderVariants = cva(
  "relative h-2 rounded-full bg-gray-700", 
  {
    variants: {
      variant: {
        default: "bg-gray-700",
        secondary: "bg-gray-600",
        destructive: "bg-gray-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SliderProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof sliderVariants> {
  min?: number;
  max?: number;
  step?: number;
  valueLabel?: boolean; // Add a prop to control label
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      variant,
      className,
      min = 0,
      max = 100,
      step = 1,
      value = 0,
      valueLabel = true, // Show value label by default
      ...props
    },
    ref
  ) => {
    const [thumbPosition, setThumbPosition] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false); // Track dragging state

    const updateThumbPosition = (value: number) => {
      const percent = ((value - min) / (max - min)) * 100;
      setThumbPosition(percent);
    };

    React.useEffect(() => {
      updateThumbPosition(Number(value));
    }, [value]);

    // Handlers to show/hide the label during interaction
    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    const handleTouchStart = () => setIsDragging(true);
    const handleTouchEnd = () => setIsDragging(false);

    return (
      <div className="relative w-64">
        {/* Show the value label only when the thumb is moving */}
        {valueLabel && isDragging && (
          <div
            className="absolute bottom-6 left-0 transform -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded-md"
            style={{ left: `calc(${thumbPosition}% - 12px)` }} // Adjust bubble position
          >
            {value}
          </div>
        )}
        <div className="flex items-center space-x-2">
          <input
            ref={ref}
            type="range"
            className={cn(
              "appearance-none w-full h-2 bg-gray-700 rounded-full",
              "focus:outline-none",
              "slider-thumb",
              sliderVariants({ variant }),
              className
            )}
            min={min}
            max={max}
            step={step}
            value={value}
            {...props}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onChange={(e) => {
              props.onChange?.(e);
              updateThumbPosition(Number(e.target.value));
            }}
            style={{
              backgroundSize: `${((Number(value) || min) - min) * 100 / (max - min)}% 100%`,
            }}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider, sliderVariants };
