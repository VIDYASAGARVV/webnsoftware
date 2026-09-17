import { getWhatsAppUrl } from "../lib/whatsapp";

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppUrl(
        "Hi WebNSoftware, I would like to know more about your services."
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact WebNSoftware on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl shadow-2xl shadow-green-500/30 transition duration-300 hover:scale-110 hover:bg-green-400"
    >
      💬
    </a>
  );
}