package dev.mvc.team5.talents.talentDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class TalentUpdateDTO {
    private Long talentno;
    private String title;
    private String description;
    private String language;
}
