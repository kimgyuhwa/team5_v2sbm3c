package dev.mvc.team5.user;

import lombok.Data;

@Data
public class UserDTO {
    private Long userno;      // 회원 번호 (PK)
    private String userId;  //아이디
    private String password; // 비밀번호
    private String name; // 이름
    private String username;  //닉네임
    private String email;    //이메일
    private String phone;   //폰번호
    private String zipcode;   // 우편번호
    private String address;  // 주소 
    private String language; // 사용 언어
    private String location;   // 위치 
    private String bio;   // 자기소개
    private String role;    // 역할(ADMIN, USER)
    private Long schoolno;   // 학교 번호  
    private String schoolname; // 학교이름
    
    @Data
    public static class SchoolInfo{
      private Long schoolno;
      private String schoolName;
    }    
    @Data
    public static class MailRequestDto{
      private String email;
      private String schoolName;
    }
    
    @Data
    public static class VerifyCodeDto {
        private String email;
        private String schoolName;
        private int code;
    }
    
    @Data
    public static class ResetPasswordDto {
        private String email;
        private String schoolName;
        private int code; // 인증번호
        private String newPassword; // 새 비밀번호
    }
}