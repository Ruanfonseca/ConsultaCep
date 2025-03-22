package com.address.manager.record

public record UserDTO(
        Long id,
        String name,
        String cpf,
        String zipCode,
        String street,
        String neighborhood,
        String city,
        String state
) {}
