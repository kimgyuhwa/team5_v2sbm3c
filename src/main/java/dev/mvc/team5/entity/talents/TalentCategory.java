package dev.mvc.team5.entity.talents;

import lombok.*;
import jakarta.persistence.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "talent_category")
public class TalentCategory {

    @Id
    @Column(name = "categoryno")
    private Long categoryno;

    @ManyToOne
    @JoinColumn(name = "categrpno")
    private TalentCateGrp cateGrpno;

    private String name;

    private Integer cnt;
}
