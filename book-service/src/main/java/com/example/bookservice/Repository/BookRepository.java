package com.example.bookservice.Repository;

import com.example.bookservice.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    // Truy vấn tìm kiếm theo title, price trong khoảng, author và quantity
    @Query("SELECT b FROM Book b WHERE " +
            "(b.title LIKE %:title% OR :title IS NULL) AND " +
            "(b.currentPrice BETWEEN :minPrice AND :maxPrice OR :minPrice IS NULL OR :maxPrice IS NULL) AND " +
            "(b.author LIKE %:author% OR :author IS NULL) AND " +
            "(b.quantity >= :minQuantity OR :minQuantity IS NULL)")
    List<Book> searchBooks(String title, Double minPrice, Double maxPrice, String author, Integer minQuantity);
}

