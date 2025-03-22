package com.address.manager.service;

import com.address.manager.entity.User
import com.address.manager.record.UserDTO;
import com.address.manager.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<UserDTO> getAllUsers() {
        return repository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public UserDTO saveUser(User user) {
        User savedUser = repository.save(user);
        return convertToDTO(savedUser);
    }

    public UserDTO updateUser(Long id, User userDetails) {
        User user = repository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        user.setName(userDetails.getName());
        user.setCpf(userDetails.getCpf());
        user.setZipCode(userDetails.getZipCode());
        user.setStreet(userDetails.getStreet());
        user.setNeighborhood(userDetails.getNeighborhood());
        user.setCity(userDetails.getCity());
        user.setState(userDetails.getState());
        return convertToDTO(repository.save(user));
    }

    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

    private UserDTO convertToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getCpf(),
                user.getZipCode(),
                user.getStreet(),
                user.getNeighborhood(),
                user.getCity(),
                user.getState()
        );
    }
}
