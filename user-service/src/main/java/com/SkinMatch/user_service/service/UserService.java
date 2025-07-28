package com.SkinMatch.user_service.service;

import com.SkinMatch.user_service.dto.UserDTO;
import com.SkinMatch.user_service.entity.User;

public interface UserService {
    public User registerUser(UserDTO userDTO);
    //public User LoginUser(UserDTO userDTO);
}
