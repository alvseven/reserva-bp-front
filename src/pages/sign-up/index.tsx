import { useContext, useState } from "react";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

import { AuthContext } from "@/providers/auth";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { type CreateAccountData, signUpFormSchema } from "./schemas";
import { createCustomer } from "@/services/customers/create-customer";

export function SignUpPage() {

    const [passwordIsVisible, setPasswordIsVisible] = useState(false)
    const { setUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const form = useForm<CreateAccountData>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    const { toast } = useToast()

    async function signUp(data: CreateAccountData) {
        const { role, ...createAccountData } = data
        try {
            if (role === "Customer") {
                const createdCustomer = await createCustomer({ ...createAccountData })
                setUser(createdCustomer)
                navigate('/')
                toast({
                    title: 'Conta criada',
                    description: 'Conta criada com sucesso'
                })
            }
        }
        catch (error) {
            if (isAxiosError(error) && error.response?.status) {
                const toastTitle =
                    error.response.status === 409
                        ? "Não foi possível criar a conta"
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

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(signUp)}
                className="flex flex-col justify-center items-center space-y-8 border-slate-800 bg-slate-950 m-auto my-8 md:mt-12 xl:mt-12 px-12 pt-16 pb-8 border rounded-md w-11/12 md:w-8/12 lg:w-1/2 max-w-[30rem] lg:max-w-[40rem] h-full"
            >
                <FormDescription className="text-lg text-pretty text-slate-200 lg:text-2xl">
                    Crie sua conta para continuar
                </FormDescription>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-slate-300">Nome</FormLabel>
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
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem className="w-full h-20">
                            <FormLabel className="text-slate-300">Tipo de usuário</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange}>
                                    <SelectTrigger className="bg-blue-950 bg-opacity-30 h-12 text-slate-300">
                                        <SelectValue placeholder="Selecionar" className="text-slate-200" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-72">
                                        <SelectItem value="Customer">Cliente</SelectItem>
                                        <SelectItem value="InsuranceBroker">Corretor de seguros</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-start items-center space-x-2 pl-2 w-full">
                    <Checkbox id="show-password" className="bg-slate-400" onCheckedChange={() => setPasswordIsVisible(!passwordIsVisible)} />
                    <label
                        htmlFor="show-password"
                        className="peer-disabled:opacity-70 font-medium text-slate-300 text-sm leading-none peer-disabled:cursor-not-allowed"
                    >
                        Mostrar senhas
                    </label>
                </div>
                <div className="flex sm:flex-row flex-col items-center gap-2 md:gap-1 pb-2 text-gray-400 hover:text-gray-300 duration-500">
                    <p>Já possui uma conta?</p>
                    <Link to="/" className="underline underline-offset-4">
                        Fazer login
                    </Link>
                </div>
                <Button
                    className="border-slate-100 bg-blue-950 hover:bg-slate-300 bg-opacity-10 px-10 py-5 border hover:text-blue-950 duration-700"
                    type="submit"
                >
                    Criar conta
                </Button>
            </form>
        </Form>
    )
}