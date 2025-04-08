package com.example.bookservice.entity;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@Document(indexName = "book")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class BookElasticSearch implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    private Long id;
    @Field(name = "title" , type = FieldType.Text)
    private String title;
    @Field(name = "description" , type = FieldType.Text)
    private String description;
    @Field(name = "author" , type = FieldType.Text)
    private String author;
    @Field(name = "originalPrice" , type = FieldType.Double)
    private Double originalPrice;
    @Field(name = "releasedDate" , type = FieldType.Date)
    private LocalDate releasedDate;
    @Field(name = "currentPrice" , type = FieldType.Double)
    private Double currentPrice;
    @Field(name = "quantity" , type = FieldType.Integer)
    private Integer quantity;
    @Field(name = "thumbnail" , type = FieldType.Text)
    private String thumbnail;
    @Field(name = "discount" , type = FieldType.Float)
    private Float discount;
    @Field(name = "publisher" , type = FieldType.Text)
    private String publisher;
    @Field(name = "pages" , type = FieldType.Long)
    private Long pages;
}
