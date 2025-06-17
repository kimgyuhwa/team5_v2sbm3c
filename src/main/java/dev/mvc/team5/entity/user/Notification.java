package dev.mvc.team5.entity.user;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
public class Notification {

    @Id
    private Integer notificationno;

    @Column(nullable = false)
    private Long userno;

    @Column(length = 50)
    private String type;

    @Lob
    private String message;

    private Boolean read;

    private LocalDateTime createdAt;
}