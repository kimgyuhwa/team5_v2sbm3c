package dev.mvc.team5.entity;

import lombok.*;
import jakarta.persistence.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(name = "userno")
    private Long userNo;

    @ManyToOne
    @JoinColumn(name = "schoolno")
    private School school;
}
