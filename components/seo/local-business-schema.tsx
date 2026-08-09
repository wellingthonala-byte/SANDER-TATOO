import { faqItems } from "@/data/faq";
import { siteConfig } from "@/lib/site";

/**
 * Structured data: LocalBusiness (TattooParlor) + FAQPage.
 * Rendered as a script tag so crawlers pick it up from the static HTML.
 */
export function LocalBusinessSchema() {
  const { address, contact, hours } = siteConfig;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TattooParlor",
        "@id": `${siteConfig.url}/#studio`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        image: `${siteConfig.url}/images/og-image.webp`,
        logo: `${siteConfig.url}/images/logo.webp`,
        telephone: `+55${contact.whatsapp.slice(2)}`,
        email: contact.email,
        priceRange: "$$",
        foundingDate: siteConfig.founded,
        currenciesAccepted: "BRL",
        paymentAccepted: "Dinheiro, Pix, Cartão de crédito",
        address: {
          "@type": "PostalAddress",
          streetAddress: address.street,
          addressLocality: `${address.district}, ${address.city}`,
          addressRegion: address.state,
          postalCode: address.zip,
          addressCountry: address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: address.geo.latitude,
          longitude: address.geo.longitude,
        },
        openingHoursSpecification: siteConfig.openingHoursSchema.map((spec) => {
          const [days, time] = spec.split(" ");
          const [opens, closes] = time.split("-");
          return {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: days,
            opens,
            closes,
          };
        }),
        sameAs: [contact.instagramUrl],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          reviewCount: "184",
          bestRating: "5",
        },
        makesOffer: [
          "Tatuagem realismo",
          "Tatuagem fine line",
          "Blackwork",
          "Fechamento de braço e costas",
          "Tatuagem colorida",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
        additionalProperty: hours.map((entry) => ({
          "@type": "PropertyValue",
          name: entry.days,
          value: entry.time,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Structured data is generated from local config, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
