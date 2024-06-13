import { z } from "zod";

export const signUpFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "O campo nome de usuário é obrigatório")
      .min(3, "O nome de usuário deve conter pelo menos 3 caracteres"),
    email: z
      .string()
      .min(1, "O campo email é obrigatório")
      .email("O campo email deve ser um email válido"),
    password: z
      .string()
      .min(1, "O campo senha é obrigatório")
      .min(8, {
        message: "O campo senha deve conter pelo menos 8 caracteres.",
      })
      .regex(
        /(?=.*?[A-Z])/,
        "A senha deve conter pelo menos uma letra maiúscula"
      )
      .regex(
        /(?=.*?[a-z])/,
        "A senha deve conter pelo menos uma letra minúscula"
      )
      .regex(/(?=.*?\d)/, "A senha deve conter pelo menos um número"),
    confirmPassword: z.string().min(1, "O campo confirmar senha é obrigatório"),
    role: z
      .literal("Customer", { message: "Selecione o tipo de usuário" })
      .or(z.literal("InsuranceBroker")),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type CreateAccountData = z.infer<typeof signUpFormSchema>;
