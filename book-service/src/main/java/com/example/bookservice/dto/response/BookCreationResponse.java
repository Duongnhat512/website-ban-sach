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
    private Double price;
    private LocalDate releasedDate;
    private Integer quantity;

}
