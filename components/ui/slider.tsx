"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, onValueChange, min, max, step = 1, ...props }, ref) => {
    const percent = ((value - min) / (max - min)) * 100;
    return (
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onValueChange(Number(e.target.value))}
        className={cn(
          "h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary",
          "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer",
          className
        )}
        style={{
          background: `linear-gradient(to right, var(--primary) ${percent}%, var(--muted) ${percent}%)`,
        }}
        {...props}
      />
    );
  }
);
Slider.displayName = "Slider";

export { Slider };
