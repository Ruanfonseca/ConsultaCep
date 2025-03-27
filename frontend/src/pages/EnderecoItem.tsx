import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { buscaEnderecoPorCep, deleteEndereco, editarEndereco } from "../api/api";
import '../App.css';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Endereco, EnderecoItemProps } from "../types/types";
import { addressSchema } from "../types/validation";
import { formatCEP } from "../util/util";

export function EnderecoItem({ Endereco, onEnderecoUpdated }: EnderecoItemProps) {
    const [editable, setEditable] = useState(false);
    const [data, setData] = useState(Endereco);
    const [loading, setLoading] = useState(false);

    const { register, setValue, formState: { errors } } = useForm<Endereco>({
        resolver: zodResolver(addressSchema),
        defaultValues: Endereco
    });

    useEffect(() => {
        if (editable) {
            setValue("rua", data.rua || "");
            setValue("bairro", data.bairro || "");
            setValue("cidade", data.cidade || "");
            setValue("estado", data.estado || "");
        }
    }, [editable, data, setValue]);

    const handleSave = async () => {
        setLoading(true);
        await editarEndereco(data.id!, data);
        setLoading(false);
        setEditable(false);
        onEnderecoUpdated();
    };

    const handleDelete = async () => {
        if (window.confirm("Tem certeza que deseja excluir este endereço?")) {
            setLoading(true);
            await deleteEndereco(data.id!);
            setLoading(false);
            onEnderecoUpdated();
        }
    };

    const handleZipBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const cep = e.target.value;

        if (cep) {
            setLoading(true);
            const dados = await buscaEnderecoPorCep(cep);
            if (dados) {
                setData(prev => ({ ...prev, ...dados }));
                setValue("rua", dados.rua || "");
                setValue("bairro", dados.bairro || "");
                setValue("cidade", dados.cidade || "");
                setValue("estado", dados.estado || "");
            }
            setLoading(false);
        }
    };

    return (
        <div className="container-Item">
            {editable ? (
                <>
                    <Input
                        placeholder="Nome"
                        value={data.nome}
                        onChange={(e) => setData({ ...data, nome: e.target.value })}
                        className="input sm-text-base"
                    />
                    <Input
                        placeholder="CPF (000.000.000-00)"
                        value={data.cpf}
                        onChange={(e) => setData({ ...data, cpf: e.target.value })}
                        className="input sm-text-base"
                    />
                    <Input
                        placeholder="CEP"
                        value={data.cep}
                        onChange={(e) => setData({ ...data, cep: formatCEP(e.target.value) })}
                        className="input sm-text-base"
                        onBlur={handleZipBlur}
                    />

                    <div className="col-span-2">
                        <label className="color: black;">Rua</label>
                        <Input placeholder="Logradouro" {...register("rua")} disabled />
                        {errors.rua && <span className="error">{errors.rua.message}</span>}
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <label className="color: black;">Bairro</label>
                        <Input placeholder="Bairro" {...register("bairro")} disabled />
                        {errors.bairro && <span className="error">{errors.bairro.message}</span>}
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <label className="color: black;">Cidade</label>
                        <Input placeholder="Cidade" {...register("cidade")} disabled />
                        {errors.cidade && <span className="error">{errors.cidade.message}</span>}
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <label className="color: black;">Estado</label>
                        <Input placeholder="Estado" {...register("estado")} disabled />
                        {errors.estado && <span className="error">{errors.estado.message}</span>}
                    </div>

                    <div className="button-container">
                        <Button onClick={handleSave} disabled={loading} className="button sm-w-auto custom-button">
                            {loading ? "Salvando..." : "Salvar"}
                        </Button>
                        <Button onClick={() => setEditable(false)} className="button  w-full sm:w-auto custom-button">
                            Cancelar
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className="container-Item">
                        <p className="text-sm"><strong>Nome:</strong> {Endereco.nome}</p>
                        <p className="text-sm"><strong>CPF:</strong> {Endereco.cpf}</p>
                        <p className="text-sm"><strong>CEP:</strong> {formatCEP(Endereco.cep)}</p>
                        <p className="text-sm"><strong>Logradouro:</strong> {Endereco.rua}</p>
                        <p className="text-sm"><strong>Estado:</strong> {Endereco.estado}</p>
                        <p className="text-sm"><strong>Bairro:</strong> {Endereco.bairro}</p>
                        <p className="text-sm"><strong>Cidade:</strong> {Endereco.cidade}</p>
                    </div>

                    <div className="button-container">
                        <Button onClick={() => setEditable(true)} className="custom-button">
                            Editar
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={loading} className="button  button-danger sm-w-auto ">
                            {loading ? "Excluindo..." : "Excluir"}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}