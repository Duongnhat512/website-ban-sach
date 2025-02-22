package org.learning.authenticationservice.service;

import org.learning.authenticationservice.dto.request.RoleRequest;
import org.learning.authenticationservice.dto.response.RoleResponse;
import org.learning.authenticationservice.model.Role;

import java.util.List;

public interface RoleService {
    Role getRoleById(Long id);

    Role createRole(RoleRequest role);



}