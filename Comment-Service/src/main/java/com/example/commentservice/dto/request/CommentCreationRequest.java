package com.example.commentservice.dto.request;

import jakarta.persistence.Column;
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
    private String userName;
    private Date dateTime;
    private String content;
}
