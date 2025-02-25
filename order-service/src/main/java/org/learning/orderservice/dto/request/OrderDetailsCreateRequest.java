package org.learning.orderservice.dto.request;

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
    Long quantity;
    Double total;
}
