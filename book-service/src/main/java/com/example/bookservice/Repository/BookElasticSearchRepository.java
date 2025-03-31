package com.example.bookservice.Repository;

import com.example.bookservice.entity.BookElasticSearch;
import org.springframework.data.elasticsearch.repository.ReactiveElasticsearchRepository;

public interface BookElasticSearchRepository extends ReactiveElasticsearchRepository<BookElasticSearch, Long> {

}
