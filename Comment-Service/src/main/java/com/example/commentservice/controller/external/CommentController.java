package com.example.commentservice.controller.external;

import com.example.commentservice.dto.request.CommentCreationRequest;
import com.example.commentservice.dto.response.CommentCreationResponse;

import com.example.commentservice.dto.response.ResponseData;
import com.example.commentservice.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public ResponseData<CommentCreationResponse> createComment(@RequestBody CommentCreationRequest request) {

        System.out.println("🔍 DEBUG request: " + request.getContent());
        return ResponseData.<CommentCreationResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Create comment successfully")
                .result(commentService.createComment(request))
                .build();
    }
    @GetMapping("/get-all-comments/{bookId}")
    public ResponseData<List<CommentCreationResponse>> getCommentsByBookId(@PathVariable Long bookId) {
        return ResponseData.<List<CommentCreationResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Fetch comments for book successfully")
                .result(commentService.getCommentsByProductId(bookId))
                .build();
    }
    @DeleteMapping("/delete/{id}")
    public ResponseData<CommentCreationResponse> deleteComment(@PathVariable Long id) {
        return ResponseData.<CommentCreationResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Delete comment successfully")
                .result(commentService.deleteComment(id))
                .build();
    }
    @PutMapping("/update/{id}")
    public ResponseData<CommentCreationResponse> updateComment(
            @PathVariable Long id,
            @RequestBody CommentCreationRequest request) {
        return ResponseData.<CommentCreationResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Update comment successfully")
                .result(commentService.updateComment(id, request))
                .build();
    }
}
