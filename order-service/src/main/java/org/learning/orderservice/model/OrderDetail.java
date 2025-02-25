package org.learning.orderservice.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "order_details")
@AllArgsConstructor
@IdClass(OrderDetailId.class)
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class OrderDetail {
    @Id
    @Column(name = "order_id")
    Long orderId;

    @Id
    @Column(name = "book_id")
    Long bookId;

    Long quantity;
    Double total;
}
