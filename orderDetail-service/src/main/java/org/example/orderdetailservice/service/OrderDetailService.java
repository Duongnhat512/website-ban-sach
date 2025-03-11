package org.example.orderdetailservice.service;



import org.example.orderdetailservice.dto.OrderDetailCreateResponse;


import java.util.List;

public interface OrderDetailService {
    void createOrderDetail(String message);
    List<OrderDetailCreateResponse> getOrderDetails(Long orderId);
}
