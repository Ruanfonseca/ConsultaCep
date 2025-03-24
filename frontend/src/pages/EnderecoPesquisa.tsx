"use client";

import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { usePesquisaEndereco } from "../hook/hook";
import { Endereco } from "../types/types";


export default function EnderecoPesquisa() {
    const { register, handleSubmit, watch } = useForm();
    const search = watch("search", ""); // Captura o valor do input
    const { data, isLoading, error, refetch } = usePesquisaEndereco(search);

    const onSubmit = () => refetch(); // Dispara a pesquisa ao enviar o formulário

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Pesquisar</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Pesquisar Endereço</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                    <Input placeholder="Nome, CPF ou CEP" {...register("search")} />
                    <Button type="submit" disabled={isLoading}>Buscar</Button>
                </form>

                {isLoading && <p className="text-gray-500 text-center">Carregando...</p>}
                {error && <p className="text-red-500 text-center">{(error as Error).message}</p>}

                {/* Tabela de resultados */}
                {data && data.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>CPF</TableHead>
                                <TableHead>CEP</TableHead>
                                <TableHead>Rua</TableHead>
                                <TableHead>Bairro</TableHead>
                                <TableHead>Cidade</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((endereco: Endereco) => (
                                <TableRow key={endereco.id}>
                                    <TableCell>{endereco.nome}</TableCell>
                                    <TableCell>{endereco.cpf}</TableCell>
                                    <TableCell>{endereco.cep}</TableCell>
                                    <TableCell>{endereco.rua}</TableCell>
                                    <TableCell>{endereco.bairro}</TableCell>
                                    <TableCell>{endereco.cidade}</TableCell>
                                    <TableCell>{endereco.estado}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-center text-gray-500">Nenhum resultado encontrado.</p>
                )}
            </DialogContent>
        </Dialog>
    );
}
