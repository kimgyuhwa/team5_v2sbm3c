package dev.mvc.team5.entity.talents;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

import dev.mvc.team5.entity.user.User;
import jakarta.persistence.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "talent_categrp")
public class TalentCateGrp {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="talent_cateGrp_seq")

    @SequenceGenerator(name="talent_cateGrp_seq", sequenceName="talent_cateGrp_seq", allocationSize=1)

    private Long cateGrpno;
    
    private String name;

    private Integer cnt;
    
    // 양방향: TalentCateGrp ↔ TalentCategory
    @OneToMany(mappedBy = "cateGrp", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TalentCategory> categorys = new ArrayList<>();
    
    // 생성자
    public TalentCateGrp(String name, Integer cnt) {
      this.name = name;
      this.cnt = cnt;
    }
    
    
}
