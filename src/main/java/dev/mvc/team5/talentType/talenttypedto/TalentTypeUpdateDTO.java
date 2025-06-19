package dev.mvc.team5.talentType.talenttypedto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class TalentTypeUpdateDTO {
    private Long typeno;
    private String name;
}
