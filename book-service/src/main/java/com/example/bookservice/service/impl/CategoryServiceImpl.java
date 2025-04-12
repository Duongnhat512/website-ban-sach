package com.example.bookservice.service.impl;

import com.example.bookservice.Repository.*;
import com.example.bookservice.client.FileClient;
import com.example.bookservice.dto.request.CategoryCreationRequest;
import com.example.bookservice.dto.response.BookCreationResponse;
import com.example.bookservice.dto.response.CategoryResponse;
import com.example.bookservice.dto.response.PageResponse;
import com.example.bookservice.entity.Book;
import com.example.bookservice.entity.BookImages;
import com.example.bookservice.entity.Category;
import com.example.bookservice.entity.CategoryImages;
import com.example.bookservice.mapper.CategoryMapper;
import com.example.bookservice.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final BookRepository bookRepository;
    private final FileClient fileClient;
    private  final CategoryImagesRepository categoryImagesRepository;
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
    public PageResponse<CategoryResponse> getAllCategories(int page, int size,String sortBy) {
        String field = sortBy.split(":")[0];
        String direction = sortBy.split(":")[1];
        Pageable pageable;
        if (direction.equalsIgnoreCase("asc")) {
            pageable = PageRequest.of(page - 1, size).withSort(Sort.by(field).ascending());
        } else {
            pageable = PageRequest.of(page - 1, size).withSort(Sort.by(field).descending());
        }
        Page<Category> categories = categoryRepository.findAll(pageable);
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

    @Override
    public CategoryResponse updateCategory(Long id, CategoryCreationRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));

        if (categoryRepository.existsByName(request.getName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category name already exists");
        }

        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category = categoryRepository.save(category);
        return categoryMapper.toCategoryCreationResponse(category);
    }

    @Override
    public CategoryResponse deleteCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Kiểm tra xem category có sách không

        Pageable pageable = PageRequest.of(0, 1); // chỉ cần 1 cuốn là biết có tồn tại
        Page<Book> books = bookRepository.findByCategory(category.getName(), pageable);
        if (!books.isEmpty()) {
            throw new RuntimeException("Cannot delete category because it still contains books");
        }

        categoryRepository.delete(category);
        return categoryMapper.toCategoryCreationResponse(category); // Trả về thông tin category đã xóa
    }



    @Override
    public Long totalCategory() {
        return categoryRepository.count();
    }


    @Override
    public void uploadImage(Long id, List<MultipartFile> images) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (images == null || images.isEmpty()) {
            throw new RuntimeException("Image list is empty");
        }

        for (int i = 0; i < images.size(); i++) {
            MultipartFile image = images.get(i);
            String imageUrl = fileClient.getStringUrl(image);

            if (imageUrl == null || imageUrl.isEmpty()) {
                throw new RuntimeException("Failed to upload image");
            }
            if (i == 0) {
                // Ảnh đầu tiên => thumbnail
                category.setImage(imageUrl);
                CategoryImages categoryImage = new CategoryImages();
                categoryImage.setImageUrl(imageUrl);
                categoryImage.setCategory(category);
                categoryImagesRepository.save(categoryImage);
            } else {
                // Các ảnh còn lại => thêm vào BookImages
                CategoryImages categoryImage = new CategoryImages();
                categoryImage.setImageUrl(imageUrl);
                categoryImage.setCategory(category);
                categoryImagesRepository.save(categoryImage);
            }
        }
        categoryRepository.save(category);
    }
}
