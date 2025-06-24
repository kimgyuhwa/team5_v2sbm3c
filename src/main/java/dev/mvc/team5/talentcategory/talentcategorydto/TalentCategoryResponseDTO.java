package dev.mvc.team5.talentcategory.talentcategorydto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class TalentCategoryResponseDTO {
    private Long categoryno;
    private String name;
    private Long cateGrpNo;
    
    public TalentCategoryResponseDTO(Long categoryno, String name, Long cateGrpNo) {
      this.categoryno = categoryno;
      this.name = name;
      this.cateGrpNo = cateGrpNo;
  }

}
