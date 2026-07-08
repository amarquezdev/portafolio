const WHATSAPP_NUMBER = "56934300536";

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_BUDGET_URL = buildWhatsAppUrl(
  "Hola, me gustaría solicitar un presupuesto para mi sitio web."
);

export const WHATSAPP_CONTACT_URL = buildWhatsAppUrl(
  "Hola, me gustaría hablar sobre sus servicios de diseño web."
);
