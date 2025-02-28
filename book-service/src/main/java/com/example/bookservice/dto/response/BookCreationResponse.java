package com.example.bookservice.dto.response;

import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookCreationResponse {
    private Long id;
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

}
