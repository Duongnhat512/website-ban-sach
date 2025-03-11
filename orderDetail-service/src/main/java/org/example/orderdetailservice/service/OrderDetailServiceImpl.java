package org.example.orderdetailservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.orderdetailservice.dto.OrderDetailCreateResponse;
import org.example.orderdetailservice.model.OrderDetail;
import org.example.orderdetailservice.repository.OrderDetailRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
@Slf4j
public class OrderDetailServiceImpl implements OrderDetailService {
    private final OrderDetailRepository orderDetailRepository;
    private final ObjectMapper objectMapper;
    @Override
    @KafkaListener(topics = "create-order-detail", groupId = "my-consumer-group")
    public void createOrderDetail(String message) {
        try {
            List<OrderDetail> orderDetails = objectMapper.readValue(
                    message, new TypeReference<List<OrderDetail>>() {}
            );
            // Lưu vào DB từng order detail
            orderDetailRepository.saveAll(orderDetails);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

    }

    @Override
    public List<OrderDetailCreateResponse> getOrderDetails(Long orderId) {
        var orderDetails = orderDetailRepository.findByOrderId(orderId);
        return orderDetails.stream().map(orderDetail ->
                OrderDetailCreateResponse.builder()
                        .bookId(orderDetail.getBookId())
                        .quantity(orderDetail.getQuantity())
                        .total(orderDetail.getTotal())
                        .orderId(orderDetail.getOrderId())
                        .price(orderDetail.getPrice())
                        .build()).toList();
    }
}
