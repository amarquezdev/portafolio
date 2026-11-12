import { Fragment, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from "react";

// Etiquetas de texto que se recorren para separar sus palabras (conservan su estilo)
const TEXT_TAGS = new Set(["span", "em", "strong", "b", "i", "p"]);

/**
 * Separa el texto en palabras para que, cuando un Reveal de más arriba entra en pantalla, cada
 * una aparezca desvaneciéndose y deslizándose, una tras otra (estilos .rw en globals.css).
 * Otros elementos (un link, un bloque con botones) entran enteros en su turno.
 */
export function SplitWords({ children }: { children: ReactNode }) {
  let n = 0;

  function split(node: ReactNode): ReactNode {
    if (typeof node === "string") {
      return node.split(/(\s+)/).map((part, k) =>
        part === "" || /^\s+$/.test(part) ? (
          part
        ) : (
          <span key={k} className="rw">
            <span style={{ "--wi": n++ } as CSSProperties}>{part}</span>
          </span>
        )
      );
    }
    if (Array.isArray(node)) return node.map((child, k) => <Fragment key={k}>{split(child)}</Fragment>);
    if (!isValidElement(node)) return node;

    const el = node as ReactElement<{ children?: ReactNode; style?: CSSProperties }>;
    if (el.type === Fragment) return split(el.props.children);
    if (typeof el.type === "string" && TEXT_TAGS.has(el.type)) {
      return cloneElement(el, undefined, split(el.props.children));
    }
    if (typeof el.type === "string") {
      return cloneElement(el, {
        "data-word-block": "",
        style: { ...el.props.style, "--wi": n++ } as CSSProperties,
      } as Record<string, unknown>);
    }
    return el;
  }

  return <>{split(children)}</>;
}

/**
 * Tiempos de las palabras, para el style del elemento que contiene el SplitWords.
 * base: retraso de la primera palabra; step: separación entre palabras (ambos en ms).
 */
export const wordTiming = (base: number, step = 55) =>
  ({ "--word-base": `${base}ms`, "--word-step": `${step}ms` }) as CSSProperties;
