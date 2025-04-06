package com.example.bookservice.service.impl;
import com.example.bookservice.Repository.CategoryRepository;
import com.example.bookservice.dto.request.CategoryCreationRequest;
import com.example.bookservice.dto.response.CategoryResponse;
import com.example.bookservice.dto.response.PageResponse;
import com.example.bookservice.entity.Category;
import com.example.bookservice.mapper.CategoryMapper;
import com.example.bookservice.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryResponse createCategory(CategoryCreationRequest request) {
        if (categoryRepository.existsByName(request.getName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category name already exists");
        }

        Category category = categoryMapper.toCategory(request);
        category = categoryRepository.save(category);
        return categoryMapper.toCategoryCreationResponse(category);
    }

    @Override
    public PageResponse<CategoryResponse> getAllCategories(int page, int size) {
        Page<Category> categories = categoryRepository.findAll(PageRequest.of(page-1, size));
        List<CategoryResponse> categoryResponses = categories.getContent().stream()
                .map(categoryMapper::toCategoryCreationResponse)
                .collect(Collectors.toList());

        return PageResponse.<CategoryResponse>builder()
                .result(categoryResponses)
                .pageSize(size)
                .totalPages(categories.getTotalPages())
                .currentPage(page)
                .totalElements(categories.getTotalElements())
                .build();
    }

    @Override
    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
        return categoryMapper.toCategoryCreationResponse(category);
    }
}
