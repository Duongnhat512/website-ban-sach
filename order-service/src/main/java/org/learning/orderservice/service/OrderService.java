package org.learning.orderservice.service;

import org.learning.orderservice.dto.request.OrderCreateRequest;
import org.learning.orderservice.dto.response.OrderCreateResponse;

public interface OrderService {
    OrderCreateResponse createOrder(OrderCreateRequest request);
    OrderCreateResponse getOrder(Long orderId);
    OrderCreateResponse updateStatus(Long orderId, String status);
}
