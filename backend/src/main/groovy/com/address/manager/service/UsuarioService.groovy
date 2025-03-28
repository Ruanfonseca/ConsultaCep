package com.address.manager.service

import com.address.manager.entity.Usuario;
import com.address.manager.record.UsuarioDTO;
import com.address.manager.repository.UsuarioRepository
import com.address.manager.util.CepUtils;
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
        user.setCep(CepUtils.limparCep(user.getCep()))
        Usuario savedUser = repository.save(user);
        return convertToDTO(savedUser);
    }

    public List<UsuarioDTO> pesquisarEndereco(String dado, String tipo) {
        List<UsuarioDTO> usuarioDTOList = new ArrayList<>();

        switch (tipo) {
            case "cpf":
                List<Usuario> usuariosPorCpf = repository.findByCpf(dado);
                usuarioDTOList = usuariosPorCpf.stream()
                        .map(this::convertToDTO)
                        .collect(Collectors.toList());
                break;

            case "cep":
                def viaCepService = new ApiViaCepService()

                if(viaCepService.cepExiste(dado)){
                    dado = CepUtils.limparCep(dado);
                    List<Usuario> usuariosPorCep = repository.findByCep(dado);
                    usuarioDTOList = usuariosPorCep.stream()
                            .map(this::convertToDTO)
                            .collect(Collectors.toList());
                }else{
                   return null;
                }

                break;
            case "nome":
                List<Usuario> usuariosPorNome = repository.findByNome(dado);
                usuarioDTOList = usuariosPorNome.stream()
                        .map(this::convertToDTO)
                        .collect(Collectors.toList());
                break;
            default:
                usuarioDTOList = new ArrayList<>();
        }

        return usuarioDTOList;
    }


    public UsuarioDTO updateUser(Long id, Usuario userDetails) {
        Usuario user = repository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        user.setNome(userDetails.getNome());
        user.setCpf(userDetails.getCpf());
        user.setCep(CepUtils.limparCep(userDetails.getCep()))
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
