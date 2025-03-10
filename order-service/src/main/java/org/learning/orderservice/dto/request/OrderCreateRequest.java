package org.learning.orderservice.dto.request;

import lombok.*;
import org.learning.orderservice.common.OrderStatus;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderCreateRequest {
    private Long userId;
    private Double total;
    private String address;
    private List<OrderItemCreateRequest> orderItems;

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class OrderItemCreateRequest {
        private Long bookId;
        private Integer quantity;
    }
}
