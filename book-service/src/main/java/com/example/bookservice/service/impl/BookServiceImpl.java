package com.example.bookservice.service.impl;

import co.elastic.clients.elasticsearch._types.ElasticsearchException;
import com.example.bookservice.Repository.BookElasticSearchRepository;
import com.example.bookservice.Repository.BookRepository;
import com.example.bookservice.Repository.SearchRepository;
import com.example.bookservice.dto.request.BookCreationRequest;
import com.example.bookservice.dto.response.BookCreationResponse;
import com.example.bookservice.dto.response.PageResponse;
import com.example.bookservice.entity.Book;
import com.example.bookservice.entity.BookElasticSearch;
import com.example.bookservice.mapper.BookMapper;
import com.example.bookservice.service.BookService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookServiceImpl implements BookService {
    private final BookRepository repository;
    private final BookMapper bookMapper;
    private final ElasticsearchTemplate elasticsearchTemplate;
    private final BookElasticSearchRepository elasticsearchRepository;

    private final CloudinaryService cloudinaryService;
    @Autowired
    private EntityManager entityManager;

    private final SearchRepository searchRepository;

    @Override
    public BookCreationResponse createBook(BookCreationRequest request) {
        log.info("Creating book with title: {}", request.getTitle());
        Book book = bookMapper.toBook(request);

        repository.save(book);
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
        elasticsearchRepository.existsById(bookElasticSearch.getId())
                .flatMap(exists -> {
                    if (Boolean.FALSE.equals(exists)) {
                        return elasticsearchRepository.save(bookElasticSearch)
                                .doOnSuccess(saved -> log.info("Course {} saved to Elasticsearch", saved.getId()));
                    }
                    return Mono.empty(); // Nếu không tồn tại, không làm gì
                })
                .subscribe();


        return bookMapper.toBookCreationResponse(book);

    }

    @Override
    public PageResponse<BookCreationResponse> getBooks(int page, int size, String sortBy) {
        log.info("Getting all books");
        String field = sortBy.split(":")[0];
        String direction = sortBy.split(":")[1];
        Pageable pageable;
        if (direction.equalsIgnoreCase("asc")) {
            pageable = PageRequest.of(page - 1, size).withSort(Sort.by(field).ascending());
        } else {
            pageable = PageRequest.of(page - 1, size).withSort(Sort.by(field).descending());
        }
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
        book.setOriginalPrice(request.getOriginalPrice());
        book.setCurrentPrice(request.getCurrentPrice());
        book.setReleasedDate(request.getReleasedDate());
        book.setQuantity(request.getQuantity());
        book.setDiscount(request.getDiscount());
        book.setPublisher(request.getPublisher());
        book.setPages(request.getPages());
        repository.save(book);
        return bookMapper.toBookCreationResponse(book);
    }

    @Override
    public BookCreationResponse deleteBookById(Long id) {
        Book book = repository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        repository.delete(book);
        return bookMapper.toBookCreationResponse(book);
    }

    public List<BookCreationResponse> searchBooks(String title, Double minPrice, Double maxPrice, String author, Integer minQuantity) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Book> query = cb.createQuery(Book.class);
        Root<Book> bookRoot = query.from(Book.class);

        List<Predicate> predicates = new ArrayList<>();

        // Điều kiện tìm kiếm theo title
        if (title != null && !title.isEmpty()) {
            predicates.add(cb.like(bookRoot.get("title"), "%" + title + "%"));
        }

        // Điều kiện tìm kiếm theo giá (minPrice và maxPrice)
        if (minPrice != null && maxPrice != null) {
            predicates.add(cb.between(bookRoot.get("currentPrice"), minPrice, maxPrice));
        }

        // Điều kiện tìm kiếm theo author
        if (author != null && !author.isEmpty()) {
            predicates.add(cb.like(bookRoot.get("author"), "%" + author + "%"));
        }

        // Điều kiện tìm kiếm theo quantity
        if (minQuantity != null) {
            predicates.add(cb.ge(bookRoot.get("quantity"), minQuantity));
        }

        // Áp dụng các predicate vào query
        query.select(bookRoot).where(cb.and(predicates.toArray(new Predicate[0])));

        // Thực thi truy vấn
        return entityManager.createQuery(query).getResultList().stream()
                .map(bookMapper::toBookCreationResponse).toList();
    }

    @Override
    public PageResponse<BookCreationResponse> findByCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Book> books = repository.findByCategory(category, pageable);
        return PageResponse.<BookCreationResponse>builder()
                .currentPage(page)
                .pageSize(size)
                .totalElements(books.getTotalElements())
                .totalPages(books.getTotalPages())
                .result(books.map(bookMapper::toBookCreationResponse).getContent())
                .build();
    }

    @Override
    public PageResponse<BookCreationResponse> getFlashSaleBooks(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Book> books = repository.findByDiscountGreaterThan(pageable);
        return PageResponse.<BookCreationResponse>builder()
                .currentPage(page)
                .pageSize(size)
                .totalElements(books.getTotalElements())
                .totalPages(books.getTotalPages())
                .result(books.map(bookMapper::toBookCreationResponse).getContent())
                .build();
    }

    @Override
    public void uploadImage(Long id, MultipartFile image) {

        Book book = repository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        String imageUrl = cloudinaryService.uploadImage(image);
        book.setThumbnail(imageUrl);
        repository.save(book);
    }

    @Override
    public PageResponse<BookCreationResponse> getBooksBySearchSpecification(int page, int size, String sortBy,List<String> categoryNames ,String... search) {
        return searchRepository.getBookWithSortAndSearchSpecification(page, size, sortBy, categoryNames, search);
    }
    @Override
    public PageResponse<BookElasticSearch> searchCourse(String keyword, int page, int size) {
        try {
            NativeQuery nativeQuery;
            if (keyword == null || keyword.isBlank()) {
                nativeQuery = NativeQuery.builder()
                        .withQuery(q -> q.matchAll(m -> m))
                        .withPageable(PageRequest.of(Math.max(0, page - 1), size))
                        .build();
            } else {
                nativeQuery = NativeQuery.builder()
                        .withQuery(q -> q.bool(b -> b
                                .should(s -> s.match(m -> m
                                        .field("title")  // Thêm `.keyword` nếu là field dạng text
                                        .query(keyword)
                                        .fuzziness("AUTO")
                                        .minimumShouldMatch("70%")
                                        .boost(2.0F)))
                                .should(s -> s.match(m -> m
                                        .field("description")
                                        .query(keyword)
                                        .fuzziness("AUTO")
                                        .minimumShouldMatch("70%")
                                        .boost(2.0F)))
                                .should(s -> s.match(m -> m
                                        .field("author")
                                        .query(keyword)
                                        .fuzziness("AUTO")
                                        .minimumShouldMatch("70%")
                                        .boost(2.0F)))
                                .should(s -> s.match(m -> m
                                        .field("publisher")
                                        .query(keyword)
                                        .fuzziness("AUTO")
                                        .minimumShouldMatch("70%")
                                        .boost(2.0F)))
                        ))
                        .withPageable(PageRequest.of(Math.max(0, page - 1), size))
                        .build();
            }

            SearchHits<BookElasticSearch> searchHits = elasticsearchTemplate.search(nativeQuery, BookElasticSearch.class);

            long totalElement = searchHits.getTotalHits();
            return PageResponse.<BookElasticSearch>builder()
                    .currentPage(page)
                    .pageSize(size)
                    .totalElements(totalElement)
                    .totalPages((int) Math.ceil(totalElement / (double) size))
                    .result(searchHits.getSearchHits().stream().map(SearchHit::getContent).toList())
                    .build();
        } catch (ElasticsearchException e) {
            e.printStackTrace();
            return PageResponse.<BookElasticSearch>builder()
                    .currentPage(page)
                    .pageSize(size)
                    .totalElements(0)
                    .totalPages(0)
                    .result(Collections.emptyList()) // Trả về danh sách rỗng nếu có lỗi
                    .build();
        }
    }
    @Override
    public Long totalBook() {
        try {
            return repository.count();
        } catch (Exception e) {
            log.error("Error while counting books", e);
            throw new RuntimeException("Error while counting books");
        }
    }

    @Override
    public PageResponse<BookCreationResponse> findTopTrendingBooks(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Book> books = repository.findTopTrendingBooks(pageable);
        return PageResponse.<BookCreationResponse>builder()
                .currentPage(page)
                .pageSize(size)
                .totalElements(books.getTotalElements())
                .totalPages(books.getTotalPages())
                .result(books.map(bookMapper::toBookCreationResponse).getContent())
                .build();
    }
}
