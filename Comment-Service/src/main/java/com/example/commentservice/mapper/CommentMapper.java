package com.example.commentservice.mapper;

import com.example.commentservice.dto.request.CommentCreationRequest;
import com.example.commentservice.dto.response.CommentCreationResponse;
import com.example.commentservice.entity.Comment;
import org.mapstruct.Mapper;
@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment toComment(CommentCreationRequest comment);
    CommentCreationResponse toCommentCreationResponse(Comment comment);

}
