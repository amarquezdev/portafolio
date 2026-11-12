"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type HTMLAttributes } from "react";

/**
 * Muestra su contenido al entrar en pantalla, una sola vez. Los estilos están en globals.css:
 * - "up": el bloque sube y aparece.
 * - "stagger": cada hijo directo entra un poco después del anterior.
 * - "rise": como stagger, pero cada hijo sube desde más abajo y se asienta con un leve rebote.
 * - "heading": encabezado de sección (la línea se dibuja, luego el título y el texto).
 * Solo se oculta si el script del layout marcó la página con .reveal-ready (con JS), así sin JS
 * o con "reducir movimiento" todo se ve normal.
 */
export function Reveal({
  as: Tag = "div",
  variant = "up",
  delay,
  style,
  ...props
}: HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  variant?: "up" | "stagger" | "rise" | "heading";
  /** Retraso extra en milisegundos */
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (variant === "stagger" || variant === "rise") {
      Array.from(node.children).forEach((child, i) => (child as HTMLElement).style.setProperty("--i", String(i)));
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.setAttribute("data-revealed", "");
        observer.disconnect();
      },
      // Espera a que el bloque asome un poco por encima del borde inferior
      { rootMargin: "0px 0px -12% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [variant]);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      style={delay ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties) : style}
      {...props}
    />
  );
}
