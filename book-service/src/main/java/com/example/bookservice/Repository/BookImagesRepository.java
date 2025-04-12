package com.example.bookservice.Repository;

import com.example.bookservice.entity.BookImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookImagesRepository extends JpaRepository<BookImages, Long> {

    List<BookImages> findByBookId(Long bookId);
}
