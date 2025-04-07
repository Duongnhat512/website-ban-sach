package com.example.bookservice.controller.external;

import com.example.bookservice.dto.request.CategoryCreationRequest;
import com.example.bookservice.dto.response.CategoryResponse;
import com.example.bookservice.dto.response.PageResponse;
import com.example.bookservice.dto.response.ResponseData;
import com.example.bookservice.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/books/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping("/create")
    public ResponseData<CategoryResponse> createCategory(@RequestBody CategoryCreationRequest request) {
        return ResponseData.<CategoryResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Category created successfully")
                .result(categoryService.createCategory(request))
                .build();
    }

    @GetMapping("/all")
    public ResponseData<PageResponse<CategoryResponse>> getAllCategories(@RequestParam(defaultValue = "1") int page,
                                                                         @RequestParam(defaultValue = "10") int size,
                                                                         @RequestParam(value = "sort") String sort) {
        return ResponseData.<PageResponse<CategoryResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Fetched all categories successfully")
                .result(categoryService.getAllCategories(page,size,sort))
                .build();
    }

    @GetMapping("/{id}")
    public ResponseData<CategoryResponse> getCategoryById(@PathVariable Long id) {
        return ResponseData.<CategoryResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Category retrieved successfully")
                .result(categoryService.getCategoryById(id))
                .build();
    }

    @GetMapping("/total")
    public ResponseData<Long> totalCategory() {
        return ResponseData.<Long>builder()
                .code(HttpStatus.OK.value())
                .message("Total categories retrieved successfully")
                .result(categoryService.totalCategory())
                .build();
    }
}
