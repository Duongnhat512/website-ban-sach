package com.example.bookservice.controller.external;

import com.example.bookservice.dto.request.BookCreationRequest;
import com.example.bookservice.dto.response.BookCreationResponse;
import com.example.bookservice.dto.response.PageResponse;
import com.example.bookservice.dto.response.ResponseData;
import com.example.bookservice.entity.Book;
import com.example.bookservice.entity.BookElasticSearch;
import com.example.bookservice.service.BookService;
import com.example.bookservice.service.impl.GeminiAIService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/books")
public class BookController {
    private final BookService bookService;
    private final GeminiAIService geminiService;

    @PostMapping("/create-book")
    public ResponseData<BookCreationResponse> createBook(@RequestBody BookCreationRequest request){
        return ResponseData.<BookCreationResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create Book Successfully")
                .result(bookService.createBook(request))
                .build();
    }
    @GetMapping("/get-all-books")
    public ResponseData<PageResponse<BookCreationResponse>> getBooks(
           @RequestParam(value = "page",defaultValue = "1") int page,
           @RequestParam(value = "size",defaultValue = "10")   int size,
           @RequestParam(value = "sort") String sortBy){
        return ResponseData.<PageResponse<BookCreationResponse>>builder()
                .message("Get All Books Successfully")
                .code(HttpStatus.OK.value())
                .result(bookService.getBooks(page, size,sortBy))
                .build();
    }
    @GetMapping("/{id}")
    public ResponseData<BookCreationResponse> getBookById(@PathVariable Long id) {
        try {
            BookCreationResponse response = bookService.getBookById(id);
            return ResponseData.<BookCreationResponse>builder()
                    .message("Get Book Successfully")
                    .code(HttpStatus.OK.value())
                    .result(response)
                    .build();
        } catch (RuntimeException ex) {
            return ResponseData.<BookCreationResponse>builder()
                    .message("Book Not Found")
                    .code(HttpStatus.NOT_FOUND.value())
                    .result(null)
                    .build();
        }
    }


    @GetMapping("/delete/{id}")
    public ResponseData<BookCreationResponse> deleteBookById(@PathVariable Long id){
        try {
            BookCreationResponse response = bookService.deleteBookById(id);
            return ResponseData.<BookCreationResponse>builder()
                    .message("Delete Book Successfully")
                    .code(HttpStatus.OK.value())
                    .result(response)
                    .build();
        } catch (RuntimeException ex) {
            return ResponseData.<BookCreationResponse>builder()
                    .message("Book Not Found")
                    .code(HttpStatus.NOT_FOUND.value())
                    .result(null)
                    .build();
        }
    }


    @PutMapping("/update/{id}")
    public ResponseData<BookCreationResponse> updateBook(@PathVariable Long id, @RequestBody BookCreationRequest request) {
        try {
            BookCreationResponse response = bookService.updateBook(id, request);
            return ResponseData.<BookCreationResponse>builder()
                    .message("Update Book Successfully")
                    .code(HttpStatus.OK.value())
                    .result(response)
                    .build();
        } catch (RuntimeException ex) {
            return ResponseData.<BookCreationResponse>builder()
                    .message("Book Not Found")
                    .code(HttpStatus.NOT_FOUND.value())
                    .result(null)
                    .build();
        }
    }


    // Endpoint tìm kiếm sách theo các tiêu chí: title, price, author, quantity
    @GetMapping("/search")
    public ResponseData<List<BookCreationResponse>> searchBooks(
            @RequestParam(required = false) String title,          // Tìm kiếm theo tiêu đề
            @RequestParam(required = false) Double minPrice,      // Tìm kiếm theo giá từ
            @RequestParam(required = false) Double maxPrice,      // Tìm kiếm theo giá đến
            @RequestParam(required = false) String author,        // Tìm kiếm theo tác giả
            @RequestParam(required = false) Integer minQuantity)  // Tìm kiếm theo số lượng tối thiểu
    {
        return ResponseData.<List<BookCreationResponse>>builder()
                .message("Search Books Successfully")
                .code(HttpStatus.OK.value())
                .result(bookService.searchBooks(title, minPrice, maxPrice, author, minQuantity))
                .build();
    }
    @PostMapping("/upload-image/{id}")
    public ResponseData<String> uploadImage(@PathVariable Long id, @RequestPart("image") MultipartFile image){
        bookService.uploadImage(id, image);
        return  ResponseData.<String>builder()
                .message("Upload Image Successfully")
                .code(HttpStatus.OK.value())
                .result("Upload Image Successfully")
                .build();
    }

    @GetMapping("/search-by-category")
    public ResponseData<PageResponse<BookCreationResponse>> findByCategory(
            @RequestParam String category,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        return ResponseData.<PageResponse<BookCreationResponse>>builder()
                .message("Search Books by Category Successfully")
                .code(HttpStatus.OK.value())
                .result(bookService.findByCategory(category, page, size))
                .build();
    }

    @GetMapping("/flash-sale")
    public ResponseData<PageResponse<BookCreationResponse>> getFlashSaleBooks(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        return ResponseData.<PageResponse<BookCreationResponse>>builder()
                .message("Get Flash Sale Books Successfully")
                .code(HttpStatus.OK.value())
                .result(bookService.getFlashSaleBooks(page, size))
                .build();
    }
    @GetMapping("/search-by-keyword")
    public ResponseData<PageResponse<BookCreationResponse>> searchByKeyword(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sort" , required = false) String sort,
            @RequestParam(value = "search" ,required = false) String... search
            ) {
        return ResponseData.<PageResponse<BookCreationResponse>>builder()
                .message("Search Books by Keyword Successfully")
                .code(HttpStatus.OK.value())
                .result(bookService.getBooksBySearchSpecification(page,size,sort,search))
                .build();
    }
    @GetMapping("/search-course")
    public ResponseData<PageResponse<BookElasticSearch>> searchCourse(
            @RequestParam String keyword,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        return ResponseData.<PageResponse<BookElasticSearch>>builder()
                .message("Search Course Successfully")
                .code(HttpStatus.OK.value())
                .result(bookService.searchCourse(keyword, page, size))
                .build();
    }
    @GetMapping("/suggest")
    public ResponseData<String> suggestProduct(@RequestParam String interest) {
        var result = geminiService.suggestBook(interest);
        String convertResult = result.block();
        return ResponseData.<String>builder()
                .message("Suggest product")
                .code(200)
                .result(convertResult)
                .build();
    }

    @GetMapping("/total-book")
    public ResponseData<Long> totalBook(){
        return ResponseData.<Long>builder()
                .message("Total Book Successfully")
                .code(HttpStatus.OK.value())
                .result(bookService.totalBook())
                .build();
    }

    @GetMapping("/trending")
    public ResponseData<PageResponse<BookCreationResponse>> findTopTrendingBooks(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        return ResponseData.<PageResponse<BookCreationResponse>>builder()
                .message("Get Top Trending Books Successfully")
                .code(HttpStatus.OK.value())
                .result(bookService.findTopTrendingBooks(page, size))
                .build();
    }

}
