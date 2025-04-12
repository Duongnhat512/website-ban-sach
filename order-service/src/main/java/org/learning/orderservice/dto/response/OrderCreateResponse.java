package org.learning.orderservice.dto.response;

import lombok.*;
import org.learning.orderservice.common.OrderStatus;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderCreateResponse {
    private Long id;
    private Double total;
    private String address;
    private OrderStatus status;
    private Long userId;
    private LocalDateTime orderDate;
    private String paymentStatus;
}
