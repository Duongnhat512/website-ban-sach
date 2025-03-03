package com.example.commentservice.service;

import com.example.commentservice.dto.request.CommentCreationRequest;
import com.example.commentservice.dto.response.CommentCreationResponse;

import java.util.List;

public interface CommentService {
    public CommentCreationResponse createComment(CommentCreationRequest request);
    public CommentCreationResponse updateComment(Long id,CommentCreationRequest request);
    public CommentCreationResponse deleteComment(Long id);
    public List<CommentCreationResponse> getCommentsByProductId(Long bookId);
    public CommentCreationResponse findComment(Long id);



}
