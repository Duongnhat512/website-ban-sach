package org.learning.orderservice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.orderservice.dto.request.OrderCreateRequest;
import org.learning.orderservice.dto.request.OrderDetailsCreateRequest;
import org.learning.orderservice.dto.response.OrderCreateResponse;
import org.learning.orderservice.dto.response.OrderDetailCreateResponse;
import org.learning.orderservice.dto.response.PageResponse;
import org.learning.orderservice.dto.response.ResponseData;
import org.learning.orderservice.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

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

    @GetMapping("/{id}")
    public ResponseData<OrderCreateResponse> getOrderById(@PathVariable Long id) {
        log.info("Getting order by id: {}", id);
        OrderCreateResponse response = orderService.getOrder(id);
        return ResponseData.<OrderCreateResponse>builder()
                .code(200)
                .message("Order retrieved successfully")
                .result(response)
                .build();
    }

    @PutMapping("/update/{id}")
    public ResponseData<OrderCreateResponse> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        log.info("Updating order status for order: {}", id);
        OrderCreateResponse response = orderService.updateStatus(id, status);
        return ResponseData.<OrderCreateResponse>builder()
                .code(200)
                .message("Order status updated successfully")
                .result(response)
                .build();
    }

    @GetMapping("/get-all-orders")
    public ResponseData<PageResponse<OrderCreateResponse>> getAllOrders(@RequestParam(defaultValue = "1") int page,
                                                                        @RequestParam(defaultValue = "10") int size) {
        log.info("Getting all orders");
        PageResponse<OrderCreateResponse> response = orderService.getOrders(page, size);
        return ResponseData.<PageResponse<OrderCreateResponse>>builder()
                .code(200)
                .message("Orders retrieved successfully")
                .result(response)
                .build();
    }
}
