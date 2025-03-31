package com.example.bookservice.controller.internal;

import com.example.bookservice.entity.Category;
import com.example.bookservice.mapper.CategoryMapper;
import com.example.bookservice.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/internal/category")
public class CategoryControllerInternal {
    private final CategoryService categoryService;

    private final CategoryMapper mapper;
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Long id){
        log.info("Getting book by id: {}", id);
        return mapper.toCategory(categoryService.getCategoryById(id));
    }
}
