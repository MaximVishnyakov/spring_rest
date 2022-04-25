package ru.kata.spring.boot_security.demo.exception_user;

public class NoFoundUserException extends RuntimeException{
    public NoFoundUserException(String message) {
        super(message);
    }
}
