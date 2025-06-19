package dev.mvc.team5.talent.dto.talent;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class TalentCreateDTO {
    private Long userno;
    private Long schoolno;
    private Long typeno;
    private Long categoryno;
    private Long subcategoryno;
    private String title;
    private String description;
    private String language;
}
