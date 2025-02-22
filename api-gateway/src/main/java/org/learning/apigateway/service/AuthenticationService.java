package org.learning.apigateway.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.learning.apigateway.dto.request.IntrospectRequest;
import org.learning.apigateway.dto.response.IntrospectResponse;
import org.learning.apigateway.dto.response.ResponseData;
import org.learning.apigateway.repository.AuthenticationClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    AuthenticationClient authenticationClient;

    public Mono<ResponseData<IntrospectResponse>> introspect(String token) {
        return authenticationClient.introspect(IntrospectRequest.builder()
                .token(token)
                .build());
    }

}
