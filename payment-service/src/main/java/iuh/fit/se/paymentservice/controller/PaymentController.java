package iuh.fit.se.paymentservice.controller;

import iuh.fit.se.paymentservice.dto.VNPayResponse;
import iuh.fit.se.paymentservice.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/payment")
public class PaymentController {
    private final PaymentService paymentService;
    @PostMapping("/create-payment")
    public ResponseEntity<VNPayResponse> createPayment(HttpServletRequest request){
        var response = paymentService.createPayment(request);
        return ResponseEntity.status(response.getCode()).body(response);
    }
    @GetMapping("/vn-pay")
    public ResponseEntity<VNPayResponse> vnPay(HttpServletRequest request){
        return ResponseEntity.status(200).body(paymentService.createPayment(request));
    }
    @GetMapping("/vnpay-callback")
    public ResponseEntity<VNPayResponse> callBack(HttpServletRequest request) {
        VNPayResponse response = paymentService.callBack(request);
        return ResponseEntity.ok(response);
    }
}
