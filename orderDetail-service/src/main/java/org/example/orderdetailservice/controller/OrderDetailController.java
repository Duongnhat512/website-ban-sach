package org.example.orderdetailservice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.orderdetailservice.dto.OrderDetailCreateResponse;
import org.example.orderdetailservice.dto.ResponseData;
import org.example.orderdetailservice.service.OrderDetailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/order-detail")
public class OrderDetailController {

    private final OrderDetailService orderDetailService;

    @GetMapping("/{id}")
    public ResponseData<List<OrderDetailCreateResponse>> getOrderDetails(@PathVariable Long id) {
        return ResponseData.<List<OrderDetailCreateResponse>>builder()
                .result(orderDetailService.getOrderDetails(id))
                .message("Order details retrieved successfully")
                .code(200)
                .build();
    }
}
