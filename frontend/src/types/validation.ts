import { z } from "zod";
import { isValidCPF } from "../util/util";

export const addressSchema = z.object({
    nome: z.string().min(3, "Digite o Nome"),
    cpf: z.string().refine(isValidCPF, {
        message: "CPF inválido",
    }),
    cep: z.string().length(8, "CEP inválido"),
    rua: z.string(),
    bairro: z.string(),
    cidade: z.string(),
    estado: z.string(),
});
