package iuh.fit.se.paymentservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name ="ORDER-SERVICE")
public interface OrderClient {
    @PostMapping("/internal/orders/update/{id}")
    Order updateOrder(@PathVariable Long id, @RequestParam String status);
}
