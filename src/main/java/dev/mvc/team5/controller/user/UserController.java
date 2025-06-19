package dev.mvc.team5.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.mvc.team5.entity.user.User;
import dev.mvc.team5.service.user.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
  @Autowired
  UserService service;
  
  public UserController() {
    System.out.println("-> UserController created.");
  }
  
  @PostMapping(path="/save")
  public ResponseEntity<User> createEntity(@RequestBody User entity) {
    System.out.println("-> 회원가입 레코드 추가: " + entity.getUsername());
    
    User user = service.save(entity);
    return ResponseEntity.ok(user);
  }
  
}
