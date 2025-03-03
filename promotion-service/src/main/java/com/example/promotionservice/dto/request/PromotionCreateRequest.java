package com.example.promotionservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PromotionCreateRequest {
    private String name;
    private Long amount;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double discount;
    private String condition;
}
