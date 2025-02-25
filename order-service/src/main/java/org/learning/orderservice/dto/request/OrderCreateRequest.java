package org.learning.orderservice.dto.request;

import lombok.*;
import org.learning.orderservice.common.OrderStatus;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderCreateRequest {
    private Long userId;
    private Double total;
    private String address;
}
