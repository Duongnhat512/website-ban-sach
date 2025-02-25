package org.learning.orderservice.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDetailCreateResponse {
    private Long orderId;
    private Long bookId;
    private Long quantity;
    private Double total;

}
