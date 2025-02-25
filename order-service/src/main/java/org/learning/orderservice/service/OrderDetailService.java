package org.learning.orderservice.service;

import org.learning.orderservice.dto.request.OrderDetailsCreateRequest;
import org.learning.orderservice.dto.response.OrderDetailCreateResponse;

import java.util.List;

public interface OrderDetailService {
    OrderDetailCreateResponse createOrderDetail(OrderDetailsCreateRequest request);
    List<OrderDetailCreateResponse> getOrderDetails(Long orderId);
}
