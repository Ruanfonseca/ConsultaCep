package com.address.manager.repository

import com.address.manager.entity.Usuario
import com.address.manager.record.UsuarioDTO
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Query("SELECT u FROM Usuario u WHERE u.cpf = :cpf")
    List<Usuario> findByCpf(@Param("cpf") String cpf)

    @Query("SELECT u FROM Usuario u WHERE u.cep = :cep")
    List<Usuario> findByCep(@Param("cep") String cep)

    @Query("SELECT u FROM Usuario u WHERE LOWER(u.nome) LIKE LOWER(CONCAT('%', :nome, '%'))")
    List<Usuario> findByNome(@Param("nome") String nome)

}
