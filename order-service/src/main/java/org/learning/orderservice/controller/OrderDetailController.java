package org.learning.orderservice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.orderservice.dto.request.OrderDetailsCreateRequest;
import org.learning.orderservice.dto.response.OrderDetailCreateResponse;
import org.learning.orderservice.dto.response.ResponseData;
import org.learning.orderservice.service.OrderDetailService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/order-details")
public class OrderDetailController {
    private final OrderDetailService orderDetailService;


    @GetMapping("/{orderId}")
    public ResponseData<List<OrderDetailCreateResponse>> getOrderDetails(Long orderId) {
        log.info("Getting order details for order: {}", orderId);
        return ResponseData.<List<OrderDetailCreateResponse>>builder()
                .code(200)
                .message("Order details retrieved successfully")
                .result(orderDetailService.getOrderDetails(orderId))
                .build();
    }
}
