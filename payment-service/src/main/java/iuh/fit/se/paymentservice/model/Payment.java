package iuh.fit.se.paymentservice.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Entity
@Table(name = "payments")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private BigDecimal amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_method_id")
    private PaymentMethod paymentMethod;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false, name = "payment_date")
    private LocalDateTime paymentDate;


    @Column(nullable = false, name = "customer_id")
    private Long customerId;

    @Column(nullable = false, name = "order_id")
    private String orderId;

    @Column(nullable = false, name = "confirmation_code")
    private String confirmationCode;
}


