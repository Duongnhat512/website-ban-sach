package org.learning.authenticationservice.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.authenticationservice.common.RoleName;
import org.learning.authenticationservice.dto.response.AuthenticationResponse;
import org.learning.authenticationservice.model.Role;
import org.learning.authenticationservice.model.User;
import org.learning.authenticationservice.repository.RoleRepository;
import org.learning.authenticationservice.repository.UserRepository;
import org.learning.authenticationservice.service.impl.AuthenticationService;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
@Slf4j
public class Oauth2SuccessHandle implements AuthenticationSuccessHandler {

    private final RoleRepository roleRepository;
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;


    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticatedPrincipal principal = (OAuth2AuthenticatedPrincipal) authentication.getPrincipal();
        String registrationId = null;
        if (authentication instanceof OAuth2AuthenticationToken) {
            registrationId = ((OAuth2AuthenticationToken) authentication).getAuthorizedClientRegistrationId();
        }

        if(registrationId == null){
           throw new RuntimeException("Unknown provider");
        }
        String name;
        String email;
        String avatar;

        if("github".equalsIgnoreCase(registrationId)){
            name = principal.getAttribute("login");
            email = principal.getAttribute("email");
            avatar = principal.getAttribute("avatar_url");
            if(email == null){
                email = principal.getAttribute("login") + "@gmail.com";
            }
        }else if("google".equalsIgnoreCase(registrationId)){
            name = principal.getAttribute("name");
            email = principal.getAttribute("email");
            avatar = principal.getAttribute("picture");
        }
        else{
            avatar = "";
            if("facebook".equalsIgnoreCase(registrationId)){
                name = principal.getAttribute("name");
                email = principal.getAttribute("email");
            }else{
                throw new RuntimeException("Unknown provider");
            }
        }

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        assert name != null;
        String[] nameParts = name.split(" ");
        String firstName = nameParts[0];
        String lastname = nameParts.length > 1 ? String.join(" ", Arrays.copyOfRange(nameParts, 1, nameParts.length)) : "";
        Role role = roleRepository.findByName(RoleName.USER.name()).orElseThrow(()-> new RuntimeException("Not found"));

        String finalEmail = email;
        String passwordDefault = "123456";
        User user = userRepository.findByEmail(email).orElseGet(()->{
            User newUser = new User();
            newUser.setEmail(finalEmail);
            newUser.setFirstName(firstName);
            newUser.setLastName(lastname);
            newUser.setRole(role);
            newUser.setPassword(passwordEncoder.encode(passwordDefault));
            return userRepository.save(newUser);
        });
        String token = authenticationService.generateToken(user);

        AuthenticationResponse resp = AuthenticationResponse.builder()
                .token(token)
                .build();
        response.getWriter().write(new ObjectMapper().writeValueAsString(resp));
    }
}