package dev.mvc.team5.entity.user;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "login_logs")
@Data
public class LoginLog {

    @Id
    @Column(length = 255)
    private String loginno;

    @Column(nullable = false)
    private Long userno; // NUMBER(10) => Long
}