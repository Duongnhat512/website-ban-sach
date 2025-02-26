package org.learning.orderservice.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.learning.orderservice.client.BookClient;
import org.learning.orderservice.client.UserClient;
import org.learning.orderservice.common.OrderStatus;
import org.learning.orderservice.dto.request.OrderCreateRequest;
import org.learning.orderservice.dto.response.OrderCreateResponse;
import org.learning.orderservice.extenal.Book;
import org.learning.orderservice.model.Order;
import org.learning.orderservice.repository.OrderRepository;
import org.learning.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    private final BookClient bookClient;
    private final UserClient userClient;


    @Override
    public OrderCreateResponse createOrder(OrderCreateRequest request) {
        log.info("Creating order for customer: {}", request.getUserId());

        //
//       Book book =  bookClient.getBook(request.getUserId());


//       log.info("Book details: {}", book);

        Order order = Order.builder()
                .total(request.getTotal())
                .userId(request.getUserId())
                .address(request.getAddress())
                .orderStatus(OrderStatus.PENDING)
                .orderDate(LocalDateTime.now())
                .build();

        orderRepository.save(order);
        return OrderCreateResponse.builder()
                .id(order.getId())
                .total(order.getTotal())
                .address(order.getAddress())
                .status(order.getOrderStatus())
                .userId(order.getUserId())
                .orderDate(order.getOrderDate())
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('ADMIN')")
    public OrderCreateResponse getOrder(Long orderId) {
        return orderRepository.findById(orderId)
                .map(order -> OrderCreateResponse.builder()
                        .id(order.getId())
                        .total(order.getTotal())
                        .address(order.getAddress())
                        .status(order.getOrderStatus())
                        .userId(order.getUserId())
                        .orderDate(order.getOrderDate())
                        .build())
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Override
    public OrderCreateResponse updateStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setOrderStatus(OrderStatus.valueOf(status));
        orderRepository.save(order);
        return OrderCreateResponse.builder()
                .id(order.getId())
                .total(order.getTotal())
                .address(order.getAddress())
                .status(order.getOrderStatus())
                .userId(order.getUserId())
                .orderDate(order.getOrderDate())
                .build();
    }

}
