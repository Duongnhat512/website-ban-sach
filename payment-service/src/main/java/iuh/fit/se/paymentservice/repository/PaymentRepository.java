package iuh.fit.se.paymentservice.repository;

import iuh.fit.se.paymentservice.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
