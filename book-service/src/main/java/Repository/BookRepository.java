package Repository;

import entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
    public interface BookRepository extends JpaRepository<Book, Long> {}
