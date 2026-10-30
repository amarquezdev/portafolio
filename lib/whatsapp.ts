const WHATSAPP_NUMBER = "56934300536";

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DIAGNOSIS_URL = buildWhatsAppUrl(
  "Hola Alejandro, quiero el diagnóstico gratis de mi ficha de Google. Mi negocio se llama: "
);

export const WHATSAPP_MAPS_URL = buildWhatsAppUrl(
  "Hola Alejandro, quiero arreglar la ficha de Google Maps de mi negocio."
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
  "Hola Alejandro, quiero arreglar la ficha de Google Maps de mi negocio y también cotizar un sitio web."
);

export const WHATSAPP_CONTACT_URL = buildWhatsAppUrl(
  "Hola Alejandro, tengo una consulta sobre tu trabajo."
);
