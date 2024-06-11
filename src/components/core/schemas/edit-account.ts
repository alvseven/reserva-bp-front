import { z } from "zod";

const atLeastOneUpperCaseLetterRegex = /(?=.*?[A-Z])/;
const atLeastOneLowerCaseLetterRegex = /(?=.*?[a-z])/;

export const editAccountSchema = z
  .object({
    name: z
      .string()
      .min(1, "O campo nome é obrigatório")
      .min(3, "O campo nome deve conter pelo menos 3 caracteres"),
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
        atLeastOneUpperCaseLetterRegex,
        "A senha deve conter pelo menos uma letra maiúscula"
      )
      .regex(
        atLeastOneLowerCaseLetterRegex,
        "A senha deve conter pelo menos uma letra minúscula"
      )
      .regex(/(?=.*?\d)/, "A senha deve conter pelo menos um número"),
    confirmPassword: z.string().min(1, "O campo confirmar senha é obrigatório"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type EditAccountData = z.infer<typeof editAccountSchema>;
