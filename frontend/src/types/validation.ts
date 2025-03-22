import { z } from "zod";

export const addressSchema = z.object({
    name: z.string().min(3, "Digite o Nome"),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    zipCode: z.string().length(8, "CEP inválido"),
    street: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
});
