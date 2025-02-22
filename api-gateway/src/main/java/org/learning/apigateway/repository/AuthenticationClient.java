package org.learning.apigateway.repository;

import org.learning.apigateway.dto.request.IntrospectRequest;
import org.learning.apigateway.dto.response.IntrospectResponse;
import org.learning.apigateway.dto.response.ResponseData;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.PostExchange;
import reactor.core.publisher.Mono;


public interface AuthenticationClient {

    @PostExchange(value = "/introspect",contentType = MediaType.APPLICATION_JSON_VALUE)
    Mono<ResponseData<IntrospectResponse>> introspect(@RequestBody IntrospectRequest request);
}
