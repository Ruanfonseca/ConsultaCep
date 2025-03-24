package com.address.manager.record

public record UsuarioDTO(
        Long id,
        String nome,
        String cpf,
        String cep,
        String rua,
        String bairro,
        String cidade,
        String estado
) {}
