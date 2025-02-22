package org.learning.authenticationservice.service;

import org.learning.authenticationservice.dto.request.RoleRequest;
import org.learning.authenticationservice.dto.response.RoleResponse;

import java.util.List;

public interface RoleService {
    RoleResponse getRoleById(Long id);

    RoleResponse createRole(RoleRequest role);

    RoleResponse updateRole(Long id, RoleRequest request);

    RoleResponse deleteRole(Long id);

    List<RoleResponse> getRoles();
}