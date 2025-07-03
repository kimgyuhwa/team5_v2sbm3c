package dev.mvc.team5.user;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(String userId);

    Optional<User> findByUserIdAndPassword(String userId, String password);
    
    //아이디 찾기
    Optional<User> findByUsernameAndEmail(String username, String email);
    
    //비밀번호 찾기
    Optional<User> findByUsernameAndUserIdAndEmail(String username,String userId, String email);
}
