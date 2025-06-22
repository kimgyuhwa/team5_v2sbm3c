package dev.mvc.team5.talents.talentdto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class TalentListDTO {
    private Long talentno;
    private String title;
    private String language;
    private String categoryName;
    private String typeName;
}
