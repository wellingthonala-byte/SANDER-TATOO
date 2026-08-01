import { asset } from "@/lib/assets";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "lucas-almeida",
    name: "Lucas Almeida",
    role: "Realismo · Braço fechado",
    rating: 5,
    quote:
      "Trabalho impecável! O cuidado com cada detalhe e o atendimento diferenciado fazem toda a diferença.",
    avatar: asset("/images/avatar-1.webp"),
  },
  {
    id: "juliana-martins",
    name: "Juliana Martins",
    role: "Fine Line · Clavícula",
    rating: 5,
    quote:
      "Ambiente incrível e super profissional. Minha tatuagem ficou exatamente como eu sonhei!",
    avatar: asset("/images/avatar-2.webp"),
  },
  {
    id: "rafael-souza",
    name: "Rafael Souza",
    role: "Blackwork · Peitoral",
    rating: 5,
    quote:
      "O melhor estúdio que já conheci. Segurança, higiene e um resultado surpreendente!",
    avatar: asset("/images/avatar-3.webp"),
  },
  {
    id: "carolina-dias",
    name: "Carolina Dias",
    role: "Coloridas · Antebraço",
    rating: 5,
    quote:
      "Fui ouvida do início ao fim. O projeto veio pronto, no meu estilo, e a cicatrização foi perfeita.",
    avatar: asset("/images/avatar-4.webp"),
  },
  {
    id: "bruno-ferreira",
    name: "Bruno Ferreira",
    role: "Fechamento · Costas",
    rating: 5,
    quote:
      "São 12 sessões de um projeto enorme e nunca houve atraso. Profissionalismo do começo ao fim.",
    avatar: asset("/images/avatar-5.webp"),
  },
  {
    id: "marina-lopes",
    name: "Marina Lopes",
    role: "Realismo · Coxa",
    rating: 5,
    quote:
      "Levei uma referência simples e recebi uma obra de arte. Recomendo de olhos fechados.",
    avatar: asset("/images/avatar-6.webp"),
  },
];
