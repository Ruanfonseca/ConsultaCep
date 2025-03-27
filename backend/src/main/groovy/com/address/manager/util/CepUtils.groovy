package com.address.manager.util

import org.springframework.stereotype.Component

@Component
class CepUtils {
    static String limparCep(String cep) {
        return cep?.replaceAll("\\D", "")
    }
}