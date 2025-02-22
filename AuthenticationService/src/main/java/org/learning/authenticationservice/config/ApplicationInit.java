package org.learning.authenticationservice.config;

import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.learning.authenticationservice.common.RoleName;
import org.learning.authenticationservice.model.Role;
import org.learning.authenticationservice.repository.RoleRepository;
import org.learning.authenticationservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Optional;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class ApplicationInit {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @NonFinal
    String ADMIN_USER_NAME = "admin";

    @NonFinal
    String ADMIN_PASSWORD = "admin";

    @NonFinal

    String ADMIN_EMAIL = "admin@gmail.com";

    @Bean
    ApplicationRunner applicationRunner() {
        return args -> {
            Optional<Role> role = roleRepository.findByName(RoleName.ADMIN.name());
            if (role.isEmpty()) {
                roleRepository.save(Role.builder().name(RoleName.ADMIN.name()).description("Admin role").build());
            }
            Optional<Role> roleUser = roleRepository.findByName(RoleName.USER.name());
            if (roleUser.isEmpty()) {
                roleRepository.save(Role.builder().name(RoleName.USER.name()).description("USER role").build());
            }

            if (userRepository.findByEmail(ADMIN_EMAIL).isEmpty()) {
                Role roleADM = roleRepository.findByName(RoleName.ADMIN.name())
                        .orElseThrow(() -> new RuntimeException("Admin role not found"));
                userRepository.save(org.learning.authenticationservice.model.User.builder()
                        .email(ADMIN_EMAIL)
                        .firstName(ADMIN_USER_NAME)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .role(roleADM)
                        .dob(LocalDate.now())
                        .phoneNumber("1234567890")
                        .build());
                log.warn("Admin user has been created with default password: admin, please change it");
            }


            log.info("Application initialization completed .....");
        };
    }
}
