package com.example.promotionservice.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PromotionCreateResponse {
    private Long id;
    private String name;
    private Long amount;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double discount;
    private String condition;
    private String code;
    private Double minAmount;
}
