package com.example.bookservice.service.impl;

import com.example.bookservice.Repository.BookRepository;
import com.example.bookservice.Repository.SearchRepository;
import com.example.bookservice.dto.request.BookCreationRequest;
import com.example.bookservice.dto.response.BookCreationResponse;
import com.example.bookservice.dto.response.PageResponse;
import com.example.bookservice.entity.Book;
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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookServiceImpl implements BookService {
    private final BookRepository repository;
    private final BookMapper bookMapper;

    private final CloudinaryService cloudinaryService;
    @Autowired
    private EntityManager entityManager;

    private final SearchRepository searchRepository;
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
        Pageable pageable = PageRequest.of(page-1,size);
        Page<Book> books = repository.findByCategory(category,pageable);
        return PageResponse.<BookCreationResponse>builder()
                .currentPage(page)
                .pageSize(size)
                .totalElements(books.getTotalElements())
                .totalPages(books.getTotalPages())
                .result(books.map(bookMapper::toBookCreationResponse).getContent())
                .build();
    }

    @Override
    public PageResponse<BookCreationResponse> getFlashSaleBooks() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Book> books = repository.findByDiscountGreaterThan(pageable);
        return PageResponse.<BookCreationResponse>builder()
                .currentPage(1)
                .pageSize(10)
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
    public PageResponse<BookCreationResponse> getBooksBySearchSpecification(int page, int size, String sortBy, String... search) {
        return searchRepository.getBookWithSortAndSearchSpecification(page, size, sortBy, search);
    }


}
