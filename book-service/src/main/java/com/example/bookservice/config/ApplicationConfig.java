package com.example.bookservice.config;

import com.example.bookservice.Repository.BookElasticSearchRepository;
import com.example.bookservice.Repository.BookRepository;
import com.example.bookservice.entity.Book;
import com.example.bookservice.entity.BookElasticSearch;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Mono;

import java.util.List;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@Slf4j
public class ApplicationConfig {

    private final BookElasticSearchRepository elasticSearchRepository;
    private final BookRepository bookRepository;
    @Bean
    ApplicationRunner applicationRunner() {
        return args -> {
            if (elasticSearchRepository.count().block() == 0) { // Kiểm tra nếu chưa có dữ liệu
                log.info("Adding data to Elasticsearch");

                List<Book> books = bookRepository.findAll().stream().toList(); // Lấy danh sách sách (Blocking)

                if (books != null) {
                    books.forEach(book -> {
                        BookElasticSearch bookElasticSearch = BookElasticSearch.builder()
                                .id(book.getId())
                                .title(book.getTitle())
                                .description(book.getDescription())
                                .author(book.getAuthor())
                                .originalPrice(book.getOriginalPrice())
                                .currentPrice(book.getCurrentPrice())
                                .quantity(book.getQuantity())
                                .discount(book.getDiscount())
                                .publisher(book.getPublisher())
                                .pages(book.getPages())
                                .thumbnail(book.getThumbnail())
                                .build();

                        Boolean exists = elasticSearchRepository.existsById(bookElasticSearch.getId()).block(); // Chặn để kiểm tra

                        if (Boolean.FALSE.equals(exists)) {
                            elasticSearchRepository.save(bookElasticSearch).block(); // Chặn để lưu
                            log.info("Book {} saved to Elasticsearch", bookElasticSearch.getId());
                        }
                    });
                }
            } else {
                log.info("Data already exists in Elasticsearch");
            }
        };
    }

}
