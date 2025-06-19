package dev.mvc.team5.talents.talentDTO;

import dev.mvc.team5.talentCategory.talentcategorydto.TalentCategoryResponseDTO;
import dev.mvc.team5.talentType.talenttypedto.TalentTypeResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
