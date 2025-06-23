package dev.mvc.team5.user;

import lombok.Data;

@Data
public class UserDTO {
    private Long userno;      // 회원 번호 (PK)
    private String userId;    // 로그인 ID
    private String password;  // 평문 패스워드
    private String name;      // 이름
    private String username;      // 닉네임
    private String email;     // 이메일
    private Long schoolId;    // 학교 번호 (선택적)
}