package dev.mvc.team5.talents.talentdto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
