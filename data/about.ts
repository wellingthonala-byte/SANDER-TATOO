import { Sparkles, ShieldCheck, UserRound, Building2, type LucideIcon } from "lucide-react";

export type Pillar = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const aboutContent = {
  eyebrow: "Sobre o estúdio",
  title: ["Arte.", "Técnica.", "Propósito."],
  paragraphs: [
    "A Sander Tattoo Ink nasceu da paixão pela arte e do compromisso com a excelência. Aqui, cada traço carrega significado e cada detalhe é pensado para eternizar histórias na pele.",
    "Trabalhamos com um número reduzido de sessões por dia para garantir atenção integral a cada projeto — do primeiro esboço ao último ponto de finalização.",
  ],
  image: {
    src: "/images/studio.webp",
    alt: "Ambiente interno do estúdio Sander Tattoo Ink com iluminação baixa e quadros nas paredes",
  },
} as const;

export const pillars: Pillar[] = [
  {
    icon: ShieldCheck,
    title: "Higiene total",
    description: "Seguimos rigorosos padrões de esterilização e biossegurança.",
  },
  {
    icon: Sparkles,
    title: "Materiais premium",
    description: "Utilizamos apenas materiais certificados e de alta qualidade.",
  },
  {
    icon: UserRound,
    title: "Atendimento personalizado",
    description: "Cada cliente é único. Criamos uma experiência sob medida para você.",
  },
  {
    icon: Building2,
    title: "Ambiente profissional",
    description: "Espaço moderno, confortável e projetado para a sua segurança.",
  },
];

export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
};

export const stats: Stat[] = [
  { value: 11, suffix: "+", label: "Anos de estúdio" },
  { value: 4200, suffix: "+", label: "Tatuagens realizadas" },
  { value: 98, suffix: "%", label: "Clientes que indicam" },
  { value: 5, decimals: 1, label: "Avaliação média" },
];
