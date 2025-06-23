package dev.mvc.team5.talentcategrp.talentcategrpdto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class TalentCateGrpResponseDTO {
    private Long cateGrpNo;
    private String name;
    
    public TalentCateGrpResponseDTO(Long grpno, String name) {
      this.cateGrpNo = grpno;
      this.name = name;
    }
}
