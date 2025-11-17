package com.SkinMatch.user_service.controller;


import com.SkinMatch.user_service.dto.UserDTO;
import com.SkinMatch.user_service.entity.User;
import com.SkinMatch.user_service.exception.UserAlreadyExistsException;
import com.SkinMatch.user_service.service.UserService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import com.SkinMatch.user_service.service.FileStorageService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@Slf4j
public class UserController {
    private final UserService userService;
    private final FileStorageService fileStorageService;

    public UserController(UserService userService, FileStorageService fileStorageService) {
        this.userService = userService;
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody UserDTO userDTO) {
        try {
            User saved = userService.registerUser(userDTO);

            Map<String, Object> payload = new HashMap<>();
            payload.put("message", "Utilisateur créé avec succès !");
            payload.put("user", saved);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(payload);
        } catch (UserAlreadyExistsException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(error);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", "Erreur interne du serveur");
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(error);
        }
    }

    @GetMapping("/alluser")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") long id){
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PutMapping(value = "/updateUser/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<User> updateUser(@PathVariable("id") long id,
                                           @RequestPart("user") UserDTO userDTO,
                                           @RequestPart(value = "file", required = false) MultipartFile file){
        try {
            User updated = userService.updateUser(userDTO , id);
            if (file != null && !file.isEmpty()) {
                String fileName = fileStorageService.store(file);
                updated.setPhoto(fileName);
            }
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping(value = "/photo/{fileName}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getPhoto(@PathVariable String fileName){
        try {
            byte[] data = fileStorageService.load(fileName);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/supruser/{id}")
    public void deleteUser(@PathVariable("id") long id){
        userService.deleteUser(id);
    }
}
