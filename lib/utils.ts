export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function buildContactLinks(phone: string) {
  const digits = phone.replace(/[^0-9]/g, "")
  return {
    phoneTel: `tel:+${digits}`,
    whatsappUrl: `https://wa.me/${digits}`,
  }
}
