package org.learning.authenticationservice.repository;

import org.learning.authenticationservice.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
