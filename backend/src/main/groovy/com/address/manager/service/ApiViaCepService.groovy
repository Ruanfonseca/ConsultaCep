package com.address.manager.service

import com.address.manager.record.DadosCEPDTO
import com.address.manager.util.CepUtils
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class ApiViaCepService {
    private final String VIACEP_URL = "https://viacep.com.br/ws/%s/json/"
    CepUtils util;

    String regex = /^\d{8}$/

    /**
     * Consulta o CEP na API do ViaCEP
     */
    DadosCEPDTO consultarCEP(String cep) {

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
