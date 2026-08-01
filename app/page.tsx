import dynamic from "next/dynamic";

import { WhatsappButton } from "@/components/common/whatsapp-button";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { About } from "@/components/sections/about";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";

/**
 * Below-the-fold sections are code-split so the hero ships with the smallest
 * possible bundle. They still render on the server, keeping the HTML complete
 * for crawlers.
 */
const Portfolio = dynamic(() =>
  import("@/components/sections/portfolio").then((mod) => mod.Portfolio),
);
const Timeline = dynamic(() =>
  import("@/components/sections/timeline").then((mod) => mod.Timeline),
);
const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((mod) => mod.Testimonials),
);
const Faq = dynamic(() => import("@/components/sections/faq").then((mod) => mod.Faq));
const Contact = dynamic(() =>
  import("@/components/sections/contact").then((mod) => mod.Contact),
);
const Cta = dynamic(() => import("@/components/sections/cta").then((mod) => mod.Cta));

export default function HomePage() {
  return (
    <>
      <Header />

      <main id="conteudo">
        <Hero />
        <About />
        <Portfolio />
        <Features />
        <Timeline />
        <Testimonials />
        <Faq />
        <Contact />
        <Cta />
      </main>

      <Footer />
      <WhatsappButton />
    </>
  );
}
