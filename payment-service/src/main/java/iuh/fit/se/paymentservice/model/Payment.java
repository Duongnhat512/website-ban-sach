package iuh.fit.se.paymentservice.model;

import iuh.fit.se.paymentservice.enumClass.PaymentMethodName;
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

    @JoinColumn(name = "payment_method")
    @Enumerated(EnumType.STRING)
    private PaymentMethodName paymentMethod;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false, name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(nullable = false, name = "order_id")
    private Long orderId;

    @Column(nullable = false, name = "confirmation_code")
    private String confirmationCode;
}


