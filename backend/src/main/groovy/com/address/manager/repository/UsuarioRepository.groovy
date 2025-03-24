package com.address.manager.repository

import com.address.manager.entity.Usuario
import com.address.manager.record.UsuarioDTO
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface UsuarioRepository extends JpaRepository<Usuario , Long> {
    @Query("SELECT * FROM Usuario e WHERE e.cpf = :cpf")
    List<UsuarioDTO> findByCpf(@Param("cpf") String cpf)

    @Query("SELECT * FROM Usuario e WHERE e.cep = :cep")
    List<UsuarioDTO> findByCep(@Param("cep") String cep)

    @Query("SELECT * FROM Usuario e WHERE LOWER(e.nome) LIKE LOWER(CONCAT('%', :nome, '%'))")
    List<UsuarioDTO> findByNome(@Param("nome") String nome)

}