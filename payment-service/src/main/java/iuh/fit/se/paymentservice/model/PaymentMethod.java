package iuh.fit.se.paymentservice.model;
import iuh.fit.se.paymentservice.enumClass.PaymentMethodName;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "payment_methods")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class PaymentMethod{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "method_name")
    PaymentMethodName methodName;

    @Column(name = "details")
    String details;
}