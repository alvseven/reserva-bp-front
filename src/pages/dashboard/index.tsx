import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scheduling } from "@/components/core/scheduling";

import { formatDate } from "@/helpers/format-date";
import { verifyDateIsInTheFuture } from "@/helpers/verify-date-is-in-the-future";
import { Button } from "@/components/ui/button";
import { User } from "@/components/ui/user";

const schedules = [
    {
        id: 1,
        name: "Maria Silva",
        date: "2024-06-20T10:30:00",
        createdAt: "2024-05-15T09:00:00",
    },
    {
        id: 2,
        name: "João Oliveira Pereira",
        date: "2024-06-21T11:45:00",
        createdAt: "2024-05-16T14:00:00",
    },
    {
        id: 3,
        name: "Ana Souza Beatriz",
        date: "2024-05-22T13:15:00",
        createdAt: "2024-05-17T08:30:00",
    },
    {
        id: 4,
        name: "Carlos Eduardo de Oliveira",
        date: "2024-05-23T09:20:00",
        createdAt: "2024-05-18T10:45:00",
    },
    {
        id: 5,
        name: "Fernanda Costa Lima",
        date: "2024-05-24T15:30:00",
        createdAt: "2024-05-19T12:00:00",
    },
    {
        id: 6,
        name: "Pedro Santos",
        date: "2024-05-25T08:45:00",
        createdAt: "2024-05-20T09:30:00",
    },
    {
        id: 7,
        name: "Mariana Oliveira",
        date: "2024-06-26T14:20:00",
        createdAt: "2024-05-21T11:15:00",
    },
    {
        id: 8,
        name: "Gustavo Lima",
        date: "2024-05-27T12:10:00",
        createdAt: "2024-05-22T10:00:00",
    },
    {
        id: 9,
        name: "Larissa Santos",
        date: "2024-06-28T11:30:00",
        createdAt: "2024-05-23T14:45:00",
    },
];

const futureSchedules = schedules.filter(scheduling => verifyDateIsInTheFuture(scheduling.date))

export function DashboardPage() {

    return (
        <div className="flex gap-4 pb-8 w-full">
            <aside className="flex flex-col gap-6 bg-slate-900 bg-opacity-20 p-8 rounded w-1/5 max-w-64 min-h-screen">
                <User />
                <Scheduling />
                <Button className="border border-red-500">
                    Sair
                </Button>
            </aside>
            <div className="flex flex-col gap-8 pt-8 w-3/4">
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
                                        <TableHead className="pl-8">Nome do corretor</TableHead>
                                        <TableHead>Agendado em</TableHead>
                                        <TableHead>Data da consulta</TableHead>
                                        <TableHead className="pr-8 text-center">
                                            Status
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {schedules.map((scheduling) => (
                                        <TableRow className="h-16" key={scheduling.id}>
                                            <TableCell className="pl-8">{scheduling.name}</TableCell>
                                            <TableCell>{formatDate(scheduling.createdAt)}</TableCell>
                                            <TableCell>{formatDate(scheduling.date)}</TableCell>
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
                                        <TableHead className="pl-8">Nome do corretor</TableHead>
                                        <TableHead>Agendado em</TableHead>
                                        <TableHead>Data da consulta</TableHead>
                                        <TableHead className="pr-8 text-center">
                                            Status
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {futureSchedules.map((scheduling) => (
                                        <TableRow className="h-16" key={scheduling.id}>
                                            <TableCell className="pl-8">{scheduling.name}</TableCell>
                                            <TableCell>{formatDate(scheduling.createdAt)}</TableCell>
                                            <TableCell>{formatDate(scheduling.date)}</TableCell>
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
