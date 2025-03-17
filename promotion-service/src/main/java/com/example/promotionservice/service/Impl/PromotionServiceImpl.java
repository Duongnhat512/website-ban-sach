package com.example.promotionservice.service.Impl;

import com.example.promotionservice.dto.request.PromotionCreateRequest;
import com.example.promotionservice.dto.response.PromotionCreateResponse;
import com.example.promotionservice.model.Promotion;
import com.example.promotionservice.repository.PromotionRepository;
import com.example.promotionservice.service.PromotionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PromotionServiceImpl implements PromotionService {
    private final PromotionRepository promotionRepository;

    @Override
    public PromotionCreateResponse createPromotion(PromotionCreateRequest request) {
        log.info("Creating promotion: {}", request.getName());

        Promotion promotion = Promotion.builder()
                .name(request.getName())
                .amount(request.getAmount())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .discount(request.getDiscount())
                .condition(request.getCondition())
                .build();

        promotionRepository.save(promotion);

        return PromotionCreateResponse.builder()
                .id(promotion.getId())
                .name(promotion.getName())
                .amount(promotion.getAmount())
                .startDate(promotion.getStartDate())
                .endDate(promotion.getEndDate())
                .discount(promotion.getDiscount())
                .condition(promotion.getCondition())
                .build();
    }

    @Override
    public PromotionCreateResponse getPromotion(Long promotionId) {
        return promotionRepository.findById(promotionId)
                .map(promotion -> PromotionCreateResponse.builder()
                        .id(promotion.getId())
                        .name(promotion.getName())
                        .amount(promotion.getAmount())
                        .startDate(promotion.getStartDate())
                        .endDate(promotion.getEndDate())
                        .discount(promotion.getDiscount())
                        .condition(promotion.getCondition())
                        .build())
                .orElseThrow(() -> new RuntimeException("Promotion not found"));
    }

    @Override
    public PromotionCreateResponse updateAmountPromotion(Long promotionId, Long amount) {
        Promotion promotion = promotionRepository.findById(promotionId)
                .orElseThrow(() -> new RuntimeException("Promotion not found"));
        promotion.setAmount(amount);
        promotionRepository.save(promotion);
        return PromotionCreateResponse.builder()
                .id(promotion.getId())
                .name(promotion.getName())
                .amount(promotion.getAmount())
                .startDate(promotion.getStartDate())
                .endDate(promotion.getEndDate())
                .discount(promotion.getDiscount())
                .condition(promotion.getCondition())
                .build();
    }

    @Override
    public List<PromotionCreateResponse> getAllPromotions() {
        return promotionRepository.findAll().stream()
                .map(promotion -> PromotionCreateResponse.builder()
                        .id(promotion.getId())
                        .name(promotion.getName())
                        .amount(promotion.getAmount())
                        .startDate(promotion.getStartDate())
                        .endDate(promotion.getEndDate())
                        .discount(promotion.getDiscount())
                        .condition(promotion.getCondition())
                        .build())
                .toList();
    }
}
