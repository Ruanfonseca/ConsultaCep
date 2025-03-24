import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { salvarEndereco } from "../api/api";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useBuscaEnderecoPorCep } from "../hook/hook";
import { Endereco, EnderecoFormProps } from "../types/types";
import { addressSchema } from "../types/validation";
import { formatCPF } from "../util/util";

export function EnderecoForm({ onEnderecoSalvo }: EnderecoFormProps) {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Endereco>({
        resolver: zodResolver(addressSchema),
    });
    const [cep, setCep] = useState('');
    const { data, isFetching } = useBuscaEnderecoPorCep(cep);
    const [loading, setLoading] = useState(false);

    const handleBuscaAutomatica = (e: React.FocusEvent<HTMLInputElement>) => {
        const aux = e.target.value;
        if (aux.length === 8) {
            setLoading(true);
            setCep(aux);
        }
    };


    const onSubmit = async (data: Endereco) => {
        setLoading(true);
        try {
            await salvarEndereco(data);
            console.log("Endereço salvo com sucesso!");
            onEnderecoSalvo();
            limparFormulario();
        } catch (error) {
            console.error("Erro ao salvar endereço:", error);
        }
        setLoading(false);
    };

    const limparFormulario = () => {
        setValue("nome", "");
        setValue("cpf", "");
        setValue("cep", "");
        setValue("rua", "");
        setValue("bairro", "");
        setValue("cidade", "");
        setValue("estado", "");
    };

    useEffect(() => {
        if (data) {
            setValue("rua", data.rua || "");
            setValue("bairro", data.bairro || "");
            setValue("cidade", data.cidade || "");
            setValue("estado", data.estado || "");
            setLoading(false);
        }
    }, [data]);
    return (
        <div className="w-full flex items-start justify-center pt-6">
            <Card className="p-4 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl mb-0">
                <CardContent className="py-2">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                    >
                        <div className="col-span-2">
                            <Input placeholder="Nome" {...register("nome")} />
                            {errors.nome && (
                                <p className="text-red-500 text-sm">{errors.nome.message}</p>
                            )}
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <Input
                                placeholder="CPF (000.000.000-00)"
                                {...register("cpf", {
                                    required: "CPF é obrigatório",
                                    onChange: (e) => {
                                        e.target.value = formatCPF(e.target.value);
                                    },
                                    pattern: {
                                        value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                                        message: "CPF inválido",
                                    },
                                })}
                            />
                            {errors.cpf && (
                                <p className="text-red-500 text-sm">{errors.cpf.message}</p>
                            )}
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <Input
                                placeholder="CEP"
                                {...register("cep")}
                                onBlur={handleBuscaAutomatica}
                            />
                            {isFetching && <p>Buscando endereço...</p>}
                            {errors.cep && (
                                <p className="text-red-500 text-sm">{errors.cep.message}</p>
                            )}
                        </div>

                        <div className="col-span-2">
                            <Input placeholder="Logradouro" {...register("rua")} disabled />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <Input
                                placeholder="Bairro"
                                {...register("bairro")}
                                disabled
                            />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <Input placeholder="Cidade" {...register("cidade")} disabled />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <Input placeholder="Estado" {...register("estado")} disabled />
                        </div>

                        <div className="col-span-2 flex flex-col sm:flex-row justify-center gap-2">
                            <Button
                                type="submit"
                                className="w-full sm:w-auto bg-black text-white"
                                disabled={loading}
                            >
                                {loading ? "Carregando..." : "Salvar"}
                            </Button>

                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );



}