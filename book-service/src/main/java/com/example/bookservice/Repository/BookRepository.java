package com.example.bookservice.Repository;

import com.example.bookservice.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> , JpaSpecificationExecutor<Book> {

    // Truy vấn tìm kiếm theo title, price trong khoảng, author và quantity
    @Query("SELECT b FROM Book b WHERE " +
            "(b.title LIKE %:title% OR :title IS NULL) AND " +
            "(b.currentPrice BETWEEN :minPrice AND :maxPrice OR :minPrice IS NULL OR :maxPrice IS NULL) AND " +
            "(b.author LIKE %:author% OR :author IS NULL) AND " +
            "(b.quantity >= :minQuantity OR :minQuantity IS NULL)")
    List<Book> searchBooks(String title, Double minPrice, Double maxPrice, String author, Integer minQuantity);
    // Truy vấn tìm kiếm theo category
    @Query("SELECT b FROM Book b WHERE b.category.name = :category")
    Page<Book> findByCategory(String category, Pageable pageable);

    // Truy vấn lấy ra các sách đang giảm giá
    @Query("SELECT b FROM Book b WHERE b.discount > 0.3")
    Page<Book> findByDiscountGreaterThan(Pageable pageable);
}

