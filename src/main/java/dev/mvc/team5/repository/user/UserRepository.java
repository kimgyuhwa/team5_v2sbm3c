package dev.mvc.team5.repository.user;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.mvc.team5.entity.user.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(String userId);
}
