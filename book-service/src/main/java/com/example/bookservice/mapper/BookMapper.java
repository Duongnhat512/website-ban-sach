package com.example.bookservice.mapper;

import com.example.bookservice.dto.request.BookCreationRequest;
import com.example.bookservice.dto.response.BookCreationResponse;
import com.example.bookservice.entity.Book;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BookMapper {

    Book toBook(BookCreationRequest request);

    @Mapping(source = "category.id", target = "categoryId")
    BookCreationResponse toBookCreationResponse(Book book);

    Book toBook(BookCreationResponse response);


}
