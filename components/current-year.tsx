"use client";

import { useEffect, useState } from "react";

/**
 * Año actual que se actualiza solo. La página es estática (se genera al compilar),
 * así que el año del servidor queda fijo hasta la próxima publicación.
 *
 * Se parte del año con que se generó la página (`buildYear`, que pasa el servidor)
 * para que el primer render coincida con el HTML; luego, ya en el navegador, se
 * cambia al año real. Como el valor cambia de verdad, React sí actualiza el texto.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const [year, setYear] = useState(buildYear);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year}</>;
}
