/* eslint-disable no-useless-escape */
export function isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[.-]/g, "");
    if (!/^[0-9]{11}$/.test(cpf)) return false;

    // Elimina CPFs inválidos conhecidos
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validação dos dígitos verificadores
    const calcCheckDigit = (cpf: string, length: number): number => {
        let sum = 0;
        for (let i = 0; i < length; i++) {
            sum += parseInt(cpf[i]) * (length + 1 - i);
        }
        const remainder = (sum * 10) % 11;
        return remainder === 10 ? 0 : remainder;
    };

    const digit1 = calcCheckDigit(cpf, 9);
    const digit2 = calcCheckDigit(cpf, 10);

    return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
}
export function isValidCEP(cep: string): boolean {
    cep = cep.replace(/\D/g, "");
    return /^[0-9]{8}$/.test(cep);
}


export function formatCPF(value: string) {
    return value
        .replace(/\D/g, "") // Remove tudo que não for número
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function formatCEP(value: string) {
    return value
        .replace(/\D/g, "")
        .replace(/^(\d{5})(\d{1,3})$/, "$1-$2"); // Formata para XXXXX-XXX
}

export function detectarTipoDado(dado: string) {
    const regexCPFComFormatacao = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Formato: 000.000.000-00
    const regexCPFSemFormatacao = /^\d{11}$/; // Formato sem formatação: 00000000000
    const regexCEPComFormatacao = /^\d{5}-\d{3}$/;  // Formato com traço: 00000-000
    const regexCEPSemFormatacao = /^\d{8}$/;  // Formato sem traço: 00000000
    const regexNome = /^[a-zA-ZÀ-ÿ\s]+$/;

    if (regexCPFComFormatacao.test(dado) || regexCPFSemFormatacao.test(dado)) {
        return "cpf";
    } else if (regexCEPComFormatacao.test(dado) || regexCEPSemFormatacao.test(dado)) {
        return "cep";
    } else if (regexNome.test(dado)) {
        return "nome";
    } else {
        return "desconhecido";
    }
};



export function identificarTipo(dado: string) {

    if (dado.length === 11) {
        return "cpf";
    } else if (dado.length === 8) {
        return "cep";
    } else {
        return "nome";
    }
}



// Função para aplicar a máscara de CPF
export function aplicarMascaraCPF(cpf: string) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};


// Função que vai ser chamada no onChange para aplicar as máscaras
export function aplicarMascara(value: string) {
    const tipo = identificarTipo(value);
    if (tipo === 'cpf') {
        return aplicarMascaraCPF(value);
    } else if (tipo === 'cep') {
        return formatCEP(value);
    } else {
        return value
    }
};
