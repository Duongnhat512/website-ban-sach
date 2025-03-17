package com.example.bookservice.Repository;

import com.example.bookservice.Repository.specification.SpecificationBuildQuery;
import com.example.bookservice.dto.response.BookCreationResponse;
import com.example.bookservice.dto.response.PageResponse;
import com.example.bookservice.entity.Book;
import com.example.bookservice.mapper.BookMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Repository
@Slf4j
public class SearchRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookMapper bookMapper;

    public PageResponse<BookCreationResponse> getBookWithSortAndSearchSpecification(int page, int size, String sortBy, String... search){
        String sortByy = sortBy.split(":")[0];
        String order = sortBy.split(":")[1];
        Sort sort = null;
        if(order.equals("desc")) {
            sort = Sort.by(sortByy).descending();
        }
        else{
            sort = Sort.by(sortByy).ascending();
        }
        Pageable pageable = PageRequest.of(page-1,size,sort);
        SpecificationBuildQuery specificationBuildQuery = new SpecificationBuildQuery();
        if(search != null){
            for (String s : search){
                Pattern pattern = Pattern.compile("(\\w+?)([:><!~^$.])(.*)(\\p{Punct}?)(.*)(\\p{Punct}?)");
                Matcher matcher = pattern.matcher(s);
                if(matcher.find()) {
                    specificationBuildQuery.with(matcher.group(1), matcher.group(2), matcher.group(3),
                            matcher.group(4), matcher.group(5));
                }
            }
        }
        Page<Book> pageBooks = bookRepository.findAll(specificationBuildQuery.buildQuery(), pageable);
        return PageResponse.<BookCreationResponse>builder()
                .currentPage(page)
                .pageSize(pageable.getPageSize())
                .totalElements(pageBooks.getTotalElements())
                .totalPages(pageBooks.getTotalPages())
                .result(pageBooks.getContent().stream().map(bookMapper::toBookCreationResponse).toList())
                .build();
    }
}
