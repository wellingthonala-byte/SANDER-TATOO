import { asset } from "@/lib/assets";

export type PortfolioCategory = {
  id: string;
  label: string;
};

export type PortfolioItem = {
  id: string;
  category: PortfolioCategory["id"];
  title: string;
  /** Body placement / session context shown on hover. */
  meta: string;
  src: string;
  alt: string;
};

export const portfolioCategories: PortfolioCategory[] = [
  { id: "realismo", label: "Realismo" },
  { id: "fine-line", label: "Fine Line" },
  { id: "blackwork", label: "Blackwork" },
  { id: "fechamento", label: "Fechamento" },
  { id: "coloridas", label: "Coloridas" },
];

type Seed = {
  category: string;
  titles: [string, string, string, string, string, string];
  metas: [string, string, string, string, string, string];
};

const seeds: Seed[] = [
  {
    category: "realismo",
    titles: ["Zeus", "Leão", "Medusa", "Relógio", "Guerreira", "Cristo"],
    metas: [
      "Braço · 3 sessões",
      "Antebraço · 2 sessões",
      "Coxa · 3 sessões",
      "Antebraço · 2 sessões",
      "Braço · 4 sessões",
      "Panturrilha · 2 sessões",
    ],
  },
  {
    category: "fine-line",
    titles: ["Flor de lótus", "Constelação", "Andorinha", "Serpente", "Ramo", "Silhueta"],
    metas: [
      "Costela · 1 sessão",
      "Clavícula · 1 sessão",
      "Pulso · 1 sessão",
      "Braço · 2 sessões",
      "Costas · 1 sessão",
      "Tornozelo · 1 sessão",
    ],
  },
  {
    category: "blackwork",
    titles: ["Ornamental", "Máscara", "Geométrico", "Caveira", "Mandala", "Tribal moderno"],
    metas: [
      "Ombro · 2 sessões",
      "Peito · 3 sessões",
      "Antebraço · 2 sessões",
      "Mão · 1 sessão",
      "Costas · 3 sessões",
      "Braço · 2 sessões",
    ],
  },
  {
    category: "fechamento",
    titles: ["Braço mitológico", "Costas completas", "Perna oriental", "Peitoral", "Manga preta", "Costela"],
    metas: [
      "Braço fechado · 8 sessões",
      "Costas · 12 sessões",
      "Perna · 10 sessões",
      "Peitoral · 6 sessões",
      "Braço fechado · 9 sessões",
      "Costela · 5 sessões",
    ],
  },
  {
    category: "coloridas",
    titles: ["Aquarela", "Neo tradicional", "Fênix", "Koi", "Floral", "Retrato em cor"],
    metas: [
      "Antebraço · 2 sessões",
      "Coxa · 3 sessões",
      "Costas · 4 sessões",
      "Braço · 3 sessões",
      "Ombro · 2 sessões",
      "Panturrilha · 3 sessões",
    ],
  },
];

const categoryLabel = (id: string) =>
  portfolioCategories.find((category) => category.id === id)?.label ?? id;

export const portfolioItems: PortfolioItem[] = seeds.flatMap((seed, seedIndex) =>
  seed.titles.map((title, index) => {
    const imageIndex = seedIndex * 6 + index + 1;
    return {
      id: `${seed.category}-${index + 1}`,
      category: seed.category,
      title,
      meta: seed.metas[index],
      src: asset(`/images/work-${String(imageIndex).padStart(2, "0")}.webp`),
      alt: `Tatuagem estilo ${categoryLabel(seed.category)} — ${title}, ${seed.metas[index]}`,
    };
  }),
);

export function itemsByCategory(categoryId: string) {
  return portfolioItems.filter((item) => item.category === categoryId);
}
