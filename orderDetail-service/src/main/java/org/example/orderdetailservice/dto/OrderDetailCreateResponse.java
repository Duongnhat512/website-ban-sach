package org.example.orderdetailservice.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDetailCreateResponse {
    private Long orderId;
    private Long bookId;
    private Integer quantity;
    private Double price;
    private Double total;

}
