package dev.mvc.team5.user;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.mvc.team5.tool.Security;
import jakarta.servlet.http.HttpSession;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private dev.mvc.team5.school.SchoolRepository schoolRepository; // 선택: School 엔티티 주입

    @Autowired
    private Security security;

 // 아이디 중복 확인
    public boolean checkID(String userId) {
        return userRepository.findByUserId(userId) != null;
    }

     // userno로 사용자 찾기
    public User findById(Long userno) {
      return userRepository.findById(userno)
          .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
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
    //로그인
    public boolean login(UserDTO userDTO, HttpSession session) {
      User user = userRepository.findByUserId(userDTO.getUserId());
      if (user != null) {
          String encodedPw = security.aesEncode(userDTO.getPassword());
          if (user.getPassword().equals(encodedPw)) {
              session.setAttribute("userno", user.getUserno());   // userno 저장
              session.setAttribute("username", user.getName());   // username 저장
              session.setAttribute("userId", user.getUserId());
              session.setAttribute("schoolname", user.getSchool());
              session.setAttribute("role", user.getRole());
              return true;
          }
      }
      return false;
  }
    // 세션
    public UserDTO getUserById(String userId) {
      User user = userRepository.findByUserId(userId);
      if (user == null) return null;

      UserDTO dto = new UserDTO();
      dto.setUserno(user.getUserno());   // User 엔티티에 userno 필드가 있어야 합니다.
      dto.setUserId(user.getUserId());
      dto.setName(user.getName());
      dto.setEmail(user.getEmail());
      // 필요하다면 schoolId 등도 추가
      return dto;
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
