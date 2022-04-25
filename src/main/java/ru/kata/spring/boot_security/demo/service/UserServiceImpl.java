package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.dao.UserDAO;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@Qualifier("userDetailsService")
public class UserServiceImpl implements UserService {

    private UserDAO userDAO;
    private RoleService roleService;

    @Autowired
    public UserServiceImpl(UserDAO userDAO, RoleService roleService) {

        this.userDAO = userDAO;
        this.roleService = roleService;
    }

    @Override
    public List<User> getAllUsers() {
        return userDAO.getAllUsers();
    }

    @Override
    public User getUserById(long id) {
        return userDAO.getUserById(id);
    }

    @Override
    public void save(User user) {
        user.setPassword(roleService.getCrypt(user.getPassword()));
        userDAO.save(user);
    }

    @Override
    public void update(long id, User updatedUser) {
        updatedUser.setPassword(roleService.getCrypt(updatedUser.getPassword()));
        userDAO.update(id, updatedUser);
    }

    @Override
    public void delete(long id) {
        userDAO.delete(id);
    }

    @Override
    public User getUserByUsername(String username) {
        return userDAO.getUserByUsername(username);
    }

}
