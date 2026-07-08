"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 20, suffix: "+", label: "Proyectos entregados" },
  { value: 2, suffix: " sem.", label: "Plazo medio de entrega" },
  { value: 48, suffix: "h", label: "Tiempo de respuesta" },
  { value: 100, suffix: "%", label: "Clientes satisfechos" },
];

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let frame: number;

    function step(timestamp: number) {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

function StatItem({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const value = useCountUp(stat.value, inView);

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
      <p className="text-3xl font-bold text-primary sm:text-4xl">
        {value}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm text-white/60">{stat.label}</p>
    </div>
  );
}

export function StatsColumn() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {STATS.map((stat) => (
        <StatItem key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
