package dev.mvc.team5.entity.user;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "login_logs")
@Data
public class LoginLog {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="login_seq")
    @SequenceGenerator(name="login_seq", sequenceName="LOGIN_SEQ", allocationSize=1)
    private Integer loginno;

    @ManyToOne
    @JoinColumn(name = "userno")
    private User userno; 
    
    private LocalDateTime loginTime;
    
    private String IpAddress;
    //log.setLoginTime(LocalDateTime.now());
   // log.setIpAddress("127.0.0.1");
}