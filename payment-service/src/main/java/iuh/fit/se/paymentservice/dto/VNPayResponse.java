package iuh.fit.se.paymentservice.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class VNPayResponse {
    int code;
    String message;
    String paymentUrl;
}

