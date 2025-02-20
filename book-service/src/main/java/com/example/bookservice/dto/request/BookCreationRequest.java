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
    private Double price;
    private LocalDate releasedDate;
    private Integer quantity;

}
