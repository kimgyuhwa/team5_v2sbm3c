package dev.mvc.team5.repository.user;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import dev.mvc.team5.entity.user.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  /**
   * 사용자 아이디(userId)와 비밀번호(password)에 해당하는 사용자 정보를 조회하는 메서드
   * 
   * @param userId   조회할 사용자 아이디
   * @param password 조회할 비밀번호
   * @return 조건에 맞는 User 객체가 Optional로 감싸져 반환됨 (없으면 Optional.empty())
   */
  Optional<User> findByUserIdAndPassword(String userId, String password);  
  
}

