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
@Table(name = "talent_category")
public class TalentCategory {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="category_seq")
    @SequenceGenerator(name="category_seq", sequenceName="CATEGORY_SEQ", allocationSize=1)
    private Long categoryno;

    @ManyToOne
    @JoinColumn(name = "cateGrp")
    private TalentCateGrp cateGrp;

    private String name;

    private Integer cnt;
    
    // 양방향: Category ↔ Talent
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Talent> talents = new ArrayList<>();
    
    // 생성자
    public TalentCategory(TalentCateGrp cateGrp, String name, Integer cnt) {
      this.cateGrp = cateGrp;
      this.name = name;
      this.cnt = cnt;
    }
    
    
}
