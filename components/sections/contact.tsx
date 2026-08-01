"use client";

import * as React from "react";
import { useForm, type Resolver } from "react-hook-form";
import { Check, Clock, Instagram, Loader2, MapPin, Phone, Send } from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { portfolioCategories } from "@/data/portfolio";
import { siteConfig } from "@/lib/site";
import type { BookingFormValues } from "@/lib/validations";
import { whatsappLink } from "@/lib/whatsapp";

const { address, contact, hours } = siteConfig;

const details = [
  {
    icon: Phone,
    label: "Telefone",
    value: contact.phoneLabel,
    href: contact.phoneHref,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: contact.instagram,
    href: contact.instagramUrl,
  },
  {
    icon: MapPin,
    label: "Endereço",
    value: `${address.street} — ${address.district}, ${address.city}/${address.state}`,
    href: address.mapsUrl,
  },
  {
    icon: Clock,
    label: "Horário",
    value: hours.map((entry) => `${entry.days}: ${entry.time}`).join(" · "),
  },
];

/**
 * Zod and its resolver are pulled in on the first validation instead of at
 * import time, keeping ~40 KB of schema code out of the initial bundle.
 */
const lazyResolver: Resolver<BookingFormValues> = async (values, context, options) => {
  const [{ zodResolver }, { bookingSchema }] = await Promise.all([
    import("@hookform/resolvers/zod"),
    import("@/lib/validations"),
  ]);
  return zodResolver(bookingSchema)(values, context, options);
};

export function Contact() {
  const [sent, setSent] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: lazyResolver,
    defaultValues: { name: "", phone: "", email: "", style: "", message: "" },
    mode: "onBlur",
  });

  /**
   * There is no backend in this project: the briefing is handed off to WhatsApp
   * already formatted, which is how the studio actually receives its bookings.
   */
  const onSubmit = handleSubmit((values) => {
    const style =
      portfolioCategories.find((category) => category.id === values.style)?.label ?? values.style;

    const message = [
      `Olá! Vim pelo site da ${siteConfig.name}.`,
      "",
      `Nome: ${values.name}`,
      `Telefone: ${values.phone}`,
      values.email ? `E-mail: ${values.email}` : null,
      `Estilo: ${style}`,
      "",
      `Ideia: ${values.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
    reset();
  });

  return (
    <section id="contato" aria-labelledby="contato-title" className="bg-ink-soft py-24 lg:py-32">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Contato"
              title={
                <span id="contato-title">
                  Vamos desenhar a sua <span className="text-brand-hover">próxima peça</span>
                </span>
              }
              description="Conte sua ideia, envie referências e receba um orçamento personalizado. Respondemos em até 24 horas."
            />

            <RevealGroup as="ul" className="mt-12 flex flex-col gap-px bg-hairline">
              {details.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <Icon
                      className="mt-0.5 size-5 shrink-0 text-bronze transition-colors duration-500 group-hover:text-brand-hover"
                      strokeWidth={1.2}
                      aria-hidden
                    />
                    <span className="flex flex-col gap-1.5">
                      <span className="text-[0.5625rem] uppercase tracking-[0.28em] text-faint">
                        {label}
                      </span>
                      <span className="text-sm text-white/90">{value}</span>
                    </span>
                  </>
                );

                return (
                  <RevealItem key={label} as="li" className="bg-ink-soft">
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="group flex items-start gap-4 px-1 py-5 transition-colors duration-500 hover:bg-surface/60 hover:px-4"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="group flex items-start gap-4 px-1 py-5">{content}</div>
                    )}
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>

          <Reveal direction="left" className="border border-hairline bg-surface p-6 sm:p-9 lg:p-10">
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="name" label="Nome" error={errors.name?.message}>
                  <Input
                    id="name"
                    autoComplete="name"
                    placeholder="Como podemos te chamar?"
                    aria-invalid={Boolean(errors.name)}
                    {...register("name")}
                  />
                </Field>

                <Field id="phone" label="WhatsApp" error={errors.phone?.message}>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(11) 90000-0000"
                    aria-invalid={Boolean(errors.phone)}
                    {...register("phone")}
                  />
                </Field>

                <Field id="email" label="E-mail (opcional)" error={errors.email?.message}>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="voce@email.com"
                    aria-invalid={Boolean(errors.email)}
                    {...register("email")}
                  />
                </Field>

                <Field id="style" label="Estilo desejado" error={errors.style?.message}>
                  <Select id="style" aria-invalid={Boolean(errors.style)} {...register("style")}>
                    <option value="">Selecione</option>
                    {portfolioCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>

              <Field id="message" label="Sua ideia" error={errors.message?.message}>
                <Textarea
                  id="message"
                  placeholder="Descreva a tatuagem, o tamanho aproximado e a região do corpo."
                  aria-invalid={Boolean(errors.message)}
                  {...register("message")}
                />
              </Field>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                  ) : (
                    <Send className="size-4" aria-hidden />
                  )}
                  Enviar pelo WhatsApp
                </Button>

                <p
                  role="status"
                  aria-live="polite"
                  className="text-[0.6875rem] leading-relaxed text-faint sm:max-w-52"
                >
                  {sent ? (
                    <span className="flex items-center gap-2 text-bronze">
                      <Check className="size-3.5" aria-hidden />
                      Conversa aberta no WhatsApp.
                    </span>
                  ) : (
                    "Seus dados são usados apenas para responder ao seu orçamento."
                  )}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <span id={`${id}-error`} role="alert" className="mt-2 text-[0.6875rem] text-brand-hover">
          {error}
        </span>
      ) : null}
    </div>
  );
}
