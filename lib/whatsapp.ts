import { siteConfig } from "@/lib/site";

/**
 * Builds a wa.me deep link with a pre-filled message so every CTA on the page
 * arrives in the studio inbox already tagged with its origin.
 */
export function whatsappLink(message?: string) {
  const text = encodeURIComponent(
    message ??
      `Olá! Vim pelo site da ${siteConfig.name} e gostaria de fazer um orçamento de tatuagem.`,
  );
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${text}`;
}
