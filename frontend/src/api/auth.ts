import axios from 'axios';

const API_URL = import.meta.env.VITE_API;


export const login = async (email: string, senha: string) => {
    try {
        const response = await axios.post(
            `${API_URL}/login`,
            { email, senha },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        // Se o status não for 200, lança um erro
        if (response.status !== 200) {
            throw new Error(`Erro no login: ${response.status}`);
        }

        // Garante que um token foi retornado
        if (!response.data || !response.data.token) {
            throw new Error("Token não recebido");
        }

        return response.data.token;
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
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
