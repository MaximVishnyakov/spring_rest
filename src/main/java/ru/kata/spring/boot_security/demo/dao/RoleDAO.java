package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleDAO {
    Set<Role> getAllRoles();

    Role getRoleById(int id);

    void save(Role role);

    void update(int id, Role updatedRole);

    void delete(int id);

    Role getRoleByName(String roleName);
}
