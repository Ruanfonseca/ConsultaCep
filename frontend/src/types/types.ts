export interface Endereco {
    id?: number;
    nome: string;
    cpf: string;
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
}

export interface EnderecoFormProps {
    onEnderecoSalvo: () => void;
}

export interface EnderecoListProps {
    Enderecos: Endereco[];
    onEnderecoUpdated: () => void;
}

export interface EnderecoItemProps {
    Endereco: Endereco;
    onEnderecoUpdated: () => void;
}

export interface LoginCredentials {
    email: string;
    senha: string;
}

export interface LoginResponse {
    token: string;
}

export interface CadastroCredentials {
    email: string;
    senha: string;
}

export interface CadastroResponse {
    success: boolean; // Exemplo de um status de sucesso
}