package org.example.orderdetailservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class OrderDetailServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderDetailServiceApplication.class, args);
    }

}
