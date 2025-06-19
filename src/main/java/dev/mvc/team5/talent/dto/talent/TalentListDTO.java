package dev.mvc.team5.talent.dto.talent;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class TalentListDTO {
    private Long talentno;
    private String title;
    private String language;
    private String categoryName;
    private String typeName;
}
