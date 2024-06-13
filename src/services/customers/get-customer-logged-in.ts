import { api } from "../api";

import { defaultUserSchema } from "../schemas/default-user-schema";

export async function getCustomerLoggedIn(token: string) {
  const response = await api.get("/customers/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = defaultUserSchema.parse(response.data);

  return user;
}
