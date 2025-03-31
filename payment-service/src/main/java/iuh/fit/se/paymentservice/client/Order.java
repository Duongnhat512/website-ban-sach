package iuh.fit.se.paymentservice.client;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name= "order_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDateTime orderDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status")
    OrderStatus orderStatus;

    @Column(name = "user_id")
    Long userId;

    @Column(name = "total_price")
    Double total;

    @Column(name = "address")
    String address;

    @Column(name = "payment_status")
    String paymentStatus;

}
