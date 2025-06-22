package dev.mvc.team5.talents.talentdto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class TalentUpdateDTO {
    private Long talentno;        // 수정할 게시물 번호 (필수)
    private Long userno;          // 작성자 번호 (권한 체크용)
    private String title;         // 수정할 제목
    private String description;   // 수정할 내용
    private String language;      // 수정할 언어
}
