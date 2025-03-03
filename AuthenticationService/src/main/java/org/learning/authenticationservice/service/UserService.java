package org.learning.authenticationservice.service;

import org.learning.authenticationservice.dto.request.OTPRequest;
import org.learning.authenticationservice.dto.request.RoleRequest;
import org.learning.authenticationservice.dto.request.UserRequest;
import org.learning.authenticationservice.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse getUserById(Long id);

    UserResponse createUser(UserRequest user,String otp);

    UserResponse updateUser(Long id, UserRequest request);

    UserResponse deleteUser(Long id);

    List<UserResponse> getUsers();

    void sendOtpByEmail(OTPRequest email);
}
