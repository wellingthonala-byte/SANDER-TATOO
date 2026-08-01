import { z } from "zod";

export const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo.")
    .max(80, "Nome muito longo."),
  phone: z
    .string()
    .trim()
    .min(10, "Informe um telefone válido com DDD.")
    .max(20, "Telefone muito longo.")
    .regex(/^[0-9()+\-\s]+$/, "Use apenas números, espaços e os sinais ( ) + -."),
  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido.")
    .optional()
    .or(z.literal("")),
  style: z.string().min(1, "Selecione um estilo."),
  message: z
    .string()
    .trim()
    .min(15, "Conte um pouco mais sobre a ideia (mín. 15 caracteres).")
    .max(600, "Mensagem muito longa."),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
