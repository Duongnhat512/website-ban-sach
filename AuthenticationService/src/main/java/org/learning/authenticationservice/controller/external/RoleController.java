package org.learning.authenticationservice.controller.external;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.authenticationservice.dto.request.RoleRequest;
import org.learning.authenticationservice.dto.response.ResponseData;
import org.learning.authenticationservice.dto.response.RoleResponse;
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
    public ResponseData<RoleResponse> createRole(@RequestBody RoleRequest request){
        return ResponseData.<RoleResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create Role Successfully")
                .result(roleService.createRole(request))
                .build();
    }



   @GetMapping("/get-all-roles")
    public ResponseData<List<RoleResponse>> getAllRoles(){
        return ResponseData.<List<RoleResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Get All Roles Successfully")
                .result(roleService.getRoles())
                .build();
    }



    @GetMapping("{id}")
    public ResponseData<RoleResponse> getRoleById(@PathVariable Long id){
        return ResponseData.<RoleResponse>builder()
                .message("Get Role Successfully")
                .code(HttpStatus.OK.value())
                .result(roleService.getRoleById(id))
                .build();
    }


    @GetMapping("/delete/{id}")
    public ResponseData<RoleResponse> deleteRole(@PathVariable Long id){
        return ResponseData.<RoleResponse>builder()
                .message("Delete Role Successfully")
                .code(HttpStatus.OK.value())
                .result(roleService.deleteRole(id))
                .build();
    }



        @PutMapping("/update/{id}")
    public ResponseData<RoleResponse> updateRole(@PathVariable Long id, @RequestBody RoleRequest request){
        return ResponseData.<RoleResponse>builder()
                .message("Update Role Successfully")
                .code(HttpStatus.OK.value())
                .result(roleService.updateRole(id, request))
                .build();
        }


}
