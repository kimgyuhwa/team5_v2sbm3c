package dev.mvc.team5.talents.talentdto;


import java.time.LocalDateTime;

import dev.mvc.team5.talentcategory.talentcategorydto.TalentCategoryResponseDTO;
import dev.mvc.team5.talenttype.talenttypedto.TalentTypeResponseDTO;

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
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    private TalentTypeResponseDTO type;
    private TalentCategoryResponseDTO category;
}
