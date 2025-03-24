import axios from 'axios';
import { Endereco } from '../types/types';
import { detectarTipoDado } from '../util/util';


const API_URL = import.meta.env.VITE_API;
const API_CEP = import.meta.env.VITE_API_CEP;

// Função pura para busca de endereço
export const buscaEnderecoPorCep = async (cep: string): Promise<Partial<Endereco> | null> => {
    try {
        const response = await axios.get(`${API_CEP}${cep}/json/`);

        if (response.data.erro) throw new Error("CEP inválido");

        return {
            rua: response.data.logradouro,
            bairro: response.data.bairro,
            cidade: response.data.localidade,
            estado: response.data.uf,
        };

    } catch (error) {
        if (error instanceof Error) {
            alert(`Erro ao buscar o endereço: ${error.message}`);
        } else {
            alert('Erro desconhecido ao buscar o endereço.');
        }
        return null;
    }
};



//retornando um array de endereços do backend
export const getEnderecos = async (): Promise<Endereco[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        alert(`Erro ao retornar dados do banco:${error}`);
        return [];
    }
};

// Função para buscar no banco de dados
export const pesquisaNoBanco = async (dado: string) => {
    const tipoDado = detectarTipoDado(dado);

    if (tipoDado === "desconhecido") {
        alert("Dado inválido. Insira um CPF, CEP ou nome.");
        return null;
    }

    try {
        const response = await axios.get(`${API_URL}/address`, {
            params: { dado, tipo: tipoDado }, // Enviando o tipo do dado para o backend
        });

        return response.data;
    } catch (error) {
        alert(`Erro ao retornar dados do banco: ${error}`);
        return null;
    }
};


//salvando dados no backend
export const salvarEndereco = async (data: Endereco): Promise<Endereco | null> => {
    try {
        const response = await axios.post(API_URL, data);

        return response.data;
    } catch (error) {
        alert(`Erro ao salvar os dados:${error}`);
        return null;
    }
};

//editando os endereços
export const editarEndereco = async (id: number, data: Endereco): Promise<Endereco | null> => {
    try {

        const response = await axios.put(`${API_URL}/${id}`, data);

        return response.data;

    } catch (error) {
        alert(`Error updating address:${error}`);
        return null;
    }
};


//editando os endereços
export const deleteEndereco = async (id: number): Promise<Endereco | null> => {
    try {

        const response = await axios.delete(`${API_URL}/${id}`);

        return response.data;

    } catch (error) {
        alert(`Error updating address:${error}`);
        return null;
    }
};