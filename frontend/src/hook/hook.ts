import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { buscaEnderecoPorCep, getEnderecos, pesquisaNoBanco } from "../api/api";
import { cadastro, login } from '../api/auth';
import { CadastroCredentials, CadastroResponse, Endereco, LoginCredentials, LoginResponse } from "../types/types";


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


export const usePesquisaEndereco = (dado: string) => {
    return useQuery({
        queryKey: ["enderecos", dado],
        queryFn: () => pesquisaNoBanco(dado),
        enabled: false,
        retry: false, // Não tenta refazer a requisição em caso de erro
    });
};


// Hook para login
export const useLogin = (): UseMutationResult<LoginResponse, Error, LoginCredentials> => {
    return useMutation<LoginResponse, Error, LoginCredentials>({
        mutationFn: async (credentials: LoginCredentials) => {
            const data = await login(credentials.email, credentials.senha);
            return data;
        },
    });
};

// Hook para cadastro
export const useCadastro = (): UseMutationResult<CadastroResponse, Error, CadastroCredentials> => {
    return useMutation<CadastroResponse, Error, CadastroCredentials>({
        mutationFn: async (credentials: CadastroCredentials) => {
            const response = await cadastro(credentials.email, credentials.senha);
            console.log(response.data);
            return response;
        },
    });
};