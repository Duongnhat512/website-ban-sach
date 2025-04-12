package org.learning.orderservice.controller;

import lombok.RequiredArgsConstructor;
import org.learning.orderservice.model.Order;
import org.learning.orderservice.service.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/orders")
public class InternalOrderController {

    private final OrderService orderService;
    @PostMapping("/update/{id}")
    public Order updateOrderStatus(@PathVariable Long id, @RequestBody String status) {
        return orderService.updatePaymentStatus(id,status);
    }
}
