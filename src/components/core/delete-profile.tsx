import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { type DeleteAccountData, deleteAccountSchema } from "./schemas/delete-account";
import { deleteCustomer } from "@/services/customers/delete-customer";
import { useToast } from "../ui/use-toast";

export function DeleteAccount() {

    const [dialogIsOpen, setDialogIsOpen] = useState(false)

    const navigate = useNavigate()

    const form = useForm<DeleteAccountData>({
        resolver: zodResolver(deleteAccountSchema),
    })

    const { toast } = useToast()

    async function deleteAccount() {
        const token = localStorage.getItem('@reserva-bp:token')
        if (token) {
            try {
                await deleteCustomer(token)
                localStorage.removeItem('@reserva-bp:token')
                navigate('/')
            }
            catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Oops, algo de errado aconteceu',
                    description: 'Não foi possível deletar a conta, tente novamente',
                })
            }
        }
    }

    async function closeDialog() {
        form.reset()
        setDialogIsOpen(false)
    }

    return (
        <Dialog open={dialogIsOpen} onOpenChange={() => setDialogIsOpen(!dialogIsOpen)}>
            <DialogTrigger asChild className="bg-transparent border border-red-500">
                <Button variant="outline" className="text-slate-300 text-xs lg:text-sm">Excluir conta</Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-950 sm:max-w-[425px]">
                <DialogHeader className="gap-2">
                    <DialogTitle className="text-slate-300">Excluir conta</DialogTitle>
                    <DialogDescription>
                        Essa ação não poderá ser desfeita, para confirmar a exclusão, digite 'Excluir conta'
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="flex flex-col gap-6"
                        id="delete-account"
                        onSubmit={form.handleSubmit(deleteAccount)}
                    >
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-slate-300">Excluir</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Excluir conta"
                                            className="bg-blue-950 bg-opacity-30 text-gray-300"
                                            spellCheck={false}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                {/* <div className="flex items-center space-x-2">
                    <div className="flex-1 gap-2 grid">
                        <Label htmlFor="confirm-account-delete" className="sr-only">
                            Excluir
                        </Label>
                        <Input
                            id="confirm-account-delete"
                            className="text-slate-300 placeholder:text-slate-300"
                        />
                    </div>
                    <Button type="submit" size="sm" className="border-slate-400 bg-blue-950 bg-opacity-30 px-3 border">
                        <span className="sr-only">Confirmar</span>
                        <TrashIcon className="w-4 h-32" />
                    </Button>
                </div> */}
                <DialogFooter className="flex justify-between sm:justify-between items-center gap-4 w-full">
                    <Button type="button" variant="secondary" className="border-gray-400 bg-blue-950 bg-opacity-30 border text-slate-300 hover:text-black" onClick={closeDialog}>
                        Cancelar
                    </Button>
                    <Button form="delete-account" variant="secondary" className="bg-blue-950 hover:bg-transparent bg-opacity-30 border border-red-500 text-slate-300 hover:text-red-400">Confirmar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}