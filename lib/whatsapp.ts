const WHATSAPP_NUMBER = "56934300536";

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DIAGNOSIS_URL = buildWhatsAppUrl(
  "Hola Alejandro, quiero el diagnóstico gratis de mi perfil de Google Maps. Mi negocio se llama: "
);

export const WHATSAPP_MAPS_URL = buildWhatsAppUrl(
  "Hola Alejandro, quiero el Pack Google Maps para ordenar la ficha de mi negocio."
);

export const WHATSAPP_WEB_URL = buildWhatsAppUrl(
  "Hola Alejandro, quiero cotizar un sitio web para mi negocio."
);

export const WHATSAPP_WEB_TYPE_URLS = {
  ecommerce: buildWhatsAppUrl("Hola Alejandro, quiero cotizar una tienda online para mi negocio."),
  booking: buildWhatsAppUrl("Hola Alejandro, quiero cotizar un sistema de reservas para mi negocio."),
  landing: buildWhatsAppUrl("Hola Alejandro, quiero cotizar una landing page para mi negocio."),
  corporate: buildWhatsAppUrl("Hola Alejandro, quiero cotizar una web corporativa para mi negocio."),
};

export const WHATSAPP_BOTH_URL = buildWhatsAppUrl(
  "Hola Alejandro, quiero cotizar el Pack Web + Maps: mi ficha de Google Maps y una página web para mi negocio."
);

export const WHATSAPP_GROWTH_URL = buildWhatsAppUrl(
  "Hola Alejandro, quiero cotizar el Pack Más Clientes: atraer clientes nuevos y ver cada mes cuántos llegan."
);

export const WHATSAPP_CONTACT_URL = buildWhatsAppUrl(
  "Hola Alejandro, tengo una consulta sobre tu trabajo."
);
