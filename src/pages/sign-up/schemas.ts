import { z } from "zod";

export const signUpFormSchema = z
  .object({
    username: z
      .string()
      .min(1, "O campo nome de usuário é obrigatório")
      .min(3, "O nome de usuário deve conter pelo menos 3 caracteres")
      .regex(/^[a-zA-Z]+$/, "O nome de usuário deve conter apenas letras"),
    email: z
      .string()
      .min(1, "O campo email é obrigatório")
      .email("O campo email deve ser um email válido"),
    password: z
      .string()
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
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
