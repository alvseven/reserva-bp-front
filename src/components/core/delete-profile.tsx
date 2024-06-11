import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TrashIcon } from "@radix-ui/react-icons";

export function DeleteAccount() {
    return (
        <Dialog>
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
                <div className="flex items-center space-x-2">
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
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" className="bg-blue-950 bg-opacity-30 text-slate-300 hover:text-black">
                            Cancelar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}