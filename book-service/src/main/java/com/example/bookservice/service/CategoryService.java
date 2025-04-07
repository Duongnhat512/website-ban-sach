package com.example.bookservice.service;

import com.example.bookservice.dto.request.CategoryCreationRequest;
import com.example.bookservice.dto.response.CategoryResponse;
import com.example.bookservice.dto.response.PageResponse;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface CategoryService {
    public CategoryResponse createCategory(CategoryCreationRequest request);
    public PageResponse<CategoryResponse> getAllCategories(int page, int size,String sortBy);
    public CategoryResponse getCategoryById(Long id);
}
