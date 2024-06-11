import { z } from "zod";

import { api } from "./api";

const schedulingSchema = z.object({
  _id: z.string(),
  insuranceBrokerName: z.string(),
  date: z.coerce.date(),
  duration: z.string(),
  status: z.literal("Pendente").or(z.literal("Realizado")),
  createdAt: z.coerce.date(),
});

const getInsuranceBrokersSchema = z.array(
  z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: z.literal("InsuranceBroker"),
    schedulings: z.array(schedulingSchema),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  })
);

export type InsuranceBrokers = z.infer<typeof getInsuranceBrokersSchema>;

export async function getInsuranceBrokers(token: string) {
  const response = await api.get("/insurance-brokers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const insuranceBrokers = getInsuranceBrokersSchema.parse(response.data);

  return insuranceBrokers;
}
