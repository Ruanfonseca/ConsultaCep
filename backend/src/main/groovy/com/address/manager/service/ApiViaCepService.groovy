package com.address.manager.service

import com.address.manager.record.DadosCEPDTO
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class ApiViaCepService {
    private final String VIACEP_URL = "https://viacep.com.br/ws/%s/json/"
    String regex = /^\d{8}$|^\d{5}-\d{3}$/

    /**
     * Consulta o CEP na API do ViaCEP
     */
    DadosCEPDTO consultarCEP(String cep) {
        if (!cep.matches(regex)) {
            throw new IllegalArgumentException("Erro! O CEP deve ter exatamente 8 dígitos sem pontos ou traços.")
        }

        String url = String.format(VIACEP_URL, cep)
        RestTemplate template = new RestTemplate()
        ResponseEntity<DadosCEPDTO> response = template.getForEntity(url, DadosCEPDTO.class)

        return response.getBody()
    }

    /**
     * Verifica se o CEP existe
     */
    boolean cepExiste(String cep) {
        DadosCEPDTO dados = consultarCEP(cep)
        return dados?.cep != null
    }
}
