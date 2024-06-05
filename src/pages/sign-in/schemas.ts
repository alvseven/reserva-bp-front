import { z } from "zod";

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, "O campo email é obrigatório")
    .email("O campo email deve ser um email válido"),
  password: z.string().min(1, "O campo senha é obrigatório"),
});

export type SignInFormData = z.infer<typeof signInFormSchema>;
