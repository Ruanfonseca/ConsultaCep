package com.address.manager.entity

import lombok.AllArgsConstructor
import lombok.Data
import lombok.Getter
import lombok.NoArgsConstructor
import lombok.Setter

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.PreUpdate
import javax.persistence.Table
import javax.persistence.UniqueConstraint
import java.time.LocalDateTime

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "usuarios",uniqueConstraints = @UniqueConstraint(columnNames = "cpf"))
class Usuario {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false)
        private String nome;

        @Column(nullable = false,unique = true)
        private String cpf;

        @Column(nullable = false, length = 8)
        private String cep;

        @Column(nullable = false)
        private String rua;

        @Column(nullable = false)
        private String bairro;

        @Column(nullable = false)
        private String cidade;

        @Column(nullable = false)
        private String estado;

        @Column(name = "data_criacao", nullable = false, updatable = false)
        LocalDateTime dataCriacao = LocalDateTime.now()

        @Column(name = "data_atualizacao")
        LocalDateTime dataAtualizacao

        @PreUpdate
        protected void onUpdate() {
            this.dataAtualizacao = LocalDateTime.now();
        }
        public Long getId() {
                return id;
        }

        public String getNome() {
                return nome;
        }

        public void setNome(String nome) {
                this.nome = nome;
        }

        public String getCpf() {
                return cpf;
        }

        public void setCpf(String cpf) {
                this.cpf = cpf;
        }

        public String getCep() {
                return cep;
        }

        public void setCep(String cep) {
                this.cep = cep;
        }

        public String getRua() {
                return rua;
        }

        public void setRua(String rua) {
                this.rua = rua;
        }

        public String getBairro() {
                return bairro;
        }

        public void setBairro(String bairro) {
                this.bairro = bairro;
        }

        public String getCidade() {
                return cidade;
        }

        public void setCidade(String cidade) {
                this.cidade = cidade;
        }

        public String getEstado() {
                return estado;
        }

        public void setEstado(String estado) {
                this.estado = estado;
        }

        public LocalDateTime getDataCriacao() {
                return dataCriacao;
        }

        public void setDataCriacao(LocalDateTime dataCriacao) {
                this.dataCriacao = dataCriacao;
        }

        public LocalDateTime getDataAtualizacao() {
                return dataAtualizacao;
        }

        public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
                this.dataAtualizacao = dataAtualizacao;
        }

}
