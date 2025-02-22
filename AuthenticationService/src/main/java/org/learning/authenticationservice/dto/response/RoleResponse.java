package org.learning.authenticationservice.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoleRequest {
    private Long id;
    private String name;
    private String description;
}
