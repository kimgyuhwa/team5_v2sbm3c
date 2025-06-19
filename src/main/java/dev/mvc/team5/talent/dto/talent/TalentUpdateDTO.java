package dev.mvc.team5.talent.dto.talent;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class TalentUpdateDTO {
    private Long talentno;
    private String title;
    private String description;
    private String language;
}
