package org.learning.authenticationservice.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.authenticationservice.dto.request.UserRequest;
import org.learning.authenticationservice.dto.response.UserResponse;
import org.learning.authenticationservice.mapper.UserMapper;
import org.learning.authenticationservice.repository.UserRepository;
import org.learning.authenticationservice.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserResponse getUserById(Long id) {
        return userMapper.toUserResponse(userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found")));
    }

    @Override
    public UserResponse createUser(UserRequest user) {
        return userMapper.toUserResponse(userRepository.save(userMapper.toUser(user)));
    }

    @Override
    public UserResponse updateUser(Long id, UserRequest request) {
        UserResponse userResponse = getUserById(id);
        return userMapper.toUserResponse(userRepository.save(userMapper.toUser(request)));
    }

    @Override
    public UserResponse deleteUser(Long id) {
        UserResponse userResponse = getUserById(id);
        userRepository.deleteById(id);
        return userResponse;
    }

    @Override
    public List<UserResponse> getUsers() {
        return userMapper.toUserList(userRepository.findAll());
    }

}
