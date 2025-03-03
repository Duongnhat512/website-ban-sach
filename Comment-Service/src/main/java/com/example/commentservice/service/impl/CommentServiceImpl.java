package com.example.commentservice.service.impl;
import com.example.commentservice.dto.request.CommentCreationRequest;
import com.example.commentservice.dto.response.CommentCreationResponse;
import com.example.commentservice.entity.Comment;
import com.example.commentservice.mapper.CommentMapper;
import com.example.commentservice.repository.CommentRepository;
import com.example.commentservice.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    @Override
    public CommentCreationResponse createComment(CommentCreationRequest request)
    {
        log.info("Creating book with content: {}", request.getContent());
        Comment comment = commentMapper.toComment(request);
        commentRepository.save(comment);
        return commentMapper.toCommentCreationResponse(comment);
    }
    public CommentCreationResponse updateComment(Long id,CommentCreationRequest request)
    {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        comment.setContent(request.getContent());
        comment.setDateTime(request.getDateTime());
        comment.setBookId(request.getBookId());
        comment.setUserId(request.getUserId());
        commentRepository.save(comment);
        return commentMapper.toCommentCreationResponse(comment);
    }
    public CommentCreationResponse deleteComment(Long id)
    {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        commentRepository.delete(comment);
        return commentMapper.toCommentCreationResponse(comment);
    }
    public List<CommentCreationResponse> getCommentsByProductId(Long bookId)
    {
        List<Comment> comments = commentRepository.findByBookId(bookId);
        return comments.stream()
                .map(commentMapper::toCommentCreationResponse)
                .toList();
    }
    public CommentCreationResponse findComment(Long id)
    {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        return commentMapper.toCommentCreationResponse(comment);
    }

}
