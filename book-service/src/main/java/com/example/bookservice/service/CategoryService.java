package com.example.bookservice.service;

import com.example.bookservice.dto.request.CategoryCreationRequest;
import com.example.bookservice.dto.response.CategoryResponse;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface CategoryService {
    public CategoryResponse createCategory(CategoryCreationRequest request);
    public List<CategoryResponse> getAllCategories();
    public CategoryResponse getCategoryById(Long id);
}
