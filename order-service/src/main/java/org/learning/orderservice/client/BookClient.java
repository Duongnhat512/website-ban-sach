package org.learning.orderservice.client;

import org.learning.orderservice.extenal.Book;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name ="BOOK-SERVICE")
public interface BookClient {
    @GetMapping("/internal/books/{id}")
    Book getBook(@PathVariable Long id);
}
