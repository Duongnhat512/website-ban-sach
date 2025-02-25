package com.example.bookservice.Repository;

import com.example.bookservice.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findBookByTitle(String title);
    List<Book> findBookByPriceBetween(double price1, double price2);
}
