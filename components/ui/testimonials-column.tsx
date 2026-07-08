"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export interface Testimonial {
  text: string;
  name: string;
  role: string;
  initials: string;
}

interface TestimonialsColumnProps {
  testimonials: Testimonial[];
  duration?: number;
  className?: string;
}

export function TestimonialsColumn({
  testimonials,
  duration = 20,
  className,
}: TestimonialsColumnProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col gap-4"
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
          >
            <div className="mb-3 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-3.5 w-3.5 fill-primary text-primary" />
              ))}
            </div>
            <p className="mb-4 text-sm text-white/70">{t.text}</p>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{t.name}</p>
                <p className="text-xs text-white/50">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
