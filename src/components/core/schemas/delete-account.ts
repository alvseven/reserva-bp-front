import { z } from "zod";

export const deleteAccountSchema = z.object({
        message: z.literal('Excluir conta', {  errorMap: () => {
                return {
                    message: 'Preencha o campo corretamente'
                }  
        } })
})

export type DeleteAccountData = z.infer<typeof deleteAccountSchema>