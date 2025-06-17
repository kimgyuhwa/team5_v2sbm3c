package dev.mvc.team5.entity.user;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
public class Notification {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="notification_seq")
    @SequenceGenerator(name="notification_seq", sequenceName="NOTIFICATION_SEQ", allocationSize=1)
    private Integer notificationno;

    @ManyToOne
    @JoinColumn(name = "userno")
    private User userno;

    @Column(length = 50)
    private String type;

    @Lob
    private String message;

    private Boolean read;

    private LocalDateTime createdAt;
}