package dev.mvc.team5.repository.user;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import dev.mvc.team5.entity.user.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  User findByUserAndPassword(String userId, String password);  
  
}
