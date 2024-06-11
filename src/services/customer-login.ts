import { z } from "zod";

import { api } from "./api";

const schedulingSchema = z.object({
  _id: z.string(),
  insuranceBrokerId: z.string(),
  insuranceBrokerName: z.string(),
  date: z.coerce.date(),
  time: z.string(),
  duration: z.string(),
  // status: z.literal("Pendente").or(z.literal("Realizado")),
  createdAt: z.coerce.date(),
});

export const loginResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.literal("Customer"),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  schedulings: z.array(schedulingSchema),
  token: z.string(),
});

type CustomerLoginInput = {
  email: string;
  password: string;
};

export async function customerLogin(data: CustomerLoginInput) {
  const response = await api.post("/customers/login", { ...data });

  const user = loginResponseSchema.parse(response.data);

  return user;
}
