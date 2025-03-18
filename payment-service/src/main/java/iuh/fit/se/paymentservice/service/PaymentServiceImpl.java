package iuh.fit.se.paymentservice.service;

import iuh.fit.se.paymentservice.dto.VNPayResponse;
import iuh.fit.se.paymentservice.model.PaymentInfo;
import iuh.fit.se.paymentservice.utils.ServletHelper;
import iuh.fit.se.paymentservice.utils.VNPayUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Duration;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {
    private final VNPayUtils vnPayUtils;
    @Override
    public VNPayResponse createPayment(HttpServletRequest request) {
        // TODO Auto-generated method stub
        BigDecimal amount = new BigDecimal(request.getParameter("amount")).multiply(BigDecimal.valueOf(100));
        PaymentInfo paymentInfo = new PaymentInfo()
                .setReference(VNPayUtils.getRandomNumber(6))
                .setAmount(amount)
                .setDescription("Thanh toan")
                .setExpiresIn(Duration.ofMinutes(15))
                .setIpAddress(ServletHelper.extractIPAddress(request));
        return VNPayResponse.builder()
                .code(200)
                .message("success")
                .paymentUrl(vnPayUtils.getPaymentURL(paymentInfo))
                .build();

    }

    @Override
    public VNPayResponse callBack(HttpServletRequest request) {
        // Extract parameters from the request
        String vnpResponseCode = request.getParameter("vnp_ResponseCode");
        String vnpTxnRef = request.getParameter("vnp_TxnRef");
        String vnpAmount = request.getParameter("vnp_Amount");
        String vnpTransactionNo = request.getParameter("vnp_TransactionNo");
        String vnpBankCode = request.getParameter("vnp_BankCode");
        String vnpPayDate = request.getParameter("vnp_PayDate");
        String vnpOrderInfo = request.getParameter("vnp_OrderInfo");

        // Log the callback parameters
        log.info("VNPay callback received: vnp_ResponseCode={}, vnp_TxnRef={}, vnp_Amount={}, vnp_TransactionNo={}, vnp_BankCode={}, vnp_PayDate={}, vnp_OrderInfo={}",
                vnpResponseCode, vnpTxnRef, vnpAmount, vnpTransactionNo, vnpBankCode, vnpPayDate, vnpOrderInfo);

        // Validate the response code
        if ("00".equals(vnpResponseCode)) {


            // Payment successful
            return VNPayResponse.builder()
                    .code(200)
                    .message("Payment successful")
                    .build();
        } else {
            // Payment failed
            return VNPayResponse.builder()
                    .code(400)
                    .message("Payment failed")
                    .build();
        }
    }


}
