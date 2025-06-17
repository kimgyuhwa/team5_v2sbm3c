package dev.mvc.team5.entity;

import lombok.*;
import jakarta.persistence.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "school")
public class School {

    @Id
    @Column(name = "schoolno")
    private Long schoolNo;

    @Column(name = "schoolname")
    private String schoolName;
}
