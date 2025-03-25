package com.address.manager.controller

import com.address.manager.service.LoginService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping

import org.springframework.web.bind.annotation.RestController

@RestController
class LoginController {
    @Autowired
    LoginService Service

    @PostMapping("/login")
    ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String token = Service.login(request.email, request.senha)
        return ResponseEntity.ok([token: token])
    }

    @PostMapping("/cadastro")
    ResponseEntity<?> cadastro(@RequestBody Map<String, String> request) {
        Service.cadastro(request.email, request.senha)
        return ResponseEntity.ok([message: "Usuário cadastrado com sucesso!"])
    }
}
