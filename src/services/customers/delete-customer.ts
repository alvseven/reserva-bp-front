import { api } from "../api";

export async function deleteCustomer(token: string) {
    await api.delete('/customers/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}