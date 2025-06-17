package dev.mvc.team5.entity;

import lombok.*;
import jakarta.persistence.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "talent_type")
public class TalentType {

    @Id
    @Column(name = "type_id")
    private Long typeId;

    private String name;

    private Integer cnt;
}
