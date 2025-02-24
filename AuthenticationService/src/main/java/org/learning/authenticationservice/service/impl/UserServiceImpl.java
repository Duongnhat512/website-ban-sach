package org.learning.authenticationservice.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.authenticationservice.common.RoleName;
import org.learning.authenticationservice.dto.request.UserRequest;
import org.learning.authenticationservice.dto.response.UserResponse;
import org.learning.authenticationservice.event.NotificationEvent;
import org.learning.authenticationservice.mapper.UserMapper;
import org.learning.authenticationservice.model.Role;
import org.learning.authenticationservice.model.User;
import org.learning.authenticationservice.repository.RoleRepository;
import org.learning.authenticationservice.repository.UserRepository;
import org.learning.authenticationservice.service.UserService;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final KafkaTemplate<String,Object> kafkaTemplate;

    @Override
    public UserResponse getUserById(Long id) {
        return userMapper.toUserResponse(userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found")));
    }

    @Override
    public UserResponse createUser(UserRequest request) {
        if(userRepository.existsByEmail(request.getEmail())){
            log.error("Email already exists");
            throw new RuntimeException("Email already exists");
        }
        User user = userMapper.toUser(request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        Role role = roleRepository.findByName(RoleName.USER.name()).orElseThrow(()->new RuntimeException("Role not found"));
        user.setRole(role);
        user.setFullName(request.getFirstName()+ " "+ request.getLastName());

        try{
            user = userRepository.save(user);

            NotificationEvent notificationEvent = NotificationEvent.builder()
                    .channel("EMAIL")
                    .recipient(user.getEmail())
                    .templateCode("welcome-email")
                    .subject("Welcome to DLeaning")
                    .build();

            kafkaTemplate.send("notification-delivery",notificationEvent);

            return userMapper.toUserResponse(user);
        }catch (Exception e){
            log.error("Error while saving user", e);
            throw new RuntimeException("Error while saving user");
        }
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
