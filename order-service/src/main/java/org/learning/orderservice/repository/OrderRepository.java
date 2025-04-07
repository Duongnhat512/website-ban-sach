package org.learning.orderservice.repository;

import org.learning.orderservice.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Long countByUserId(Long userId);
}
