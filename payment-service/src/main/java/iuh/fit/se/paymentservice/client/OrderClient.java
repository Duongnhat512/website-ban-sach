package iuh.fit.se.paymentservice.client;

import iuh.fit.se.paymentservice.config.FeignClientConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name ="ORDER-SERVICE", configuration = FeignClientConfig.class)
public interface OrderClient {
    @PostMapping("/internal/orders/update/{id}")
    Order updateOrder(@PathVariable Long id, @RequestBody String status);
}
