package org.learning.orderservice.repository;

import org.learning.orderservice.common.OrderStatus;
import org.learning.orderservice.dto.response.OrderCreateResponse;
import org.learning.orderservice.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Long countByUserId(Long userId);
    Page<Order> findByOrderStatus(OrderStatus orderStatus, Pageable pageable);
    Page<Order> findByUserId(Long userId, Pageable pageable);
}
