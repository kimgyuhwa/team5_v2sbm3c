package dev.mvc.team5.entity;

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
    private Long categoryNo;

    @ManyToOne
    @JoinColumn(name = "categrpno")
    private TalentCateGrp cateGrp;

    private String name;

    private Integer cnt;
}
