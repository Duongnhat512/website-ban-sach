package com.example.bookservice.mapper;

import com.example.bookservice.dto.request.BookCreationRequest;
import com.example.bookservice.dto.request.CategoryCreationRequest;
import com.example.bookservice.dto.response.BookCreationResponse;
import com.example.bookservice.dto.response.CategoryResponse;
import com.example.bookservice.entity.Book;
import com.example.bookservice.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toCategory(CategoryCreationRequest request);
    CategoryResponse toCategoryCreationResponse(Category category);
    Category toCategory(CategoryResponse response);

}
