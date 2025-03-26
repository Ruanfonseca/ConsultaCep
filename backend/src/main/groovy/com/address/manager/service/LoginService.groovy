package com.address.manager.service

import com.address.manager.entity.Login
import com.address.manager.repository.LoginRepository
import org.springframework.stereotype.Service


@Service
class LoginService{

    private final LoginRepository repository

    LoginService(LoginRepository repository) {
        this.repository = repository
    }

    String login(String email, String senha) {
        Login login = repository.findByEmail(email)

        if (login == null) {
            throw new RuntimeException("Usuário não encontrado")
        }



        return email;
    }


    Login cadastro(String email, String senha) {
        if (repository.findByEmail(email)) {
            throw new RuntimeException("Usuário já existe")
        }

        Login login = new Login(email: email, senha: senha)
        return repository.save(login)
    }
    }

