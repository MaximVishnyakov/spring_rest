package ru.kata.spring.boot_security.demo.exception_user;

public class UserIncorrectData {
    private String info;

    public UserIncorrectData() {}

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
}
