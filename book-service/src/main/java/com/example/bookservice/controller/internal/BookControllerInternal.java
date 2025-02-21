package com.example.bookservice.controller.internal;

import com.example.bookservice.Repository.BookRepository;
import com.example.bookservice.entity.Book;
import com.example.bookservice.mapper.BookMapper;
import com.example.bookservice.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/internal/books")
public class BookControllerInternal {
    private final BookService bookService;

    private final BookMapper mapper;
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id){
        log.info("Getting book by id: {}", id);
        return mapper.toBook(bookService.getBookById(id));
    }

}
