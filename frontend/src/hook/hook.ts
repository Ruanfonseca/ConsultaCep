import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { buscaEnderecoPorCep, getEnderecos } from "../api/api";
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


// Hook com React Query chamando a função da api 
export const useBuscaEnderecoPorCep = (cep: string) => {
    return useQuery<Partial<Endereco> | null, Error>({
        queryKey: ['buscaEnderecoPorCep', cep],
        queryFn: () => buscaEnderecoPorCep(cep),
        enabled: !!cep,  // Só executa a função se o CEP for preenchido
    });
};
