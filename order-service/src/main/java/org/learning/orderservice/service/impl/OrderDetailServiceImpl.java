package org.learning.orderservice.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.orderservice.client.BookClient;
import org.learning.orderservice.dto.request.OrderDetailsCreateRequest;
import org.learning.orderservice.dto.response.OrderDetailCreateResponse;
import org.learning.orderservice.extenal.Book;
import org.learning.orderservice.model.Order;
import org.learning.orderservice.model.OrderDetail;
import org.learning.orderservice.repository.OrderDetailRepository;
import org.learning.orderservice.repository.OrderRepository;
import org.learning.orderservice.service.OrderDetailService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderDetailServiceImpl implements OrderDetailService {
    private final OrderDetailRepository orderDetailRepository;

    private final BookClient BOOK_CLIENT;
    private final OrderRepository ORDER_REPOSITORY;

    @Override
    public OrderDetailCreateResponse createOrderDetail(OrderDetailsCreateRequest request) {
        log.info("OrderDetailServiceImpl.createOrderDetail: {}", request);
        Order order = ORDER_REPOSITORY.findById(request.getOrderId()).orElseThrow(() -> new RuntimeException("Order not found"));
        OrderDetail orderDetail = OrderDetail.builder()
                .orderId(request.getOrderId())
                .bookId(request.getBookId())
                .quantity(request.getQuantity())
                .total(request.getTotal())
                .build();


        orderDetailRepository.save(orderDetail);

        return OrderDetailCreateResponse.builder()
                .orderId(request.getOrderId())
                .bookId(request.getBookId())
                .quantity(request.getQuantity())
                .total(request.getTotal())
                .build();
    }

    @Override
    public List<OrderDetailCreateResponse> getOrderDetails(Long orderId) {
        return orderDetailRepository.findByOrderId(orderId).stream()
                .map(orderDetail -> OrderDetailCreateResponse.builder()
                        .orderId(orderId)
                        .bookId(orderDetail.getBookId())
                        .quantity(orderDetail.getQuantity())
                        .total(orderDetail.getTotal())
                        .build())
                .collect(Collectors.toList());
    }
}
