package org.learning.apigateway.config;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.learning.apigateway.dto.response.ResponseData;
import org.learning.apigateway.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class AuthenticationFilter implements GlobalFilter, Ordered {
    AuthenticationService authenticationService;
    ObjectMapper objectMapper;

    @Value("${app.api-prefix}")
    @NonFinal
    private String apiPrefix;

    @NonFinal
    private String[] publicEndpoints = {"/v3/api-docs", "/swagger-ui", "/swagger-ui.html"
            ,"/auth/.*","/order-details/create","/books/.*" , "/comments/.*", "/promotions/.*"};

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        if(isPublicEndpoint(exchange.getRequest())) {
            return chain.filter(exchange);
        }
        log.info("Authentication filter executed");

        List<String> authHeaders = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION);

        if(CollectionUtils.isEmpty(authHeaders)){
            return unauthenticated(exchange.getResponse());
        }
        String token = authHeaders.get(0).substring(7);
        log.info("Token: {}", token);
        return authenticationService.introspect(token).flatMap(introspectResponseResponseData -> {
            log.info("Introspect response: {}", introspectResponseResponseData.getResult().isValid());
            if(introspectResponseResponseData.getResult().isValid()){
                return chain.filter(exchange);
            }
            else{
                return unauthenticated(exchange.getResponse());
            }
        }).onErrorResume(throwable -> unauthenticated(exchange.getResponse()));
    }

    @Override
    public int getOrder() {
        return -1;
    }

    private boolean isPublicEndpoint(ServerHttpRequest request){
        log.info("Request path: {}", request.getPath().value());
        String path = request.getPath().value();
        log.info("Request path: {}", path);
        // Kiểm tra Swagger UI & API Docs trước
        return Arrays.stream(publicEndpoints).anyMatch(s -> request.getURI().getPath().matches(apiPrefix + s));

    }
    Mono<Void> unauthenticated(ServerHttpResponse response){
        ResponseData<?> apiResponse = ResponseData.builder()
                .code(401)
                .message("Unauthenticated")
                .build();
        String body = null;
        try{
            body = objectMapper.writeValueAsString(apiResponse);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        response.getHeaders().add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        return response.writeWith(Mono.just(response.bufferFactory().wrap(body.getBytes())));


    }
}
