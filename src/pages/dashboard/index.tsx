import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "@/providers/auth";

import { Scheduling } from "@/components/core/scheduling";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { User } from "@/components/ui/user";
import { EditAccount } from "@/components/core/edit-account";
import { Separator } from "@/components/ui/separator";
import { DeleteAccount } from "@/components/core/delete-profile";

import { formatDate } from "@/helpers/format-date";
import { verifyDateIsInTheFuture } from "@/helpers/verify-date-is-in-the-future";

export function DashboardPage() {

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    const futureSchedules = user!.schedulings.filter(scheduling => verifyDateIsInTheFuture(scheduling.date))

    const logout = () => {
        localStorage.removeItem('@reserva-bp:token')
        navigate('/')
    }

    return (
        <div className="flex gap-4 w-full">
            <aside className="flex flex-col gap-4 bg-slate-800 bg-opacity-15 p-8 rounded w-1/5 max-w-64 h-dvh">
                {user && <User name={user.name} />}
                <Separator className="my-1" />
                {user?.role === "Customer" && <Scheduling />}
                <EditAccount />
                <Separator className="my-1" />
                <DeleteAccount />
                <Button className="bg-transparent hover:bg-blue-900 hover:bg-opacity-20 border border-red-500 text-xs lg:text-sm" onClick={logout}>
                    Sair
                </Button>
            </aside>
            <div className="flex flex-col gap-8 pt-8 w-10/12">
                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">Todos os agendamentos</TabsTrigger>
                        <TabsTrigger value="future">Agendamentos futuros</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <main>
                            <Table className="bg-black">
                                <TableHeader>
                                    <TableRow className="h-14">
                                        <TableHead className="pl-8">Corretor de seguros</TableHead>
                                        <TableHead>Agendado em</TableHead>
                                        <TableHead>Data da consulta</TableHead>
                                        <TableHead className="pr-8">
                                            Duração
                                        </TableHead>
                                        <TableHead className="pr-8 text-center">
                                            Status
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {user!.schedulings.map((scheduling) => (
                                        <TableRow className="h-16" key={scheduling._id}>
                                            <TableCell className="pl-8">{scheduling.insuranceBrokerName}</TableCell>
                                            <TableCell>{formatDate(scheduling.createdAt)}</TableCell>
                                            <TableCell>{formatDate(scheduling.date, true, scheduling.time)}</TableCell>
                                            <TableCell className="pl-5">
                                                {scheduling.duration}
                                            </TableCell>
                                            <TableCell className="pr-8 text-center">
                                                {verifyDateIsInTheFuture(scheduling.date) ? 'Pendente' : 'Realizado'}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </main>
                    </TabsContent>
                    <TabsContent value="future">
                        <main>
                            <Table className="bg-black">
                                <TableHeader>
                                    <TableRow className="h-14">
                                        <TableHead className="pl-8">Corretor de seguros</TableHead>
                                        <TableHead>Agendado em</TableHead>
                                        <TableHead>Data da consulta</TableHead>
                                        <TableHead className="pr-8">
                                            Duração
                                        </TableHead>
                                        <TableHead className="pr-8 text-center">
                                            Status
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {futureSchedules.map((scheduling) => (
                                        <TableRow className="h-16" key={scheduling._id}>
                                            <TableCell className="pl-8">{scheduling.insuranceBrokerName}</TableCell>
                                            <TableCell>{formatDate(scheduling.createdAt)}</TableCell>
                                            <TableCell>{formatDate(scheduling.date)}</TableCell>
                                            <TableCell className="pl-5">
                                                {scheduling.duration}
                                            </TableCell>
                                            <TableCell className="pr-8 text-center">
                                                {verifyDateIsInTheFuture(scheduling.date) ? 'Pendente' : 'Realizado'}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </main>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
