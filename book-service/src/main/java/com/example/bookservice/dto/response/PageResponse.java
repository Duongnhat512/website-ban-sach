package com.example.bookservice.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Collections;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PageResponse<T> {
    int currentPage;
    int totalPages;
    int pageSize;
    long totalElements;

    @Builder.Default
    List<T> result = Collections.emptyList();
}
