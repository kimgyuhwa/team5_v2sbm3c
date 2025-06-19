package dev.mvc.team5.dto;

import dev.mvc.team5.entity.user.User;
import lombok.Data;

@Data
public class UserDTO {
    private String userId;   // 로그인 ID
    private String password; // 평문 패스워드
    private String name;     // 이름 (회원가입용)
    private String email;   // 이메일
    private Long schoolId;   // 선택적: 학교 번호
    
}