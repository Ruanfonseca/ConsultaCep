package com.address.manager.controller

import com.address.manager.entity.Usuario
import com.address.manager.record.UsuarioDTO

import com.address.manager.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<UsuarioDTO> getAllUsers() {
        return service.getAllUsers();
    }

    @GetMapping
    List<UsuarioDTO> pesquisarEndereco(@RequestParam String dado, @RequestParam String tipo) {
        return service.pesquisarEndereco(dado, tipo)
    }

    @PostMapping
    public ResponseEntity<UsuarioDTO> saveUser(@RequestBody Usuario user) {
        return ResponseEntity.ok(service.saveUser(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> updateUser(@PathVariable Long id, @RequestBody Usuario user) {
        return ResponseEntity.ok(service.updateUser(id, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        service.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
