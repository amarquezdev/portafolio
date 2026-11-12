import { Reveal } from "@/components/reveal";
import { SplitWords, wordTiming } from "@/components/split-words";
import { cn } from "@/lib/utils";

/**
 * Encabezado de sección estilo editorial, igual en todas: una línea a todo el ancho que se dibuja
 * al entrar en pantalla, el título grande y, debajo, el texto de apoyo. Todo apilado, para que no
 * dependa de cuánto mide cada texto. Al entrar, las palabras del título aparecen una tras otra y
 * luego las del texto, más rápido (estilos en globals.css).
 */
export function SectionHeading({
  id,
  title,
  children,
  className,
}: {
  /** Ancla para los botones que bajan hasta este encabezado */
  id?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal variant="heading" id={id} className={cn("mb-12 sm:mb-16", className)}>
      <span aria-hidden className="section-rule block h-px w-full origin-left bg-white/15" />
      {/* text-balance reparte las líneas parejas: evita una última línea con una o dos palabras */}
      <h2
        className="mt-8 max-w-5xl text-balance text-[2.6rem] font-semibold leading-[0.95] text-foreground sm:mt-10 sm:text-6xl lg:text-7xl"
        style={wordTiming(200, 100)}
      >
        <SplitWords>{title}</SplitWords>
      </h2>
      {children && (
        <div className="mt-5 max-w-xl text-muted-foreground sm:mt-6" style={wordTiming(800, 22)}>
          <SplitWords>{children}</SplitWords>
        </div>
      )}
    </Reveal>
  );
}
