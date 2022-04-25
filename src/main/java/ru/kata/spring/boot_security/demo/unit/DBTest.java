package ru.kata.spring.boot_security.demo.unit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.annotation.PostConstruct;

@Component
public class DBTest {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public DBTest(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @PostConstruct
    public void createUsersWithRoles() {

        Role role1 = new Role("ADMIN");
        Role role2 = new Role("USER");

        roleService.save(role1);
        roleService.save(role2);

        User user1 = new User("Vasya", "Root", "VasyaRoot");
        User user2 = new User("Maxim", "King","MaximKing");
        User user3 = new User("Test", "Test","TestTest");

        user1.setPassword("root");
        user2.setPassword("root");
        user3.setPassword("root");


        user1.getRoles().add(role1);
        user2.getRoles().add(role2);
        user3.getRoles().add(role1);
        user3.getRoles().add(role2);

        userService.save(user1);
        userService.save(user2);
        userService.save(user3);

    }

}