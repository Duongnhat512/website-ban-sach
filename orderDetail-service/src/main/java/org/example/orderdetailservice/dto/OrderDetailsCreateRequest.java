package org.example.orderdetailservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailsCreateRequest {
    Long orderId;
    Long bookId;
    Integer quantity;
    Double total;
}
