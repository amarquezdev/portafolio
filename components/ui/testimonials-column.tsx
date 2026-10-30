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
      <div
        className="flex animate-slide-up flex-col will-change-transform"
        style={{ "--slide-up-duration": `${duration}s` } as React.CSSProperties}
      >
        {/* Espacio con padding bajo cada tarjeta y no con gap: así el bucle del -50% no salta */}
        {[...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className="pb-4">
            <div className="glass rounded-3xl p-6">
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-4 text-sm text-foreground/80">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
