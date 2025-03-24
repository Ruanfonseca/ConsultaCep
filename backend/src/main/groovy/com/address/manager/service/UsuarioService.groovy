package com.address.manager.service

import com.address.manager.entity.Usuario;
import com.address.manager.record.UsuarioDTO;
import com.address.manager.repository.UsuarioRepository;
import org.springframework.stereotype.Service

import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public List<UsuarioDTO> getAllUsers() {
        return repository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public UsuarioDTO saveUser(Usuario user) {
        Usuario savedUser = repository.save(user);
        return convertToDTO(savedUser);
    }

    public List<UsuarioDTO> pesquisarEndereco(String dado, String tipo) {
        switch (tipo) {
            case "cpf":
                return repository.findByCpf(dado)
            case "cep":
                return repository.findByCep(dado)
            case "nome":
                return repository.findByNome(dado)
            default:
                return []
        }
    }

    public UsuarioDTO updateUser(Long id, Usuario userDetails) {
        Usuario user = repository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        user.setNome(userDetails.getNome());
        user.setCpf(userDetails.getCpf());
        user.setCep(userDetails.getCep());
        user.setRua(userDetails.getRua());
        user.setBairro(userDetails.getBairro());
        user.setCidade(userDetails.getCidade());
        user.setEstado(userDetails.getEstado());
        return convertToDTO(repository.save(user));
    }

    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

    private UsuarioDTO convertToDTO(Usuario user) {
        return new UsuarioDTO(
                user.getId(),
                user.getNome(),
                user.getCpf(),
                user.getCep(),
                user.getRua(),
                user.getBairro(),
                user.getCidade(),
                user.getEstado()
        );
    }
}
