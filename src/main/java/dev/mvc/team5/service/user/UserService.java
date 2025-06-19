package dev.mvc.team5.service.user;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.mvc.team5.dto.UserDTO;
import dev.mvc.team5.entity.school.School;
import dev.mvc.team5.entity.user.User;
import dev.mvc.team5.repository.school.SchoolRepository;
import dev.mvc.team5.repository.user.UserRepository;
import dev.mvc.team5.tool.Security;
import jakarta.servlet.http.HttpSession;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SchoolRepository schoolRepository; // 선택: School 엔티티 주입

    @Autowired
    private Security security;

 // 아이디 중복 확인
    public boolean checkID(String userId) {
        return userRepository.findByUserId(userId) != null;
    }

    // 회원가입
    public void create(UserDTO userDTO) {
        User user = new User();
        user.setUserId(userDTO.getUserId());
        user.setPassword(security.aesEncode(userDTO.getPassword()));
        user.setName(userDTO.getName());
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    // 로그인
    public boolean login(UserDTO userDTO, HttpSession session) {
        User user = userRepository.findByUserId(userDTO.getUserId());
        if (user != null) {
            String encodedPw = security.aesEncode(userDTO.getPassword());
            if (user.getPassword().equals(encodedPw)) {
                session.setAttribute("userId", user.getUserId());
                session.setAttribute("role", user.getRole()); // admin or member
                return true;
            }
        }
        return false;
    }

    // 로그아웃
    public void logout(HttpSession session) {
        session.invalidate();
    }

    // 권한 확인: 회원 or 관리자
    public boolean isMember(HttpSession session) {
        String role = (String) session.getAttribute("role");
        return role != null && (role.equals("member") || role.equals("admin"));
    }

    public boolean isAdmin(HttpSession session) {
        String role = (String) session.getAttribute("role");
        return "admin".equals(role);
    }

    // 비밀번호 변경 (패턴 동일)
    public void passwdUpdate(Long userno, String newPassword) {
        User user = userRepository.findById(userno).orElseThrow();
        user.setPassword(security.aesEncode(newPassword));
        userRepository.save(user);
    }
    // 회원정보 업데이트
    public void updateProfile(Long userno, UserDTO userDTO) {
      User user = userRepository.findById(userno).orElseThrow();
      user.setName(userDTO.getName());
      user.setEmail(userDTO.getEmail());
      userRepository.save(user);
  }
    // 회원 탈퇴
    public void delete(Long userno) {
      userRepository.deleteById(userno);
  }
    
    }
