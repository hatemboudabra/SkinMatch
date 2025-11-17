package com.SkinMatch.user_service.serviceImp;

import com.SkinMatch.user_service.dto.UserDTO;
import com.SkinMatch.user_service.entity.User;
import com.SkinMatch.user_service.entity.enummeration.RoleName;
import com.SkinMatch.user_service.exception.UserAlreadyExistsException;
import com.SkinMatch.user_service.repo.UserRepo;
import com.SkinMatch.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.CollectionUtils;

import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {


    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
  private final   Keycloak keycloak;
    @Value("${keycloak.realm}")
    private String realm;
    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    public UserServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder, Keycloak keycloak) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.keycloak = keycloak;
    }
    @Override
    public User registerUser(UserDTO userDTO) throws UserAlreadyExistsException {
        // Vérifier si l'utilisateur existe déjà dans la base de données
        if (userRepo.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("Un utilisateur avec cet email existe déjà");
        }

        if (userRepo.findByUsername(userDTO.getUsername()).isPresent()) {
            throw new UserAlreadyExistsException("Un utilisateur avec ce nom d'utilisateur existe déjà");
        }

        try {
            // Créer l'utilisateur dans Keycloak
            String keycloakUserId = createKeycloakUser(userDTO);

            // Créer l'utilisateur dans la base de données locale
            User user = new User();
            user.setUsername(userDTO.getUsername());
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            user.setFirstName(userDTO.getFirstName());
            user.setLastName(userDTO.getLastName());
            user.setEmail(userDTO.getEmail());
            user.setPhone(userDTO.getPhone());
            user.setRole(RoleName.USER); // Rôle par défaut

            User savedUser = userRepo.save(user);
            log.info("Utilisateur créé avec succès: {}", savedUser.getUsername());

            return savedUser;

        } catch (Exception e) {
            log.error("Erreur lors de la création de l'utilisateur: {}", e.getMessage());
            throw new RuntimeException("Erreur lors de la création de l'utilisateur: " + e.getMessage());
        }
    }



    private String createKeycloakUser(UserDTO userDTO) {
        try {
            RealmResource realmResource = keycloak.realm(realm);
            UsersResource usersResource = realmResource.users();

            // Créer la représentation de l'utilisateur
            UserRepresentation userRepresentation = new UserRepresentation();
            userRepresentation.setUsername(userDTO.getUsername());
            userRepresentation.setEmail(userDTO.getEmail());
            userRepresentation.setFirstName(userDTO.getFirstName());
            userRepresentation.setLastName(userDTO.getLastName());
            userRepresentation.setEnabled(true);
            userRepresentation.setEmailVerified(true);

            // Créer l'utilisateur
            Response response = usersResource.create(userRepresentation);

            if (response.getStatus() != 201) {
                throw new RuntimeException("Erreur lors de la création de l'utilisateur dans Keycloak");
            }

            // Récupérer l'ID de l'utilisateur créé
            String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");

            // Définir le mot de passe
            UserResource userResource = usersResource.get(userId);
            CredentialRepresentation credential = new CredentialRepresentation();
            credential.setType(CredentialRepresentation.PASSWORD);
            credential.setValue(userDTO.getPassword());
            credential.setTemporary(false);
            userResource.resetPassword(credential);

            // Attribuer le rôle USER par défaut
            assignUserRole(userResource, realmResource);

            log.info("Utilisateur créé dans Keycloak avec l'ID: {}", userId);
            return userId;

        } catch (Exception e) {
            log.error("Erreur lors de la création de l'utilisateur dans Keycloak: {}", e.getMessage());
            throw new RuntimeException("Erreur Keycloak: " + e.getMessage());
        }
    }

    private void assignUserRole(UserResource userResource, RealmResource realmResource) {
        try {
            // Récupérer le rôle USER du realm
            RoleRepresentation userRole = realmResource.roles().get("USER").toRepresentation();

            // Attribuer le rôle à l'utilisateur
            userResource.roles().realmLevel().add(Collections.singletonList(userRole));

            log.info("Rôle USER attribué avec succès");

        } catch (Exception e) {
            log.warn("Erreur lors de l'attribution du rôle USER: {}. Le rôle pourrait ne pas exister dans Keycloak.", e.getMessage());
        }
    }
    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public Optional<User> getUserById(long id) {
        return userRepo.findById(id);
    }

    @Override
    public User updateUser(UserDTO userDTO, long id) {
        User user = userRepo.findById(id).get();

        // Update local DB entity
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setPhoto(userDTO.getPhoto());
        user.setRole(RoleName.USER);
        User saved = userRepo.save(user);

        // Sync updates to Keycloak (best-effort if user exists there)
        try {
            RealmResource realmResource = keycloak.realm(realm);
            UsersResource usersResource = realmResource.users();

            String keycloakUserId = findKeycloakUserId(usersResource, user.getUsername(), user.getEmail());
            if (keycloakUserId != null) {
                UserResource userResource = usersResource.get(keycloakUserId);
                UserRepresentation rep = new UserRepresentation();
                rep.setFirstName(saved.getFirstName());
                rep.setLastName(saved.getLastName());
                rep.setEmail(saved.getEmail());
                rep.setUsername(saved.getUsername());
                rep.setEnabled(true);
                userResource.update(rep);
            } else {
                log.warn("Utilisateur introuvable dans Keycloak pour username/email: {}/{}", user.getUsername(), user.getEmail());
            }
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour de l'utilisateur dans Keycloak: {}", e.getMessage());
        }

        return saved;

    }

    @Override
    public void deleteUser(long id) {
            // Retrieve user to be able to delete also from Keycloak
            Optional<User> toDeleteOpt = userRepo.findById(id);
            if (toDeleteOpt.isPresent()) {
                User toDelete = toDeleteOpt.get();
                try {
                    RealmResource realmResource = keycloak.realm(realm);
                    UsersResource usersResource = realmResource.users();
                    String keycloakUserId = findKeycloakUserId(usersResource, toDelete.getUsername(), toDelete.getEmail());
                    if (keycloakUserId != null) {
                        usersResource.get(keycloakUserId).remove();
                    } else {
                        log.warn("Suppression Keycloak ignorée: utilisateur introuvable pour {}/{}", toDelete.getUsername(), toDelete.getEmail());
                    }
                } catch (Exception e) {
                    log.error("Erreur lors de la suppression de l'utilisateur dans Keycloak: {}", e.getMessage());
                }
            }

            userRepo.deleteById(id);
    }

    private String findKeycloakUserId(UsersResource usersResource, String username, String email) {
        try {
            // Try by username
            if (username != null && !username.isEmpty()) {
                List<UserRepresentation> listByUsername = usersResource.search(username);
                if (!CollectionUtils.isEmpty(listByUsername)) {
                    for (UserRepresentation ur : listByUsername) {
                        if (username.equalsIgnoreCase(ur.getUsername())) {
                            return ur.getId();
                        }
                    }
                    // fallback to first match if exact not found
                    return listByUsername.get(0).getId();
                }
            }

            // Try by email
            if (email != null && !email.isEmpty()) {
                List<UserRepresentation> listByEmail;
                try {
                    listByEmail = usersResource.search(email);
                } catch (Throwable t) {
                    listByEmail = new ArrayList<>();
                }
                if (!CollectionUtils.isEmpty(listByEmail)) {
                    for (UserRepresentation ur : listByEmail) {
                        if (email.equalsIgnoreCase(ur.getEmail())) {
                            return ur.getId();
                        }
                    }
                    return listByEmail.get(0).getId();
                }
            }
        } catch (Exception e) {
            log.error("Erreur lors de la recherche de l'utilisateur Keycloak: {}", e.getMessage());
        }
        return null;
    }
}
