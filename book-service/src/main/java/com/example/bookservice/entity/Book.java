package com.example.bookservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.Locale;

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
    private Double price;
    private LocalDate releasedDate;
    private Integer quantity;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
