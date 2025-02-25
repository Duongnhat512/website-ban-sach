package org.learning.orderservice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.orderservice.dto.request.OrderCreateRequest;
import org.learning.orderservice.dto.request.OrderDetailsCreateRequest;
import org.learning.orderservice.dto.response.OrderCreateResponse;
import org.learning.orderservice.dto.response.OrderDetailCreateResponse;
import org.learning.orderservice.dto.response.ResponseData;
import org.learning.orderservice.service.OrderDetailService;
import org.learning.orderservice.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;
    private final OrderDetailService orderDetailService;

    @PostMapping("/create")
    public ResponseData<OrderCreateResponse> createOrder(@RequestBody OrderCreateRequest request) {
        log.info("Creating order for customer: {}", request.getUserId());
        OrderCreateResponse response = orderService.createOrder(request);
        return ResponseData.<OrderCreateResponse>builder()
                .code(200)
                .message("Order created successfully")
                .result(response)
                .build();

    }

    @PostMapping("/{id}")
    public ResponseData<OrderCreateResponse> getOrderById(@PathVariable Long id) {
        log.info("Getting order by id: {}", id);
        OrderCreateResponse response = orderService.getOrder(id);
        return ResponseData.<OrderCreateResponse>builder()
                .code(200)
                .message("Order retrieved successfully")
                .result(response)
                .build();
    }
    @PostMapping("/order-details/create")
    public ResponseData<OrderDetailCreateResponse> createOrderDetail(@RequestBody OrderDetailsCreateRequest request){
        log.info("Creating order detail for order: {}", request.getOrderId());
        OrderDetailCreateResponse response = orderDetailService.createOrderDetail(request);
        return ResponseData.<OrderDetailCreateResponse>builder()
                .code(200)
                .message("Order detail created successfully")
                .result(response)
                .build();
    }

}
