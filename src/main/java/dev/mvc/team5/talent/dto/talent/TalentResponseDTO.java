package dev.mvc.team5.talent.dto.talent;

import lombok.*;
import dev.mvc.team5.talent.dto.talent.TalentResponseDTO;
import dev.mvc.team5.talent.dto.talentcategorydto.TalentCategoryResponseDTO;
import dev.mvc.team5.talent.dto.talenttypedto.TalentTypeResponseDTO;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class TalentResponseDTO {
    private Long talentno;
    private Long userno;
    private Long schoolno;
    private String title;
    private String description;
    private String language;
    private String createdAt;
    private String updatedAt;

    private TalentTypeResponseDTO type;
    private TalentCategoryResponseDTO category;
}
