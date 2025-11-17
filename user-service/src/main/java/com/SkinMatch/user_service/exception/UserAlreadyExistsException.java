package com.SkinMatch.user_service.exception;

public class UserAlreadyExistsException extends Throwable {
    public UserAlreadyExistsException(String message)
    {
        super(message);
    }
}
