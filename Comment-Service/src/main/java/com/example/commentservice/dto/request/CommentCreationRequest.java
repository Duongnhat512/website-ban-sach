package com.example.commentservice.dto.request;

import lombok.*;

import java.util.Date;
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentCreationRequest {
    private Long userId;
    private Long bookId;
    private Date dateTime;
    private String content;
}
