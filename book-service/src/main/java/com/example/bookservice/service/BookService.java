package com.example.bookservice.service;

import com.example.bookservice.dto.request.BookCreationRequest;
import com.example.bookservice.dto.response.BookCreationResponse;
import com.example.bookservice.dto.response.PageResponse;
import com.example.bookservice.entity.Book;
import com.example.bookservice.entity.BookElasticSearch;
import com.example.bookservice.entity.BookImages;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface BookService {


    BookCreationResponse createBook(BookCreationRequest request);

    PageResponse<BookCreationResponse> getBooks(int page, int size, String sortBy);

    BookCreationResponse getBookById(Long id);

    BookCreationResponse updateBook(Long id, BookCreationRequest request);

    BookCreationResponse deleteBookById(Long id);

    List<BookCreationResponse> searchBooks(String title, Double minPrice, Double maxPrice, String author, Integer minQuantity);

    PageResponse<BookCreationResponse> findByCategory(String category, int page, int size);

    PageResponse<BookCreationResponse> getFlashSaleBooks(int page, int size);

    PageResponse<BookCreationResponse> findTopTrendingBooks(int page, int size);

    void uploadImage(Long id, List<MultipartFile> images) ;

    PageResponse<BookCreationResponse> getBooksBySearchSpecification(int page, int size,String sortBy,List<String> categoryNames, String... search);

    PageResponse<BookElasticSearch> searchCourse(String keyword, int page, int size);

    Long totalBook();

    List<BookImages> getBookImagesByBookId(Long bookId);
    void deleteBookImageById(Long id);

}