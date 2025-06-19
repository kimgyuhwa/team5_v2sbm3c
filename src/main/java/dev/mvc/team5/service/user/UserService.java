package dev.mvc.team5.service.user;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.mvc.team5.entity.user.User;
import dev.mvc.team5.repository.user.UserRepository;

@Service
public class UserService {
  
  @Autowired
  UserRepository repository;
  
  /**
   * 회원 정보를 저장하거나 수정하는 메서드
   * @param entity 저장할 User 엔티티 객체
   * @return 저장 완료된 User 객체
   */
  public User save(User entity) {
    return repository.save(entity);
  }
  
  /**
   * 사용자 아이디와 비밀번호로 로그인 시도하는 메서드
   * @param id 로그인할 사용자 아이디
   * @param password 로그인할 비밀번호
   * @return 조건에 맞는 User를 Optional로 반환, 없으면 Optional.empty()
   */
  public Optional<User> find_by_userId_and_password(String id, String password){
    Optional<User> user = repository.findByUserIdAndPassword(id, password);
    
    return user;
  }
  
}
