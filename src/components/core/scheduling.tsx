import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import dayjs, { type Dayjs } from "dayjs";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Form, FormField, FormMessage, FormControl, FormItem, FormLabel } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

import { cn } from "@/lib/utils";

import { InsuranceBrokers, getInsuranceBrokers } from "@/services/get-insurance-brokers";
import { type CreateSchedulingData, schedulingSchema } from "./schemas/scheduling";
import { formatDate } from "@/helpers/format-date";

export function Scheduling() {

    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [insuranceBrokers, setInsuranceBrokers] = useState<InsuranceBrokers>([])

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('@reserva-bp:token')
            if (token) {
                try {
                    const response = await getInsuranceBrokers(token)
                    setInsuranceBrokers(response)
                }
                catch (error) {
                    console.log('error: ', error)
                }
            }
        })()
    }, [])

    const form = useForm<CreateSchedulingData>({
        resolver: zodResolver(schedulingSchema),
        defaultValues: {
            insuranceBrokerId: "",
            date: Date(),
            time: ""
        },
    })

    const { toast } = useToast()

    function createScheduling(data: CreateSchedulingData) {
        try {
            console.log('data: ', data)
            toast({
                title: 'Agendamento criado com sucesso',
                description: `Seu para o dia ${data.date} às ${data.time} foi agendado com sucesso`,
                className: "max-w-[40rem]"
            })
            // form.reset()
            // setDialogIsOpen(false)
        }
        catch (error) {
            console.log('Error: ', error)
        }
    }

    function closeDialog() {
        form.reset()
        setDialogIsOpen(false)
    }

    return (
        <Dialog open={dialogIsOpen} onOpenChange={() => setDialogIsOpen(!dialogIsOpen)}>
            <DialogTrigger asChild className="bg-transparent">
                <Button variant="outline" className="text-slate-300 text-xs lg:text-sm" >Agendar</Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-950 sm:max-w-[425px]">
                <DialogHeader className="gap-2">
                    <DialogTitle className="text-slate-300">Criar novo agendamento</DialogTitle>
                    <DialogDescription>
                        Um agendamento deve ter duração mínima de 30 minutos e duração máxima de 2 horas
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="flex flex-col gap-6"
                        id="create-scheduling"
                        onSubmit={(form.handleSubmit(createScheduling))}
                    >
                        <FormField
                            control={form.control}
                            name="insuranceBrokerId"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-slate-300">Corretor de seguros</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger className="bg-blue-950 bg-opacity-30 text-slate-300">
                                                <SelectValue placeholder="Selecionar" className="text-slate-200" />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-72">
                                                {insuranceBrokers.map(insuranceBroker => (
                                                    <SelectItem key={insuranceBroker._id} value={insuranceBroker._id}>{insuranceBroker.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="text-slate-300">Data</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild className="hover:bg-blue-950 hover:bg-opacity=30 hover:text-slate-300">
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "pl-3 text-left font-normal bg-blue-950 bg-opacity-30 text-slate-300",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        formatDate(field.value, false)
                                                    ) : (
                                                        <span>Escolha uma data</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto w-4 h-4 text-slate-300" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0 w-auto text-slate-300" align="start">
                                            <Calendar
                                                className="bg-blue-950 text-slate-100"
                                                mode="single"
                                                onSelect={field.onChange}
                                                disabled={(date) => (date as unknown as Dayjs) < dayjs(new Date()).subtract(1, 'day')}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-slate-300">Horário</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="12:30"
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
                            name="duration"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-slate-300">Duração</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="01:00"
                                            className="bg-blue-950 bg-opacity-30 pb-0 text-gray-300"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter className="flex justify-center sm:justify-center items-center gap-4 mt-8 w-full">
                    <Button type="submit" onClick={closeDialog} className="bg-transparent py-5 border border-red-500">Cancelar</Button>
                    <Button type="submit" form="create-scheduling" className="border-green-500 bg-transparent py-5 border">Criar agendamento</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}