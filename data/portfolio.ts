import { asset } from "@/lib/assets";

export type PortfolioCategory = {
  id: string;
  label: string;
};

export type PortfolioItem = {
  id: string;
  category: PortfolioCategory["id"];
  title: string;
  /** Body placement / session context shown over the image. */
  meta: string;
  src: string;
  alt: string;
};

/**
 * Every style the studio offers. A category with no work published yet is
 * hidden from the filter automatically — see `activeCategories` below — so new
 * photos are the only thing needed to bring a tab back.
 */
export const portfolioCategories: PortfolioCategory[] = [
  { id: "realismo", label: "Realismo" },
  { id: "fine-line", label: "Fine Line" },
  { id: "blackwork", label: "Blackwork" },
  { id: "fechamento", label: "Fechamento" },
  { id: "coloridas", label: "Coloridas" },
];

/**
 * Real work from the studio.
 *
 * To publish another piece: drop the image in `public/images/` (4:5, WebP,
 * ~860px wide) and add one entry here. Nothing else needs to change.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: "faces-realismo",
    category: "realismo",
    title: "Faces veladas",
    meta: "Antebraço",
    src: asset("/images/work-forearm.webp"),
    alt: "Tatuagem em realismo preto e cinza no antebraço: três faces envoltas em bandagens",
  },
  {
    id: "anjo-e-demonio",
    category: "realismo",
    title: "Anjo e demônio",
    meta: "Braço",
    src: asset("/images/work-anjo-demonio.webp"),
    alt: "Realismo preto e cinza no braço: anjo de asas abertas acima de um demônio alado",
  },
  {
    id: "anubis",
    category: "realismo",
    title: "Anúbis",
    meta: "Ombro e braço",
    src: asset("/images/work-anubis.webp"),
    alt: "Realismo preto e cinza no ombro: Anúbis segurando um cajado com ankh e caveira",
  },
  {
    id: "nossa-senhora",
    category: "realismo",
    title: "Nossa Senhora",
    meta: "Braço interno",
    src: asset("/images/work-nossa-senhora.webp"),
    alt: "Realismo religioso no braço interno: Nossa Senhora com o menino Jesus e resplendor ao fundo",
  },
  {
    id: "anjo-guerreira",
    category: "realismo",
    title: "Anjo guerreira",
    meta: "Antebraço",
    src: asset("/images/work-anjo-espada.webp"),
    alt: "Realismo preto e cinza no antebraço: anjo encapuzada com espada e corrente",
  },
  {
    id: "justica-velada",
    category: "realismo",
    title: "Justiça velada",
    meta: "Ombro e braço",
    src: asset("/images/work-temis.webp"),
    alt: "Realismo preto e cinza no ombro: figura alada de olhos vendados sob uma rosácea gótica",
  },
  {
    id: "olhar-de-aguia",
    category: "realismo",
    title: "Olhar de águia",
    meta: "Ombro e braço",
    src: asset("/images/work-aguia-olho.webp"),
    alt: "Realismo no ombro: águia de olho azul entre relógios rachados e um olho humano",
  },
  {
    id: "redencao",
    category: "realismo",
    title: "Redenção",
    meta: "Antebraço",
    src: asset("/images/work-cristo-correntes.webp"),
    alt: "Realismo preto e cinza no antebraço: figura alada com coroa de espinhos rompendo correntes sobre caveiras",
  },
  {
    id: "zeus",
    category: "realismo",
    title: "Zeus",
    meta: "Panturrilha",
    src: asset("/images/work-zeus.webp"),
    alt: "Realismo preto e cinza na panturrilha: rosto de Zeus fundido a uma águia, com raio e faixa grega",
  },
  {
    id: "fenix-floral",
    category: "fine-line",
    title: "Fênix floral",
    meta: "Costas",
    src: asset("/images/work-fenix.webp"),
    alt: "Fine line nas costas: fênix de traço fino com cauda que se desdobra em folhas e flores",
  },
  {
    id: "leao-fortis",
    category: "fechamento",
    title: "Fortis Fortuna Adiuvat",
    meta: "Costas fechadas",
    src: asset("/images/work-leao.webp"),
    alt: "Fechamento de costas em realismo: leão com elmo e armadura sob a frase Fortis Fortuna Adiuvat",
  },
  {
    id: "dragao-oriental",
    category: "fechamento",
    title: "Dragão oriental",
    meta: "Braço fechado",
    src: asset("/images/work-sleeve.webp"),
    alt: "Fechamento de braço: dragão oriental sombreado entre nuvens e flor de lótus",
  },
  {
    id: "aguia-e-tempo",
    category: "fechamento",
    title: "Águia e o tempo",
    meta: "Braço fechado",
    src: asset("/images/work-aguia.webp"),
    alt: "Fechamento de braço: águia realista sobre cartas de baralho, relógio e caveira",
  },
  {
    id: "one-life-one-chance",
    category: "fechamento",
    title: "One life, one chance",
    meta: "Perna fechada",
    src: asset("/images/work-one-chance.webp"),
    alt: "Fechamento de perna em estilo chicano: lettering One life one chance, palhaça com máscara e nota de cem dólares",
  },
  {
    id: "gueixa-e-dragao",
    category: "coloridas",
    title: "Gueixa e dragão",
    meta: "Costas fechadas",
    src: asset("/images/work-gueixa-dragao.webp"),
    alt: "Fechamento de costas colorido: gueixa entre flores de cerejeira rosadas ao lado de um dragão oriental",
  },
];

export function itemsByCategory(categoryId: string) {
  return portfolioItems.filter((item) => item.category === categoryId);
}

/** Only the categories that actually have published work. */
export const activeCategories = portfolioCategories.filter(
  (category) => itemsByCategory(category.id).length > 0,
);
