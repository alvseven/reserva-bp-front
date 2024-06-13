import { z } from "zod";

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, "O campo email é obrigatório")
    .email("O campo email deve ser um email válido"),
  password: z.string().min(1, "O campo senha é obrigatório"),
  role: z
    .literal("customer", { message: "Selecione o tipo de usuário" })
    .or(z.literal("insurance-broker")),
});

export type LoginData = z.infer<typeof signInFormSchema>;
