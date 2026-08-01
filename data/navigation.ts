export type NavItem = {
  label: string;
  /** DOM id of the matching <section>, used for scroll-spy and anchor links. */
  id: string;
};

export const navItems: NavItem[] = [
  { label: "Início", id: "inicio" },
  { label: "Sobre", id: "sobre" },
  { label: "Portfólio", id: "portfolio" },
  { label: "Diferenciais", id: "diferenciais" },
  { label: "Como funciona", id: "como-funciona" },
  { label: "Depoimentos", id: "depoimentos" },
  { label: "FAQ", id: "faq" },
  { label: "Contato", id: "contato" },
];

export const sectionIds = navItems.map((item) => item.id);
