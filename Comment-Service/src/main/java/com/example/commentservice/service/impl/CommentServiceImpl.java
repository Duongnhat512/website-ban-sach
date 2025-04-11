package com.example.commentservice.service.impl;
import com.example.commentservice.dto.request.CommentCreationRequest;
import com.example.commentservice.dto.response.CommentCreationResponse;
import com.example.commentservice.entity.Comment;
import com.example.commentservice.mapper.CommentMapper;
import com.example.commentservice.mapper.CommentsMapper;
import com.example.commentservice.repository.CommentRepository;
import com.example.commentservice.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService{
    private final CommentRepository commentRepository;
    @Override
    public CommentCreationResponse createComment(CommentCreationRequest request)
    {
        log.info("Creating book with content: {}", request.getUserName());
        //Comment comment = commentMapper.toComment(request);
        Comment comment = CommentsMapper.toComment(request);
        System.out.println("📤 Content in entity: " + comment.getContent());
        commentRepository.save(comment);
        CommentCreationResponse response = CommentsMapper.toCommentCreationResponse(comment);
        return response;
    }
    public CommentCreationResponse updateComment(Long id,CommentCreationRequest request)
    {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        comment.setContent(request.getContent());
        comment.setDateTime(request.getDateTime());
        comment.setBookId(request.getBookId());
        comment.setUserId(request.getUserId());
        commentRepository.save(comment);
        return CommentsMapper.toCommentCreationResponse(comment);
    }
    public CommentCreationResponse deleteComment(Long id)
    {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        commentRepository.delete(comment);
        return CommentsMapper.toCommentCreationResponse(comment);
    }
    public List<CommentCreationResponse> getCommentsByProductId(Long bookId)
    {
        List<Comment> comments = commentRepository.findByBookId(bookId);
        return comments.stream()
                .map(CommentsMapper::toCommentCreationResponse)
                .toList();
    }
    public CommentCreationResponse findComment(Long id)
    {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        return CommentsMapper.toCommentCreationResponse(comment);
    }

}
