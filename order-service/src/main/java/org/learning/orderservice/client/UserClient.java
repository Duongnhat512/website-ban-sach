package org.learning.orderservice.client;

import org.apache.catalina.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "USER-SERVICE")
public interface UserClient {
    @GetMapping("/internal/users/{id}")
    User getUser(Long id);
}
