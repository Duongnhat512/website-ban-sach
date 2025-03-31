package org.learning.authenticationservice.controller.external;

import com.nimbusds.jose.JOSEException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.authenticationservice.common.RoleName;
import org.learning.authenticationservice.dto.request.IntrospectRequest;
import org.learning.authenticationservice.dto.request.LogoutRequest;
import org.learning.authenticationservice.dto.request.SignInRequest;
import org.learning.authenticationservice.dto.response.AuthenticationResponse;
import org.learning.authenticationservice.dto.response.IntrospectResponse;
import org.learning.authenticationservice.dto.response.ResponseData;
import org.learning.authenticationservice.model.Role;
import org.learning.authenticationservice.model.User;
import org.learning.authenticationservice.repository.RoleRepository;
import org.learning.authenticationservice.repository.UserRepository;
import org.learning.authenticationservice.service.impl.AuthenticationService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.util.Arrays;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @PostMapping("/sign-in")
    public ResponseData<AuthenticationResponse> signIn(@RequestBody SignInRequest request) {
        return ResponseData.<AuthenticationResponse>builder()
                .result(authenticationService.signIn(request))
                .message("Sign in successfully")
                .code(200)
                .build();
    }
    @PostMapping("/introspect")
    public ResponseData<IntrospectResponse> introspect(@RequestBody IntrospectRequest request) {
        return ResponseData.<IntrospectResponse>builder()
                .result(authenticationService.introspect(request))
                .message("introspect successfully")
                .code(200)
                .build();
    }
    @PostMapping("/sign-out")
    public ResponseData<Void> signOut(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        authenticationService.logout(request);
        return ResponseData.<Void>builder()
                .message("Sign out successfully")
                .code(200)
                .build();
    }
}
