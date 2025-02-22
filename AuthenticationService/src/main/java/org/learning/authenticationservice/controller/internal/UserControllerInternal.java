package org.learning.authenticationservice.controller.internal;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.authenticationservice.mapper.UserMapper;
import org.learning.authenticationservice.model.User;
import org.learning.authenticationservice.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/internal/users")
public class UserControllerInternal {
    private final UserService userService;

    private final UserMapper mapper;
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id){
        log.info("Getting user by id: {}", id);
        return mapper.toUser(userService.getUserById(id));
    }
}
