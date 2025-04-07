package org.learning.authenticationservice.service;

import org.learning.authenticationservice.dto.request.OTPRequest;
import org.learning.authenticationservice.dto.request.RoleRequest;
import org.learning.authenticationservice.dto.request.UserRequest;
import org.learning.authenticationservice.dto.response.PageResponse;
import org.learning.authenticationservice.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse getUserById(Long id);

    UserResponse createUser(UserRequest user,String otp);

    UserResponse updateUser(Long id, UserRequest request);

    UserResponse deleteUser(Long id);

    PageResponse<UserResponse> getUsers(int page, int size,String sortBy);

    Long totalUser();

    void sendOtpByEmail(OTPRequest email);
}
