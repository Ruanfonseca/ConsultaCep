import axios from 'axios';
import { Address } from '../types/types';

const API_URL = import.meta.env.VITE_API;
const CEP = import.meta.env.VITE_API_CEP;

export const fetchAddressByZip = async (zipCode: string): Promise<Partial<Address> | null> => {
    try {
        //integração com a api do cep
        const response = await axios.get(`${CEP}${zipCode}/json/`);

        if (response.data.erro) throw new Error("CEP inválido");

        return {
            street: response.data.logradouro,
            neighborhood: response.data.bairro,
            city: response.data.localidade,
            state: response.data.uf,
        };

    } catch (error) {
        alert(`Erro ao buscar o endereço:${error}`);
        return null;
    }
}

//retornando um array de endereços do backend
export const getAddresses = async (): Promise<Address[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        alert(`Erro ao retornar dados do banco:${error}`);
        return [];
    }
};

//salvando dados no backend
export const saveAddress = async (data: Address): Promise<Address | null> => {
    try {
        const response = await axios.post(API_URL, data);

        return response.data;
    } catch (error) {
        alert(`Erro ao salvar os dados:${error}`);
        return null;
    }
};

//editando os endereços
export const updateAddress = async (id: number, data: Address): Promise<Address | null> => {
    try {

        const response = await axios.put(`${API_URL}/${id}`, data);

        return response.data;

    } catch (error) {
        alert(`Error updating address:${error}`);
        return null;
    }
};


//editando os endereços
export const deleteAddress = async (id: number): Promise<Address | null> => {
    try {

        const response = await axios.delete(`${API_URL}/${id}`);

        return response.data;

    } catch (error) {
        alert(`Error updating address:${error}`);
        return null;
    }
};