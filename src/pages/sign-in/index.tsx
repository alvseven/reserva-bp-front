import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { type SignInFormData, signInFormSchema } from "./schemas";

export function SignInPage() {
    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { toast } = useToast();

    function signIn(data: SignInFormData) {
        try {
            console.log("Trying to sign in...");
            console.log("Data: ", data);
            toast({
                title: "Seja bem vindo",
                description: "Login realizado com sucesso",
            });
        } catch (error) {
            if (error instanceof AxiosError && error.status) {
                const toastTitle =
                    error.status === 401 || error.status === 403
                        ? "Falha ao realizar login"
                        : "Oops, algo de errado aconteceu";

                const toastDescription =
                    error.status === 401
                        ? "Usuário não encontrado"
                        : error.status === 403
                            ? "Email e/ou senha incorretos"
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
                onSubmit={form.handleSubmit(signIn)}
                className="flex flex-col justify-center items-center space-y-8 border-slate-800 bg-slate-950 m-auto my-8 md:mt-12 xl:mt-36 px-12 pt-16 pb-8 border rounded-md w-11/12 md:w-8/12 lg:w-1/2 max-w-[30rem] lg:max-w-[40rem] h-full"
            >
                <FormDescription className="text-lg text-pretty text-slate-200 lg:text-2xl">
                    Faça login para continuar
                </FormDescription>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-slate-300">Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="reservabp@email.com"
                                    className="bg-blue-950 bg-opacity-10 text-gray-300"
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
                                    type="password"
                                    className="bg-blue-950 bg-opacity-10 pb-0 text-gray-300"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex sm:flex-row flex-col justify-center items-center gap-2 md:gap-1 pb-2 w-full text-gray-400 hover:text-gray-300 duration-500">
                    <p>Não possui uma conta?</p>
                    <Link to="/sign-up" className="underline underline-offset-4">
                        Cadastre-se
                    </Link>
                </div>
                <Button
                    className="border-slate-100 bg-blue-950 hover:bg-slate-300 bg-opacity-10 px-10 py-5 border hover:text-blue-950 duration-700"
                    type="submit"
                >
                    Entrar
                </Button>
            </form>
        </Form>
    );
}
