package org.learning.orderservice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.orderservice.dto.request.OrderCreateRequest;
import org.learning.orderservice.dto.response.OrderCreateResponse;
import org.learning.orderservice.dto.response.ResponseData;
import org.learning.orderservice.service.OrderService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;
    @PostMapping("/create")
    public ResponseData<OrderCreateResponse> createOrder(@RequestBody OrderCreateRequest request){
        log.info("Creating order for customer: {}", request.getBookId());
        OrderCreateResponse response = orderService.createOrder(request);
        return ResponseData.<OrderCreateResponse>builder()
                .code(200)
                .message("Order created successfully")
                .result(response)
                .build();
    }


}
