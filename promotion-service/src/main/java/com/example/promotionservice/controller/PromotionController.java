package com.example.promotionservice.controller;

import com.example.promotionservice.dto.request.PromotionCreateRequest;
import com.example.promotionservice.dto.response.PromotionCreateResponse;
import com.example.promotionservice.dto.response.ResponseData;
import com.example.promotionservice.service.PromotionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/promotions")
public class PromotionController {
    private final PromotionService promotionService;

    @PostMapping("/create")
    public ResponseData<PromotionCreateResponse> createPromotion(@RequestBody PromotionCreateRequest request) {
        log.info("Creating promotion: {}", request.getName());
        PromotionCreateResponse response = promotionService.createPromotion(request);
        return ResponseData.<PromotionCreateResponse>builder()
                .code(200)
                .message("Promotion created successfully")
                .result(response)
                .build();
    }

    @GetMapping("/{id}")
    public ResponseData<PromotionCreateResponse> getPromotionById(@PathVariable Long id) {
        log.info("Getting promotion by id: {}", id);
        PromotionCreateResponse response = promotionService.getPromotion(id);
        return ResponseData.<PromotionCreateResponse>builder()
                .code(200)
                .message("Promotion retrieved successfully")
                .result(response)
                .build();
    }

    @PutMapping("/update/{id}")
    public ResponseData<PromotionCreateResponse> updatePromotionAmount(@PathVariable Long id, @RequestParam Long amount) {
        log.info("Updating promotion amount for promotion: {}", id);
        PromotionCreateResponse response = promotionService.updateAmountPromotion(id, amount);
        return ResponseData.<PromotionCreateResponse>builder()
                .code(200)
                .message("Promotion amount updated successfully")
                .result(response)
                .build();
    }
}
