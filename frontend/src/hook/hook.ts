import { useEffect, useState } from "react";
import { getEnderecos } from "../api/api";
import { Endereco } from "../types/types";

export const useEndereco = () => {
    const [enderecos, setEnderecos] = useState<Endereco[]>([]);

    useEffect(() => {
        const carregaEnderecos = async () => {
            const dados = await getEnderecos();
            setEnderecos(dados);
        }
        carregaEnderecos();
    }, []);

    return { enderecos, setEnderecos };
}

