import { z } from "zod";

import { api } from "../api";
import { defaultUserSchema } from "../schemas/default-user-schema";

export const loginResponseSchema = z.object({
  token: z.string(),
}).and(defaultUserSchema)

type CustomerLoginInput = {
  email: string;
  password: string;
};

export async function customerLogin(data: CustomerLoginInput) {
  const response = await api.post("/customers/login", { ...data });

  const user = loginResponseSchema.parse(response.data);

  return user;
}
