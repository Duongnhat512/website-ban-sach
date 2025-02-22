package org.learning.authenticationservice.controller.external;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.authenticationservice.dto.request.SignInRequest;
import org.learning.authenticationservice.dto.response.AuthenticationResponse;
import org.learning.authenticationservice.dto.response.ResponseData;
import org.learning.authenticationservice.service.impl.AuthenticationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/sign-in")
    public ResponseData<AuthenticationResponse> signIn(@RequestBody SignInRequest request) {
        return ResponseData.<AuthenticationResponse>builder()
                .result(authenticationService.signIn(request))
                .message("Sign in successfully")
                .code(200)
                .build();
    }
}
