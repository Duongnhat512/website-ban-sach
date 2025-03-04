package com.example.commentservice.dto.response;

import lombok.*;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentCreationResponse {
    private Long id;
    private Long userId;
    private Long bookId;
    private Date dateTime;
    private String content;
}
