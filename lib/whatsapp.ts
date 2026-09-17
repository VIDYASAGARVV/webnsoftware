export function getWhatsAppUrl(message: string) {
  const phoneNumber = "918341914191";

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}