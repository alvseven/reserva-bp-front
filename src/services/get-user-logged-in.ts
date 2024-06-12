import { z } from "zod";

import { api } from "./api";

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

const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["InsuranceBroker", "Customer"]),
  schedulings: z.array(schedulingSchema),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export async function getUserLoggedIn(token: string) {
  const response = await api.get("/customers/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = userSchema.parse(response.data);

  return user;
}
