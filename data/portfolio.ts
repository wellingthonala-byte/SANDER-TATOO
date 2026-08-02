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
    id: "dragao-oriental",
    category: "fechamento",
    title: "Dragão oriental",
    meta: "Braço fechado",
    src: asset("/images/work-sleeve.webp"),
    alt: "Fechamento de braço em blackwork e sombreado: dragão oriental entre nuvens e flor de lótus",
  },
  {
    id: "retrato-realismo",
    category: "realismo",
    title: "Faces em realismo",
    meta: "Antebraço",
    src: asset("/images/work-forearm.webp"),
    alt: "Tatuagem em realismo preto e cinza no antebraço, com três faces envoltas em bandagens",
  },
];

export function itemsByCategory(categoryId: string) {
  return portfolioItems.filter((item) => item.category === categoryId);
}

/** Only the categories that actually have published work. */
export const activeCategories = portfolioCategories.filter(
  (category) => itemsByCategory(category.id).length > 0,
);
