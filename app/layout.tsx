import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { MotionProvider } from "@/components/common/motion-provider";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { siteConfig } from "@/lib/site";
import "./globals.css";

// Cormorant Garamond has no variable build: every weight is a separate file,
// a separate preload and a later font swap (which pushes LCP out). The design
// only needs the light cut, so that is all that ships.
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Estúdio de Tatuagem em São Paulo`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "tatuagem",
    "estúdio de tatuagem",
    "tatuagem realismo",
    "fine line",
    "blackwork",
    "fechamento de braço",
    "tatuador São Paulo",
    "Vila Madalena",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Estúdio de Tatuagem em São Paulo`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — arte, técnica e propósito`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Estúdio de Tatuagem em São Paulo`,
    description: siteConfig.description,
    images: ["/images/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="bg-ink text-foreground antialiased">
        <MotionProvider>{children}</MotionProvider>
        <LocalBusinessSchema />
      </body>
    </html>
  );
}
