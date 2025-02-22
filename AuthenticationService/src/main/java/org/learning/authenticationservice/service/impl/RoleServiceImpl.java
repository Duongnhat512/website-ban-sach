package org.learning.authenticationservice.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.authenticationservice.dto.request.RoleRequest;
import org.learning.authenticationservice.dto.response.RoleResponse;
import org.learning.authenticationservice.model.Role;
import org.learning.authenticationservice.repository.RoleRepository;
import org.learning.authenticationservice.service.RoleService;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public Role getRoleById(Long id) {
        return roleRepository.findById(id).orElseThrow(() -> new RuntimeException("Role not found"));
    }

    @Override
    public Role createRole(RoleRequest role) {
        return roleRepository.save(Role.builder()
                .description(role.getDescription())
                .name(role.getName()).build());
    }
}
