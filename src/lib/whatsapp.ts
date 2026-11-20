/** A wa.me link that opens WhatsApp with the message typed in. The visitor still presses send. */
export function whatsappUrl(number: string, text?: string) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
