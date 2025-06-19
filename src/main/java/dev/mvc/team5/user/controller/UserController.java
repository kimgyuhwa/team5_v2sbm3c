package dev.mvc.team5.user.controller;
import dev.mvc.team5.dto.UserDTO;
import dev.mvc.team5.service.user.UserService;
import jakarta.servlet.http.HttpSession;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody UserDTO userDTO) {
        if (userService.checkID(userDTO.getUserId())) {
            return "중복된 ID입니다.";
        }
        userService.create(userDTO);
        return "회원가입 완료!";
    }

    @PostMapping("/login")
    public String login(@RequestBody UserDTO userDTO, HttpSession session) {
        boolean success = userService.login(userDTO, session);
        return success ? "로그인 성공!" : "로그인 실패!";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
      userService.logout(session);
        return "로그아웃 완료!";
    }
    
    @PutMapping("/update")
    public String update(@RequestBody UserDTO userDTO, HttpSession session) {
        Long userno = (Long) session.getAttribute("userno");
        userService.updateProfile(userno, userDTO);
        return "회원정보 수정 완료!";
    }
    
    @DeleteMapping("/delete")
    public String delete(HttpSession session) {
        Long userno = (Long) session.getAttribute("userno");
        userService.delete(userno);
        session.invalidate();
        return "회원 탈퇴 완료!";
    }
    
}