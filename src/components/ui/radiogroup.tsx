import * as React from "react";
import { cn } from "@/lib/utils";
import { Radio } from "./radio"; // Adjust the import based on your file structure

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  options,
  className,
}) => {
  return (
    <div className={cn("flex flex-row", className)}>
      {options.map((option) => (
        <label key={option.value} className="flex items-center">
          <Radio
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <span className="ml-2" style={{ marginRight: '35px' }}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export { RadioGroup };
