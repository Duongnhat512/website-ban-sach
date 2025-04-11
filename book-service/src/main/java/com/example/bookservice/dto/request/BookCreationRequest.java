package com.example.bookservice.dto.request;

import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookCreationRequest {
    private String title;
    private String description;
    private String author;
    private Double originalPrice;
    private Double currentPrice;
    private LocalDate releasedDate;
    private Integer quantity;
    private String thumbnail;
    private Float discount;
    private String publisher;
    private Long pages;
    private Long categoryId;

}
