package com.example.bookservice.Repository.specification;

import com.example.bookservice.entity.Book;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

@RequiredArgsConstructor
public class SpecificationBook implements Specification<Book> {
    private final SpecSearchCriteria criteria;

    @Override
    public Predicate toPredicate(Root<Book> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        Predicate predicate;
        Class<?> fieldType = root.get(criteria.getKey()).getJavaType();
        Object value = criteria.getValue();
        switch (criteria.getOperation()) {
            case EQUALITY:
                if (fieldType.equals(String.class)) {
                    predicate = criteriaBuilder.like(root.get(criteria.getKey()), "%" + value + "%");
                } else {
                    predicate = criteriaBuilder.equal(root.get(criteria.getKey()), value);
                }
                break;
            case NEGATION:
                predicate = criteriaBuilder.notEqual(root.get(criteria.getKey()), value);
                break;

            case GREATER_THAN:
                predicate = criteriaBuilder.greaterThanOrEqualTo(root.get(criteria.getKey()), (Comparable) value);
                break;

            case LESS_THAN:
                predicate = criteriaBuilder.lessThanOrEqualTo(root.get(criteria.getKey()), (Comparable) value);
                break;

            case LIKE:
            case CONTAINS:
                predicate = criteriaBuilder.like(root.get(criteria.getKey()), "%" + value + "%");
                break;

            case STARTS_WITH:
                predicate = criteriaBuilder.like(root.get(criteria.getKey()), value + "%");
                break;

            case ENDS_WITH:
                predicate = criteriaBuilder.like(root.get(criteria.getKey()), "%" + value);
                break;

            default:
                throw new IllegalStateException("Unexpected value: " + criteria.getOperation());
        }

        // Nếu có điều kiện OR (nhiều giá trị trên cùng một field), áp dụng OR Predicate
        if (criteria.getOrPredicate() != null && criteria.getOrPredicate()) {
            return criteriaBuilder.or(predicate);
        }

        return predicate;

    }
}
