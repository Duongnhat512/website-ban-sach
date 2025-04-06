package org.learning.orderservice.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.orderservice.client.BookClient;
import org.learning.orderservice.common.OrderStatus;
import org.learning.orderservice.dto.request.OrderCreateRequest;
import org.learning.orderservice.dto.response.OrderCreateResponse;
import org.learning.orderservice.dto.response.PageResponse;
import org.learning.orderservice.extenal.Book;
import org.learning.orderservice.extenal.OrderDetail;
import org.learning.orderservice.model.Order;
import org.learning.orderservice.repository.OrderRepository;
import org.learning.orderservice.service.OrderService;
import org.springframework.data.domain.Page;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

   private final KafkaTemplate<String, String> kafkaTemplate;
   private final BookClient bookClient;
   private final ObjectMapper objectMapper;

    @Override
    public OrderCreateResponse createOrder(OrderCreateRequest request) {
        log.info("Creating order for customer: {}", request.getUserId());
        Authentication authentication =  SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
        log.info("User id: {}", userId);
        Order order = Order.builder()
                .total(request.getTotal())
                .userId(Long.valueOf(userId))
                .address(request.getAddress())
                .orderStatus(OrderStatus.PENDING)
                .orderDate(LocalDateTime.now())
                .build();
        orderRepository.save(order);
        List<OrderDetail> orderDetails = new ArrayList<>();
        for (var item : request.getOrderItems()) {
            Book book = bookClient.getBook(item.getBookId());
            OrderDetail detail = new OrderDetail();
            detail.setBookId(item.getBookId());
            detail.setQuantity(item.getQuantity());
            detail.setPrice(book.getCurrentPrice()); // Lấy giá từ ProductService
            detail.setTotal(detail.getPrice() * detail.getQuantity());
            detail.setOrderId(order.getId());
            orderDetails.add(detail);
        }
        sendOrderDetails(orderDetails);
        return OrderCreateResponse.builder()
                .id(order.getId())
                .total(order.getTotal())
                .address(order.getAddress())
                .status(order.getOrderStatus())
                .userId(order.getUserId())
                .orderDate(order.getOrderDate())
                .build();
    }
    public void sendOrderDetails(List<OrderDetail> orderDetails) {
        try {
            String jsonPayload = objectMapper.writeValueAsString(orderDetails);
            kafkaTemplate.send("create-order-detail", jsonPayload);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
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

    @Override
    public Order updatePaymentStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setPaymentStatus(status);
        orderRepository.save(order);
        return order;
    }

    @Override
    public PageResponse<OrderCreateResponse> getOrders(int page, int size) {
        Page<Order> orderPage = orderRepository.findAll(org.springframework.data.domain.PageRequest.of(page - 1, size));
        List<OrderCreateResponse> orderCreateResponses = orderPage.get().map(order -> OrderCreateResponse.builder()
                .id(order.getId())
                .total(order.getTotal())
                .address(order.getAddress())
                .status(order.getOrderStatus())
                .userId(order.getUserId())
                .orderDate(order.getOrderDate())
                .build()).toList();

        return PageResponse.<OrderCreateResponse>builder()
                .currentPage(page)
                .pageSize(size)
                .result(orderCreateResponses)
                .totalElements(orderPage.getTotalElements())
                .totalPages(orderPage.getTotalPages())
                .build();
    }

}
