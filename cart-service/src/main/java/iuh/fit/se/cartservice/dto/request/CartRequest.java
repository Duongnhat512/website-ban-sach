package iuh.fit.se.cartservice.dto.request;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartRequest {
    private String userId;
    private String bookId;
    private Integer quantity;

}
