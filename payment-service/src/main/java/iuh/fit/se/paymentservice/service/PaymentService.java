package iuh.fit.se.paymentservice.service;

import iuh.fit.se.paymentservice.dto.VNPayResponse;
import jakarta.servlet.http.HttpServletRequest;

public interface PaymentService {
     VNPayResponse createPayment(HttpServletRequest request);
     VNPayResponse callBack(HttpServletRequest request);
}
