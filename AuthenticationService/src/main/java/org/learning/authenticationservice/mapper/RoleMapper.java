package org.learning.authenticationservice.mapper;
import org.learning.authenticationservice.dto.request.RoleRequest;
import org.learning.authenticationservice.dto.response.RoleResponse;
import org.learning.authenticationservice.model.Role;
import  org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    Role toRole(RoleRequest request);
    RoleResponse toRoleResponse(Role role);
    Role toRole(RoleResponse response);
    List<RoleResponse> toRoleList(List<Role> roles);



}
