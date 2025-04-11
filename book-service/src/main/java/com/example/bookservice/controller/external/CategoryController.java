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
        try {
            CategoryResponse response = categoryService.createCategory(request);
            return ResponseData.<CategoryResponse>builder()
                    .code(HttpStatus.CREATED.value())
                    .message("Category created successfully")
                    .result(response)
                    .build();
        } catch (RuntimeException ex) {
            return ResponseData.<CategoryResponse>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("Category has already existed")
                    .result(null)
                    .build();
        }
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
        try {
            CategoryResponse response = categoryService.getCategoryById(id);
            return ResponseData.<CategoryResponse>builder()
                    .code(HttpStatus.OK.value())
                    .message("Category retrieved successfully")
                    .result(response)
                    .build();
        } catch (RuntimeException ex) {
            return ResponseData.<CategoryResponse>builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message("Category Not Found")
                    .result(null)
                    .build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseData<CategoryResponse> deleteCategoryById(@PathVariable Long id) {
        try {
            CategoryResponse response = categoryService.deleteCategoryById(id);
            return ResponseData.<CategoryResponse>builder()
                    .code(HttpStatus.OK.value())
                    .message("Category deleted successfully")
                    .result(response)
                    .build();
        } catch (RuntimeException ex) {
            String errorMessage = ex.getMessage();

            if ("Category not found".equals(errorMessage)) {
                return ResponseData.<CategoryResponse>builder()
                        .code(HttpStatus.NOT_FOUND.value())
                        .message("Category Not Found")
                        .result(null)
                        .build();
            } else if ("Cannot delete category because it still contains books".equals(errorMessage)) {
                return ResponseData.<CategoryResponse>builder()
                        .code(HttpStatus.BAD_REQUEST.value())
                        .message("Cannot delete category because it still contains books")
                        .result(null)
                        .build();
            }

            // fallback: lỗi chưa rõ
            return ResponseData.<CategoryResponse>builder()
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message("Unexpected error: " + errorMessage)
                    .result(null)
                    .build();
        }
    }

    @PutMapping("/{id}")
    public ResponseData<CategoryResponse> updateCategory(@PathVariable Long id,
                                                         @RequestBody CategoryCreationRequest request) {
        try {
            CategoryResponse response = categoryService.updateCategory(id, request);
            return ResponseData.<CategoryResponse>builder()
                    .code(HttpStatus.OK.value())
                    .message("Category updated successfully")
                    .result(response)
                    .build();
        } catch (RuntimeException ex) {
            String errorMessage = ex.getMessage();

            if ("Category not found".equals(errorMessage)) {
                return ResponseData.<CategoryResponse>builder()
                        .code(HttpStatus.NOT_FOUND.value())
                        .message("Category not found")
                        .result(null)
                        .build();
            } else if ("Category name already exists".equals(errorMessage)) {
                return ResponseData.<CategoryResponse>builder()
                        .code(HttpStatus.BAD_REQUEST.value())
                        .message("Category name already exists")
                        .result(null)
                        .build();
            }

            // fallback: lỗi chưa xác định
            return ResponseData.<CategoryResponse>builder()
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message("Unexpected error: " + errorMessage)
                    .result(null)
                    .build();
        }
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
