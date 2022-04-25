package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.dao.RoleDAO;
import ru.kata.spring.boot_security.demo.model.Role;

import javax.transaction.Transactional;
import java.util.Set;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    private RoleDAO roleDAO;
    private final BCryptPasswordEncoder bCrypt;

    public RoleServiceImpl(RoleDAO roleDAO, BCryptPasswordEncoder bCrypt) {

        this.roleDAO = roleDAO;
        this.bCrypt = bCrypt;
    }

    @Override
    public String getCrypt(String password) {
        return bCrypt.encode(password);
    }

    @Override
    public Set<Role> getAllRoles() {
        return roleDAO.getAllRoles();
    }

    @Override
    public Role getRoleById(int id) {
        return roleDAO.getRoleById(id);
    }

    @Override
    public void save(Role role) {
        roleDAO.save(role);
    }

    @Override
    public void update(int id, Role updatedRole) {
        roleDAO.update(id, updatedRole);
    }

    @Override
    public void delete(int id) {
        roleDAO.delete(id);

    }

    @Override
    public Role getRoleByName(String roleName) {
        return roleDAO.getRoleByName(roleName);
    }

}
