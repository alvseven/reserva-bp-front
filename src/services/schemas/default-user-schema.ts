import { z } from "zod";

const schedulingSchema = z.object({
	_id: z.string(),
	insuranceBrokerName: z.string(),
	insuranceBrokerId: z.string(),
	date: z.coerce.date(),
	time: z.string(),
	duration: z.string(),
	status: z.enum(["Pendente", "Realizado"]),
	createdAt: z.coerce.date(),
});

export const defaultUserSchema = z.object({
	_id: z.string(),
    name: z
    .string()
    .min(1, "O campo nome de usuário é obrigatório")
    .min(3, "O nome de usuário deve conter pelo menos 3 caracteres"),
  email: z
    .string()
    .min(1, "O campo email é obrigatório")
    .email("O campo email deve ser um email válido"),
    role: z
    .literal("Customer", { message: "Selecione o tipo de usuário" })
    .or(z.literal("InsuranceBroker")),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	schedulings: z.array(schedulingSchema),
});