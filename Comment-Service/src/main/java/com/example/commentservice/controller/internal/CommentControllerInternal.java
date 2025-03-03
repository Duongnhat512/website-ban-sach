package com.example.commentservice.controller.internal;

import com.example.commentservice.entity.Comment;
import com.example.commentservice.mapper.CommentMapper;
import com.example.commentservice.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/internal/comments")
public class CommentControllerInternal {
    private final CommentService commentService;
    private final CommentMapper mapper;
    @GetMapping("/{id}")
    public Comment getBookById(@PathVariable Long id){
        log.info("Getting book by id: {}", id);
        return mapper.toComment(commentService.findComment(id));
    }
}
