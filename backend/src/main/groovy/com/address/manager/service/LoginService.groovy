package com.address.manager.service

import com.address.manager.entity.Login
import com.address.manager.repository.LoginRepository
import com.address.manager.security.JwtUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
@Service
class LoginService{

    private final LoginRepository repository
    private final JwtUtil jwtUtil
    private final BCryptPasswordEncoder passwordEncoder

    LoginService(LoginRepository repository, JwtUtil jwtUtil) {
        this.repository = repository
        this.jwtUtil = jwtUtil
        this.passwordEncoder = new BCryptPasswordEncoder()
    }

    String login(String email, String senha) {
        Login login = repository.findByEmail(email)

        if (login == null) {
            throw new RuntimeException("Usuário não encontrado")
        }

        if (!passwordEncoder.matches(senha, login.senha)) {
            throw new RuntimeException("Senha inválida")
        }

        return jwtUtil.generateToken(email)
    }


    Login cadastro(String email, String senha) {
        if (repository.findByEmail(email)) {
            throw new RuntimeException("Usuário já existe")
        }

        Login login = new Login(email: email, senha: passwordEncoder.encode(senha))
        return repository.save(login)
    }
    }

