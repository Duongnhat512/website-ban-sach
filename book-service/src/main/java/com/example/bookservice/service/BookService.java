package com.example.bookservice.service;

import com.example.bookservice.dto.request.BookCreationRequest;
import com.example.bookservice.dto.response.BookCreationResponse;
import com.example.bookservice.dto.response.PageResponse;
import com.example.bookservice.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BookService {


    BookCreationResponse createBook(BookCreationRequest request);

    PageResponse<BookCreationResponse> getBooks(int page, int size);

    BookCreationResponse getBookById(Long id);

    BookCreationResponse updateBook(Long id, BookCreationRequest request);

    BookCreationResponse deleteBookById(Long id);
    List<BookCreationResponse> searchBooks(String title, Double minPrice, Double maxPrice, String author, Integer minQuantity);
    void uploadImage(Long id, MultipartFile image);
}