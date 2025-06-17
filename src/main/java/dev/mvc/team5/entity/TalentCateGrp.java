package dev.mvc.team5.entity;

import lombok.*;
import jakarta.persistence.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "talent_categrp")
public class TalentCateGrp {

    @Id
    @Column(name = "categrpno")
    private Long cateGrpNo;

    private String name;

    private Integer cnt;

    private String field;
}
