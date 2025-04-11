package com.example.commentservice.mapper;

import com.example.commentservice.dto.request.CommentCreationRequest;
import com.example.commentservice.dto.response.CommentCreationResponse;
import com.example.commentservice.entity.Comment;
import com.example.commentservice.service.CommentService;
public class CommentsMapper {
    public static CommentCreationResponse toCommentCreationResponse(Comment comment) {
        if (comment == null) return null;

        return CommentCreationResponse.builder()
                .id(comment.getId())
                .userId(comment.getUserId())
                .bookId(comment.getBookId())
                .content(comment.getContent()).userName(comment.getUserName())
                .dateTime(comment.getDateTime())
                .build();
    }
    public static Comment toComment(CommentCreationRequest request) {
        if (request == null) return null;

        return Comment.builder()
                .userId(request.getUserId())
                .bookId(request.getBookId())
                .content(request.getContent()).userName(request.getUserName())
                .dateTime(request.getDateTime())
                .build();
    }

}
