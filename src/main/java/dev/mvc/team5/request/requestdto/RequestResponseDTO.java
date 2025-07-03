package dev.mvc.team5.request.requestdto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@AllArgsConstructor
public class RequestResponseDTO {
    private Long requestno;
    private Long talentno;         // 게시물 번호 (추가됨)
    private String talentTitle;    // 게시물 제목
    private String giverno;       // 요청자 이름
    private String receiverno;       // 피요청자 이름
    private String status;         // 요청 상태
    private String message;        // 요청 메시지
    private LocalDateTime createdAt;      // 요청시간
}
