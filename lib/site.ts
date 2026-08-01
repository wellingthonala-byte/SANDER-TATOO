/**
 * Single source of truth for studio information.
 * Everything user-facing (SEO, contacts, links) is derived from here.
 */
export const siteConfig = {
  name: "Sander Tattoo Ink",
  shortName: "Sander Ink",
  tagline: "Estúdio de tatuagem em São Paulo",
  description:
    "Estúdio de tatuagem especializado em realismo, fine line e blackwork. Projetos exclusivos, biossegurança rigorosa e acabamento impecável em São Paulo.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sandertattooink.com.br").replace(/\/$/, ""),
  locale: "pt_BR",
  founded: "2014",
  contact: {
    phoneLabel: "(11) 98765-4321",
    phoneHref: "tel:+5511987654321",
    whatsapp: "5511987654321",
    email: "contato@sandertattooink.com.br",
    instagram: "@sandertattooink",
    instagramUrl: "https://instagram.com/sandertattooink",
  },
  address: {
    street: "Rua das Artes, 123",
    district: "Vila Madalena",
    city: "São Paulo",
    state: "SP",
    zip: "05434-000",
    country: "BR",
    mapsUrl: "https://maps.google.com/?q=Rua+das+Artes+123+Vila+Madalena+Sao+Paulo",
    geo: { latitude: -23.5546, longitude: -46.6903 },
  },
  hours: [
    { days: "Segunda a Sábado", time: "11h às 20h" },
    { days: "Domingo", time: "Sob agendamento" },
  ],
  openingHoursSchema: [
    "Mo-Sa 11:00-20:00",
  ],
  credits: {
    label: "@seu.dev",
    url: "https://github.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
