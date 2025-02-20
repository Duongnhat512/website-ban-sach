package com.example.bookservice.mapper;

import com.example.bookservice.dto.request.BookCreationRequest;
import com.example.bookservice.dto.response.BookCreationResponse;
import com.example.bookservice.entity.Book;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookMapper {

    Book toBook(BookCreationRequest request);
    BookCreationResponse toBookCreationResponse(Book book);
}
