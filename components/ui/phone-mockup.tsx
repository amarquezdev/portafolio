import Image from "next/image";

import { cn } from "@/lib/utils";

/** Marco de celular con borde de titanio, botones laterales e isla superior. */
export function PhoneMockup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative rounded-[3rem] bg-gradient-to-b from-[#4a4a4f] via-[#232326] to-[#3a3a3e] p-[3px] shadow-[0_50px_100px_-30px_rgb(0_0_0/0.9)]",
        className
      )}
    >
      {/* Botones laterales */}
      <span className="absolute -left-[3px] top-[18%] h-8 w-[3px] rounded-l bg-[#3a3a3e]" />
      <span className="absolute -left-[3px] top-[27%] h-12 w-[3px] rounded-l bg-[#3a3a3e]" />
      <span className="absolute -right-[3px] top-[24%] h-16 w-[3px] rounded-r bg-[#3a3a3e]" />

      <div className="rounded-[2.85rem] bg-black p-[9px]">
        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.3rem] bg-neutral-900">
          {children}
          <span className="absolute left-1/2 top-2.5 z-10 h-[22px] w-[30%] -translate-x-1/2 rounded-full bg-black" />
          {/* Reflejo del vidrio */}
          <span className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
}

/**
 * Captura alta que se recorre de arriba abajo dentro de la pantalla. `className` va en la capa
 * exterior (para entrar o salir con transiciones); el recorrido va en la interior.
 * Con `scrolling` en false queda quieta arriba; al volver a true el recorrido parte de cero.
 */
export function ScreenScroll({
  src,
  alt,
  width,
  height,
  sizes,
  priority,
  scrolling = true,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  scrolling?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden [container-type:size]", className)}>
      <div className={cn(scrolling && "animate-screen-pan")}>
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className="block h-auto w-full" />
      </div>
    </div>
  );
}
