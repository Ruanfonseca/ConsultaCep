package com.address.manager.entity

import lombok.AllArgsConstructor
import lombok.NoArgsConstructor

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.Table
import javax.persistence.UniqueConstraint


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "login")
class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String senha

    String getEmail() {
        return email
    }

    void setEmail(String email) {
        this.email = email
    }

    String getSenha() {
        return senha
    }

    void setSenha(String senha) {
        this.senha = senha
    }
}
