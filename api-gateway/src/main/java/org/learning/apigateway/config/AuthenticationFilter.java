package org.learning.apigateway.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.learning.apigateway.dto.response.ResponseData;
import org.learning.apigateway.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Lazy;
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
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class AuthenticationFilter implements GlobalFilter, Ordered {
    @Lazy
    AuthenticationService authenticationService;
    ObjectMapper objectMapper;

    @Value("${app.api-prefix}")
    @NonFinal
    private String apiPrefix;

    @NonFinal
    private String[] publicEndpoints = {

            "/v3/api-docs", "/swagger-ui", "/swagger-ui.html",
            "/auth/.*", "/order-details/create", "/books/.*", "/comments/.*",
            "/promotions/.*", "/payment/vnpay-callback"
    };

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        if (isPublicEndpoint(request)) {
            log.debug("Public endpoint accessed: {}", request.getPath().value());
            return chain.filter(exchange);
        }

        log.debug("Authentication filter executed for path: {}", request.getPath().value());
        List<String> authHeaders = request.getHeaders().get(HttpHeaders.AUTHORIZATION);

        if (CollectionUtils.isEmpty(authHeaders)) {
            log.warn("Missing Authorization header");
            return unauthenticated(exchange.getResponse());
        }

        String token = authHeaders.get(0).replace("Bearer ", "");
        log.debug("Extracted token: {}", token);

        return authenticationService.introspect(token)
                .flatMap(responseData -> {
                    log.info("Introspect response: valid={}", responseData.getResult().isValid());
                    if (responseData.getResult().isValid()) {
                        return chain.filter(exchange);
                    }
                    log.warn("Invalid token");
                    return unauthenticated(exchange.getResponse());
                })
                .onErrorResume(throwable -> {
                    log.error("Error during token introspection: {}", throwable.getMessage());
                    return unauthenticated(exchange.getResponse());
                });
    }

    @Override
    public int getOrder() {
        return -1;
    }

    private boolean isPublicEndpoint(ServerHttpRequest request) {
        String path = request.getPath().value();
        log.debug("Checking if path is public: {}", path);
        return Arrays.stream(publicEndpoints)
                .anyMatch(s -> path.matches(apiPrefix + s));
    }

    private Mono<Void> unauthenticated(ServerHttpResponse response) {
        ResponseData<?> apiResponse = ResponseData.builder()
                .code(401)
                .message("Unauthenticated")
                .build();
        try {
            String body = objectMapper.writeValueAsString(apiResponse);
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            response.getHeaders().add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
            return response.writeWith(Mono.just(response.bufferFactory().wrap(body.getBytes())));
        } catch (JsonProcessingException e) {
            log.error("Error serializing unauthenticated response: {}", e.getMessage());
            return response.setComplete();
        }
    }
}