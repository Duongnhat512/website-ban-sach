package org.learning.authenticationservice.dto.request;

import lombok.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequest {
    private String id;
    private String fullName;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private LocalDate dob;
    private String phoneNumber;
}
