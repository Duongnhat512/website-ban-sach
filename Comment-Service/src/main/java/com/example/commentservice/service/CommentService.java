package com.example.commentservice.service;

import com.example.commentservice.dto.request.CommentCreationRequest;
import com.example.commentservice.dto.response.CommentCreationResponse;

import java.util.List;

public interface CommentService {
    CommentCreationResponse createComment(CommentCreationRequest request);

    CommentCreationResponse updateComment(Long id, CommentCreationRequest request);

    CommentCreationResponse deleteComment(Long id);

    List<CommentCreationResponse> getCommentsByProductId(Long bookId);

     CommentCreationResponse findComment(Long id);


}
