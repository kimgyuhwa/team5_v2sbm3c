package dev.mvc.team5.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.mvc.team5.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	// 닉네임(username)으로 회원 찾기
    // User findByUsername(String username);
}
