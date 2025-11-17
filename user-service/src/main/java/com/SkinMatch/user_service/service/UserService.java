package com.SkinMatch.user_service.service;

import com.SkinMatch.user_service.dto.UserDTO;
import com.SkinMatch.user_service.entity.User;
import com.SkinMatch.user_service.exception.UserAlreadyExistsException;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public User registerUser(UserDTO userDTO) throws UserAlreadyExistsException;
    //public User LoginUser(UserDTO userDTO);
    public List<User> getAllUsers();
    public Optional<User> getUserById(long id);
    public User updateUser(UserDTO userDTO, long id);
    public void deleteUser(long id);
}