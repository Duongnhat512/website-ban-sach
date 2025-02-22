package org.learning.authenticationservice.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.authenticationservice.dto.request.RoleRequest;
import org.learning.authenticationservice.dto.response.RoleResponse;
import org.learning.authenticationservice.mapper.RoleMapper;
import org.learning.authenticationservice.repository.RoleRepository;
import org.learning.authenticationservice.service.RoleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    @Override
    public RoleResponse getRoleById(Long id) {
        return roleMapper.toRoleResponse(roleRepository.findById(id).orElseThrow(() -> new RuntimeException("Role not found")));
    }

    @Override
    public RoleResponse createRole(RoleRequest role) {
        return roleMapper.toRoleResponse(roleRepository.save(roleMapper.toRole(role)));
    }

    @Override
    public RoleResponse updateRole(Long id, RoleRequest request) {
        RoleResponse roleResponse = getRoleById(id);
        return roleMapper.toRoleResponse(roleRepository.save(roleMapper.toRole(request)));
    }

    @Override
    public RoleResponse deleteRole(Long id) {
        RoleResponse roleResponse = getRoleById(id);
        roleRepository.deleteById(id);
        return roleResponse;
    }

    @Override
    public List<RoleResponse> getRoles() {
        return roleMapper.toRoleList(roleRepository.findAll());
    }


}
