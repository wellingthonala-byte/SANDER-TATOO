/**
 * Single source of truth for studio information.
 * Everything user-facing (SEO, contacts, links) is derived from here.
 */
export const siteConfig = {
  name: "Sander Tattoo Ink",
  shortName: "Sander Ink",
  tagline: "Estúdio de tatuagem em Fortaleza",
  description:
    "Estúdio de tatuagem especializado em realismo, fine line e blackwork. Projetos exclusivos, biossegurança rigorosa e acabamento impecável em Fortaleza.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sandertattooink.com.br").replace(/\/$/, ""),
  locale: "pt_BR",
  founded: "2014",
  contact: {
    phoneLabel: "(88) 99962-5746",
    phoneHref: "tel:+5588999625746",
    whatsapp: "5588999625746",
    email: "contato@sandertattooink.com.br",
    instagram: "@sandertattooink",
    instagramUrl: "https://instagram.com/sandertattooink",
  },
  address: {
    street: "Rua General Onofre, 453",
    district: "Mondubim",
    city: "Fortaleza",
    state: "CE",
    /** Deixe vazio para omitir o CEP do rodapé. */
    zip: "",
    country: "BR",
    mapsUrl:
      "https://maps.google.com/?q=Rua+General+Onofre+453+Mondubim+Fortaleza+CE",
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
