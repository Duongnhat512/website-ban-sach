package org.learning.orderservice.service;

import org.learning.orderservice.dto.request.OrderCreateRequest;
import org.learning.orderservice.dto.response.OrderCreateResponse;
import org.learning.orderservice.dto.response.PageResponse;
import org.learning.orderservice.model.Order;
import org.springframework.data.domain.Page;

public interface OrderService {
    OrderCreateResponse createOrder(OrderCreateRequest request);
    OrderCreateResponse getOrder(Long orderId);
    OrderCreateResponse updateStatus(Long orderId, String status);
    Order updatePaymentStatus(Long orderId, String status);

    PageResponse<OrderCreateResponse> getOrders(int page, int size, String sortBy);

    Long totalOrder(Long userId);
    Long totalOrder();

}
