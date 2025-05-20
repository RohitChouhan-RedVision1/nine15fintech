import * as React from "react";
import { cn } from "@/lib/utils"; // Utility function for combining class names

// Slider component
const Slider = React.forwardRef(({ className, value, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
  return (
    <div className={cn("relative w-full", className)} {...props}>
      <input
        ref={ref}
        type="range"
        value={value}
        onChange={(e) => onValueChange([parseInt(e.target.value)])}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-[var] rounded-full  focus:outline-none"
      />
      <div
        className="absolute top-0 left-0  w-full h-2 accent-[#d7d8d8] rounded-full"
        style={{ width: `${((value - min) / (max - min)) * 100}%` }}
      ></div>
    </div>
  );
});
Slider.displayName = "Slider";

export { Slider };
