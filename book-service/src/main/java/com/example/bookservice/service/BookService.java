package com.example.bookservice.service;

import com.example.bookservice.dto.request.BookCreationRequest;
import com.example.bookservice.dto.response.BookCreationResponse;
import com.example.bookservice.dto.response.PageResponse;
import org.springframework.data.domain.Page;

public interface BookService {


    BookCreationResponse createBook(BookCreationRequest request);

    PageResponse<BookCreationResponse> getBooks(int page, int size);

    BookCreationResponse getBookById(Long id);

    BookCreationResponse updateBook(Long id, BookCreationRequest request);

    BookCreationResponse deleteBookById(Long id);
    Book
}
