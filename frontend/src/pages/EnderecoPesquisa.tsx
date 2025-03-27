"use client";

import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { usePesquisaEndereco } from "../hook/hook";
import { Endereco } from "../types/types";
import { aplicarMascara } from "../util/util";
import './css/endereco-pesquisa.css';

export default function EnderecoPesquisa() {
    const { register, handleSubmit, watch, setValue } = useForm();
    const search = watch("search", "");
    const { data, isLoading, error, refetch } = usePesquisaEndereco(search);

    const onSubmit = () => refetch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        const valorComMascara = aplicarMascara(valor);
        setValue("search", valorComMascara);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Pesquisar</Button>
            </DialogTrigger>

            <DialogContent className="dialog-content">
                <DialogHeader>
                    <DialogTitle>Pesquisar Endereço</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="form-endereco">
                    <Input
                        placeholder="Nome, CPF ou CEP"
                        {...register("search")}
                        onChange={handleInputChange}
                    />
                    <Button type="submit" disabled={isLoading}>
                        Buscar
                    </Button>
                </form>

                {isLoading && <p className="text-gray-500 text-center mt-4">Carregando...</p>}
                {error && (
                    <p className="text-red-500 text-center mt-4">
                        {(error as Error).message}
                    </p>
                )}

                {data && data.length > 0 ? (
                    <div className="table-container">
                        <table className="table-endereco">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>CEP</th>
                                    <th>Rua</th>
                                    <th>Bairro</th>
                                    <th>Cidade</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((endereco: Endereco) => (
                                    <tr key={endereco.id}>
                                        <td>{endereco.nome}</td>
                                        <td>{endereco.cpf}</td>
                                        <td>{endereco.cep}</td>
                                        <td>{endereco.rua}</td>
                                        <td>{endereco.bairro}</td>
                                        <td>{endereco.cidade}</td>
                                        <td>{endereco.estado}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-4">Nenhum resultado encontrado.</p>
                )}
            </DialogContent>
        </Dialog>
    );
}
