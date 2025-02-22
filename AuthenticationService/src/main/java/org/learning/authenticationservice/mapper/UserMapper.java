package org.learning.authenticationservice.mapper;

import org.learning.authenticationservice.dto.request.UserRequest;
import org.learning.authenticationservice.dto.response.UserResponse;
import org.learning.authenticationservice.model.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserRequest request);
    UserResponse toUserResponse(User user);
    User toUser(UserResponse response);
    List<UserResponse> toUserList(List<User> users);
}
