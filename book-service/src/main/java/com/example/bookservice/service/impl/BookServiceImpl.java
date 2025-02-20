package com.example.bookservice.service.impl;

import com.example.bookservice.Repository.BookRepository;
import com.example.bookservice.dto.request.BookCreationRequest;
import com.example.bookservice.dto.response.BookCreationResponse;
import com.example.bookservice.dto.response.PageResponse;
import com.example.bookservice.entity.Book;
import com.example.bookservice.mapper.BookMapper;
import com.example.bookservice.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookServiceImpl implements BookService {
    private final BookRepository repository;
    private final BookMapper bookMapper;
    @Override
    public BookCreationResponse createBook(BookCreationRequest request) {
        log.info("Creating book with title: {}", request.getTitle());
        Book book = bookMapper.toBook(request);
        repository.save(book);
        return bookMapper.toBookCreationResponse(book);

    }

    @Override
    public PageResponse<BookCreationResponse> getBooks(int page, int size) {
        Pageable pageable = PageRequest.of(page-1,size);
        Page<Book> books = repository.findAll(pageable);
        return PageResponse.<BookCreationResponse>builder()
                .currentPage(page)
                .pageSize(size)
                .totalElements(books.getTotalElements())
                .totalPages(books.getTotalPages())
                .result(books.map(bookMapper::toBookCreationResponse).getContent())
                .build();
    }

    @Override
    public BookCreationResponse getBookById(Long id) {
        Book book = repository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        return bookMapper.toBookCreationResponse(book);
    }

    @Override
    public BookCreationResponse updateBook(Long id, BookCreationRequest request) {
        Book book = repository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        book.setTitle(request.getTitle());
        book.setDescription(request.getDescription());
        book.setAuthor(request.getAuthor());
        book.setPrice(request.getPrice());
        book.setReleasedDate(request.getReleasedDate());
        book.setQuantity(request.getQuantity());
        repository.save(book);
        return bookMapper.toBookCreationResponse(book);
    }

    @Override
    public BookCreationResponse deleteBookById(Long id) {
        Book book = repository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        repository.delete(book);
        return bookMapper.toBookCreationResponse(book);
    }
}
