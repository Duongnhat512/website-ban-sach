package org.learning.authenticationservice.dto.response;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private String id;
    private String fullName;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private LocalDate dob;
    private String phoneNumber;
}
