import { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";

import { AuthContext } from "@/providers/auth";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormField, FormMessage, FormControl, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Checkbox } from "../ui/checkbox";


import { type EditAccountData, editAccountSchema } from "./schemas/edit-account";

import { updateCustomer } from "@/services/customers/update-customer";
import { getCustomerLoggedIn } from "@/services/customers/get-customer-logged-in";

export function EditAccount() {

    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [passwordIsVisible, setPasswordIsVisible] = useState(false)

    const { user, setUser } = useContext(AuthContext)

    const form = useForm<EditAccountData>({
        resolver: zodResolver(editAccountSchema),
        defaultValues: {
            name: user?.name ?? "",
            email: user?.email ?? "",
            password: "",
            confirmPassword: ""
        },
    })

    const { toast } = useToast()

    async function editAccount(data: EditAccountData) {
        const token = localStorage.getItem("@reserva-bp:token")
        if (token) {
            try {
                await updateCustomer({ token, ...data })
                toast({
                    title: 'Dados alterados',
                    description: 'Perfil atualizado com sucesso',
                    className: "max-w-[40rem]"
                })
                form.reset()
                setDialogIsOpen(false)
                user?.role === "Customer" ? setUser(await getCustomerLoggedIn(token)) : ''
            }
            catch (error) {
                if (isAxiosError(error) && error.response?.status) {
                    const toastTitle =
                        error.response.status === 409
                            ? "Não foi possível atualizar a conta"
                            : "Oops, algo de errado aconteceu";

                    const toastDescription =
                        error.response.status === 409
                            ? "Email já cadastrado"
                            : "Tente realizar o login novamente ";

                    toast({
                        title: toastTitle,
                        description: toastDescription,
                        variant: "destructive",
                    });
                }
            }
        }
    }

    function closeDialog() {
        form.reset()
        setDialogIsOpen(false)
    }

    return (
        <Dialog open={dialogIsOpen} onOpenChange={() => setDialogIsOpen(!dialogIsOpen)}>
            <DialogTrigger asChild className="bg-transparent">
                <Button variant="outline" className="text-slate-300 text-xs lg:text-sm" >Editar perfil</Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-950 sm:max-w-[425px]">
                <DialogHeader className="gap-2">
                    <DialogTitle className="text-slate-300">Editar perfil</DialogTitle>
                    <DialogDescription>
                        Altere os dados da sua conta, não é possível alterar o tipo de usuário
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="flex flex-col gap-6"
                        id="edit-account"
                        onSubmit={form.handleSubmit(editAccount)}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-slate-300">Nome de usuário</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="alv"
                                            className="bg-blue-950 bg-opacity-30 text-gray-300"
                                            spellCheck={false}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-slate-300">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="reservabp@email.com"
                                            className="bg-blue-950 bg-opacity-30 pb-0 text-gray-300"
                                            spellCheck={false}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-slate-300">Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="********"
                                            type={passwordIsVisible ? "text" : "password"}
                                            className="bg-blue-950 bg-opacity-30 pb-0 text-gray-300"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel className="text-slate-300">Confirmar senha</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="********"
                                                type={passwordIsVisible ? "text" : "password"}
                                                className="bg-blue-950 bg-opacity-30 pb-0 text-gray-300"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    <div className="flex justify-start items-center space-x-2 pl-2 w-full">
                                        <Checkbox id="show-password" className="bg-slate-400" onCheckedChange={() => setPasswordIsVisible(!passwordIsVisible)} />
                                        <label
                                            htmlFor="show-password"
                                            className="peer-disabled:opacity-70 font-medium text-slate-300 text-sm leading-none peer-disabled:cursor-not-allowed"
                                        >
                                            Mostrar senhas
                                        </label>
                                    </div>
                                </>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter className="flex justify-center sm:justify-center items-center gap-4 mt-8 w-full">
                    <Button type="submit" onClick={closeDialog} className="bg-transparent py-5 border border-red-500">Cancelar</Button>
                    <Button type="submit" form="edit-account" className="border-green-500 bg-transparent py-5 border">Salvar alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}