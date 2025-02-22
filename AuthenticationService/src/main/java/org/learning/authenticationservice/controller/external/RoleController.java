package org.learning.authenticationservice.controller.external;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.authenticationservice.dto.request.RoleRequest;
import org.learning.authenticationservice.dto.response.ResponseData;
import org.learning.authenticationservice.dto.response.RoleResponse;
import org.learning.authenticationservice.model.Role;
import org.learning.authenticationservice.service.RoleService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/roles")
public class RoleController {
    private final RoleService roleService;

    @PostMapping("/create-role")
    public ResponseData<Role> createRole(@RequestBody RoleRequest request){
        return ResponseData.<Role>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create Role Successfully")
                .result(roleService.createRole(request))
                .build();
    }
    @GetMapping("{id}")
    public ResponseData<Role> getRoleById(@PathVariable Long id){
        return ResponseData.<Role>builder()
                .message("Get Role Successfully")
                .code(HttpStatus.OK.value())
                .result(roleService.getRoleById(id))
                .build();
    }

}
