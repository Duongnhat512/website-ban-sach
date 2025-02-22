package org.learning.authenticationservice.controller.internal;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.authenticationservice.mapper.RoleMapper;
import org.learning.authenticationservice.model.Role;
import org.learning.authenticationservice.service.RoleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/internal/roles")
public class RoleControllerInternal {
    private final RoleService roleService;
    private final RoleMapper roleMapper;
    @GetMapping("/{id}")
    public Role getRoleById(@PathVariable Long id){
        log.info("Getting role by id: {}", id);
        return roleMapper.toRole(roleService.getRoleById(id));
    }


}

