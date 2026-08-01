import { Send, FileText, PencilRuler, CalendarDays, Zap, type LucideIcon } from "lucide-react";

export type TimelineStep = {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
};

export const timelineSteps: TimelineStep[] = [
  {
    step: 1,
    icon: Send,
    title: "Envie sua ideia",
    description: "Fale conosco pelo WhatsApp e conte sua ideia.",
  },
  {
    step: 2,
    icon: FileText,
    title: "Orçamento",
    description: "Receba seu orçamento personalizado.",
  },
  {
    step: 3,
    icon: PencilRuler,
    title: "Desenvolvimento da arte",
    description: "Criamos um projeto exclusivo para você aprovar.",
  },
  {
    step: 4,
    icon: CalendarDays,
    title: "Agendamento",
    description: "Escolha a melhor data e horário.",
  },
  {
    step: 5,
    icon: Zap,
    title: "Sessão de tatuagem",
    description: "Chegou o dia de eternizar sua arte na pele!",
  },
];
