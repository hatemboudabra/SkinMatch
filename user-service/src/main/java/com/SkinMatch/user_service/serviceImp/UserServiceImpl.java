package com.SkinMatch.user_service.serviceImp;

import com.SkinMatch.user_service.dto.UserDTO;
import com.SkinMatch.user_service.entity.User;
import com.SkinMatch.user_service.repo.UserRepo;
import com.SkinMatch.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Value;

import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
     UserRepo userRepo;
    Keycloak keycloak;
    @Value("${keycloak.realm}")
    private String realm;


    @Override
    public User registerUser(UserDTO userDTO) {
        try {
            UserRepresentation user = new UserRepresentation();
            user.setEnabled(true);
            user.setUsername(userDTO.getUsername());
            user.setEmail(userDTO.getEmail());
            user.setFirstName(userDTO.getFirstName());
            user.setLastName(userDTO.getLastName());
            user.setEmailVerified(false);

            CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
            credentialRepresentation.setValue(userDTO.getPassword());
            credentialRepresentation.setTemporary(false);
            credentialRepresentation.setType(CredentialRepresentation.PASSWORD);

            List<CredentialRepresentation> list = new ArrayList<>();
            list.add(credentialRepresentation);
            user.setCredentials(list);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return null;
    }
}
