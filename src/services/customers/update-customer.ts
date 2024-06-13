import { z } from "zod";

import { api } from "../api";

export const updateCustomerSchema = z.any()

type UpdateCustomerInput = {
    name: string
    email: string
    password: string
    confirmPassword: string
    token: string
}

export async function updateCustomer({token, ...data}: UpdateCustomerInput) {
   await api.patch("/customers/me", { ...data }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
  }