package iuh.fit.se.cartservice.entity;

import jakarta.persistence.*;

import java.util.List;
@Entity
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ElementCollection
    @CollectionTable(name = "cart_products", joinColumns = @JoinColumn(name = "cart_id"))
    @Column(name = "product_id")
    private List<Long> productIds;
    private Long userId;
    private double total;

}
