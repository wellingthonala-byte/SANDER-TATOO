import {
  UserRoundCheck,
  Syringe,
  ShieldCheck,
  PenTool,
  Award,
  Clock3,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  label: string;
};

export const features: Feature[] = [
  { icon: UserRoundCheck, label: "Atendimento personalizado" },
  { icon: Syringe, label: "Materiais esterilizados" },
  { icon: ShieldCheck, label: "Ambiente seguro" },
  { icon: PenTool, label: "Projeto exclusivo" },
  { icon: Award, label: "Alta qualidade" },
  { icon: Clock3, label: "Pontualidade e respeito" },
];
