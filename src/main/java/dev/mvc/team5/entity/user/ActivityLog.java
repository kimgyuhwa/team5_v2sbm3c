package dev.mvc.team5.entity.user;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "activity_logs")
@Data
public class ActivityLog {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="actlog_seq")
    @SequenceGenerator(name="actlog_seq", sequenceName="ACTLOG_SEQ", allocationSize=1)
    private Integer actlogno;

//    @Column(nullable = false)
//    private Long userno;
    
    //양방향 ㅋㅋ 
    @ManyToOne
    @JoinColumn(name = "userno")
    private User user;

    @Column(length = 100)
    private String action;

    @Lob
    private String detail;

    private LocalDateTime createdAt;
    
    
     
}