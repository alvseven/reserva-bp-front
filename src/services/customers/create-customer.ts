import { api } from "../api";

import { defaultUserSchema } from "../schemas/default-user-schema";

type CreateCustomerInput = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export async function createCustomer(data: CreateCustomerInput) {
    const response = await api.post('/customers', {
        ...data
    })

    const createdCustomer = defaultUserSchema.parse(response.data)

    return createdCustomer
}