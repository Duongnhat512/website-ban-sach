package com.example.bookservice.dto.request;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryCreationRequest {
    private String name;
    private String description;
}
