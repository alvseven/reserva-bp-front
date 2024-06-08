import { z } from "zod";

import { api } from "./api";

const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  role: z.union([z.literal("InsuranceBroker"), z.literal("Customer")]),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export async function getUserLoggedIn(token: string) {
  const response = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = userSchema.parse(response);

  return user;
}
