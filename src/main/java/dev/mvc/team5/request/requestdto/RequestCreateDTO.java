package dev.mvc.team5.request.requestdto;

import dev.mvc.team5.request.Request;
import dev.mvc.team5.talents.Talent;
import dev.mvc.team5.tool.RequestStatus;
import dev.mvc.team5.user.User;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RequestCreateDTO {
    private Long talentno;   // 요청하려는 게시물 ID
    private Long userno;     // 요청자 회원 번호
    private String status = RequestStatus.PENDING; // 기본값 설정   // 요청 상태 (RequestStatus.PENDING 등)
    private String message;  // 요청 메시지
    
    public Request toEntity() {
      Talent talent = new Talent();
      User user = new User();
      talent.setTalentno(this.talentno);
      user.setUserno(this.userno);
            
      Request request = new Request();
      request.setTalent(talent);
      request.setUser(user);
      request.setStatus(status);
      request.setMessage(message);
      
      return request;
    }
}
