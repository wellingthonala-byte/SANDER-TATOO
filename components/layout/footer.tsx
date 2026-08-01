import { Instagram, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/common/logo";
import { navItems } from "@/data/navigation";
import { siteConfig } from "@/lib/site";

const { address, contact, hours } = siteConfig;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink pt-20 pb-10">
      {/* Oversized monogram watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -bottom-16 font-display text-[18rem] leading-none text-white/[0.025] select-none lg:text-[26rem]"
      >
        S
      </span>

      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <div className="max-w-xs">
            <Logo className="text-white" />
            <p className="mt-7 text-[0.8125rem] leading-relaxed text-muted">
              Mais que tatuagens, criamos obras de arte que contam histórias e marcam vidas.
            </p>
            <p className="mt-6 font-display text-2xl text-white/45 italic">Sander</p>
          </div>

          <FooterColumn title="Contato">
            <FooterLink href={contact.phoneHref} icon={<Phone className="size-3.5" />}>
              {contact.phoneLabel}
            </FooterLink>
            <FooterLink
              href={contact.instagramUrl}
              external
              icon={<Instagram className="size-3.5" />}
            >
              {contact.instagram}
            </FooterLink>
            <FooterLink href={`mailto:${contact.email}`}>{contact.email}</FooterLink>
          </FooterColumn>

          <FooterColumn title="Endereço">
            <FooterLink href={address.mapsUrl} external icon={<MapPin className="size-3.5" />}>
              {address.street}
            </FooterLink>
            <li className="text-[0.8125rem] text-muted">
              {address.district} — {address.city}/{address.state}
            </li>
            <li className="text-[0.8125rem] text-muted">CEP: {address.zip}</li>
          </FooterColumn>

          <FooterColumn title="Horário">
            {hours.map((entry) => (
              <li key={entry.days} className="text-[0.8125rem] text-muted">
                <span className="block text-white/90">{entry.days}</span>
                {entry.time}
              </li>
            ))}
          </FooterColumn>
        </div>

        <nav aria-label="Navegação do rodapé" className="mt-14 border-t border-hairline pt-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-[0.625rem] uppercase tracking-[0.22em] text-faint transition-colors duration-400 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex flex-col gap-3 border-t border-hairline pt-8 text-[0.6875rem] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1.5">
            Desenvolvido com
            <span className="text-brand" aria-label="amor">
              ♥
            </span>
            por
            <a
              href={siteConfig.credits.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors duration-400 hover:text-white"
            >
              {siteConfig.credits.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[0.5625rem] font-sans font-medium uppercase tracking-[0.28em] text-bronze">
        {title}
      </h3>
      <ul className="mt-6 flex flex-col gap-3.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  external = false,
  icon,
  children,
}: {
  href: string;
  external?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex items-center gap-2.5 text-[0.8125rem] text-muted transition-colors duration-400 hover:text-white"
      >
        {icon ? (
          <span className="text-faint transition-colors duration-400 group-hover:text-brand-hover">
            {icon}
          </span>
        ) : null}
        {children}
      </a>
    </li>
  );
}
