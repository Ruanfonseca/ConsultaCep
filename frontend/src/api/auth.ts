import axios from 'axios';

const API_URL = import.meta.env.VITE_API;



export const login = async (email: string, senha: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            senha
        });

        // Verifica se o status da resposta é 200 e se contém o token
        if (response.data.token) {
            return response.data.token; // Retorna o token recebido
        }

        throw new Error('Login failed');
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error; // Relança o erro para ser tratado no lugar onde a função for chamada
    }
};


export const cadastro = async (email: string, senha: string) => {
    try {
        const response = await axios.post(`${API_URL}/cadastro`, {
            email,
            senha
        });


        if (response.status === 200 && response.data.message) {
            return response.data.message;
        }

        throw new Error('Cadastro falhou');
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        throw error;
    }
};
