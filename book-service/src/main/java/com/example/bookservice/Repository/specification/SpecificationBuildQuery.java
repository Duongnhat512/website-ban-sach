package com.example.bookservice.Repository.specification;

import com.example.bookservice.common.SearchOperation;
import com.example.bookservice.entity.Book;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class SpecificationBuildQuery {
    private final List<SpecSearchCriteria> criteria;
    private List<String> categoryNames; // ✅ Mảng tên danh mục

    // ✅ Gọi khi truyền mảng category name vào
    public void withCategoryNames(List<String> categoryNames) {
        this.categoryNames = categoryNames;
    }
    public SpecificationBuildQuery() {
        this.criteria = new ArrayList<>();
    }

    public SpecificationBuildQuery with(String key, String operation, String value, String prefix, String suffix) {
        return with(null, key, operation, value, prefix, suffix);
    }

    public SpecificationBuildQuery with(String orPredicate, String key, String operation, String value, String prefix, String suffix) {
        SearchOperation searchOperation = SearchOperation.getOperation(operation.charAt(0));

        // Xác định loại tìm kiếm cho chuỗi (EQUALITY -> CONTAINS / STARTS_WITH / ENDS_WITH)
        if (searchOperation == SearchOperation.EQUALITY) {
            boolean startWith = prefix != null && prefix.equals(SearchOperation.ZERO_OR_MORE_REGEX);
            boolean endWith = suffix != null && suffix.equals(SearchOperation.ZERO_OR_MORE_REGEX);
            if (startWith && endWith) {
                searchOperation = SearchOperation.CONTAINS;
            } else if (startWith) {
                searchOperation = SearchOperation.ENDS_WITH;
            } else {
                searchOperation = SearchOperation.STARTS_WITH;
            }
        }

        // Kiểm tra nếu đã có key này trong danh sách
        boolean keyExists = criteria.stream().anyMatch(c -> c.getKey().equals(key));

        // Kiểm tra giá trị có phải là số không
        boolean isNumber = value.matches("-?\\d+(\\.\\d+)?");

        if (keyExists) {
            // Nếu value là String, áp dụng OR_PREDICATE, nếu là Number thì giữ mặc định AND
            if (!isNumber) {
                criteria.add(new SpecSearchCriteria(key, searchOperation, value, SearchOperation.OR_PREDICATE));
            } else {
                criteria.add(new SpecSearchCriteria(key, searchOperation, value, orPredicate));
            }
        } else {
            criteria.add(new SpecSearchCriteria(key, searchOperation, value, orPredicate));
        }
        return this;
    }
    public Specification<Book> buildQuery(){
        if(criteria.isEmpty()) return null;
        Specification<Book> specification = new SpecificationBook(criteria.get(0));
        if(criteria.size() > 1){
            for(int i = 1; i < criteria.size();i++){
                specification = criteria.get(i).getOrPredicate()
                        ? specification.or(new SpecificationBook(criteria.get(i)))
                        : specification.and(new SpecificationBook(criteria.get(i)));
            }
        }

        if (categoryNames != null && !categoryNames.isEmpty()) {
            Specification<Book> categorySpec = (root, query, cb) ->
                    root.get("category").get("name").in(categoryNames);

            specification = (specification == null)
                    ? categorySpec
                    : specification.and(categorySpec);
        }

        return specification;
    }

}
