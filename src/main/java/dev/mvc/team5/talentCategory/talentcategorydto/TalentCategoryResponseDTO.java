package dev.mvc.team5.talentCategory.talentcategorydto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class TalentCategoryResponseDTO {
    private Long categoryno;
    private String name;
    private Long cateGrpNo;
}
