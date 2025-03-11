package org.learning.orderservice.extenal;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
