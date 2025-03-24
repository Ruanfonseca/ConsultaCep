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

export function formatCPF(value: string) {
    return value
        .replace(/\D/g, "") // Remove tudo que não for número
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function detectarTipoDado(dado: string) {
    const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Formato: 000.000.000-00
    const regexCEP = /^\d{5}-\d{3}$/; // Formato: 00000-000
    const regexNome = /^[a-zA-ZÀ-ÿ\s]+$/; // Letras e espaços (considerando acentos)

    if (regexCPF.test(dado)) {
        return "cpf";
    } else if (regexCEP.test(dado)) {
        return "cep";
    } else if (regexNome.test(dado)) {
        return "nome";
    } else {
        return "desconhecido";
    }
};
