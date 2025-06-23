package dev.mvc.team5.request.requestdto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class RequestResponseDTO {
    private Long requestno;
    private Long talentno;         // 게시물 번호 (추가됨)
    private String talentTitle;    // 게시물 제목
    private String userName;       // 요청자 이름
    private String status;         // 요청 상태
    private String message;        // 요청 메시지
    private LocalDateTime createdAt;      // 요청시간

    public RequestResponseDTO(Long requestno, Long talentno, String talentTitle, String userName,
                              String status, String message, LocalDateTime createdAt) {
        this.requestno = requestno;
        this.talentno = talentno;
        this.talentTitle = talentTitle;
        this.userName = userName;
        this.status = status;
        this.message = message;
        this.createdAt = createdAt;
    }
}
