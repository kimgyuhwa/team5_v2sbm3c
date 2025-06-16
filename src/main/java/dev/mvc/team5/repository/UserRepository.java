package dev.mvc.team5.repository;

import dev.mvc.team5.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 필요하다면 커스텀 쿼리 추가 가능
}