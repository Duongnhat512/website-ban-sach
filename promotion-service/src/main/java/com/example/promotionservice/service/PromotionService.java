package com.example.promotionservice.service;

import com.example.promotionservice.dto.request.PromotionCreateRequest;
import com.example.promotionservice.dto.response.PromotionCreateResponse;

import java.util.List;

public interface PromotionService {
    PromotionCreateResponse createPromotion(PromotionCreateRequest request);
    PromotionCreateResponse getPromotion(Long promotionId);
    PromotionCreateResponse updateAmountPromotion(Long promotionId, Long amount);
    List<PromotionCreateResponse> getAllPromotions();
}
