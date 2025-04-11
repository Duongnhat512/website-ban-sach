package org.learning.authenticationservice.mapper;

import org.learning.authenticationservice.dto.request.UserRequest;
import org.learning.authenticationservice.dto.response.UserResponse;
import org.learning.authenticationservice.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(UserRequest request);

    @Mapping(source = "role.id", target = "roleId")
    UserResponse toUserResponse(User user);

    User toUser(UserResponse response);

    @Mapping(source = "role.id", target = "roleId")
    List<UserResponse> toUserList(List<User> users);
}