package dev.mvc.team5.entity.user;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import dev.mvc.team5.entity.school.School;

@Entity
@NoArgsConstructor
@Table(name = "users")
@Data // Getter, Setter, toString 자동 생성
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="user_seq")
    @SequenceGenerator(name="user_seq", sequenceName="USER_SEQ", allocationSize=1)
    private Long userno;

//    @Column(name = "schoolno", nullable = false)
//    private Long schoolno;   
// 기존 Long schoolno 제거하고 아래로 대체
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schoolno") // FK 이름 매칭
    private School schoolno;

    @Column(name = "user_id", length = 30)
    private String userId;

    @Column(length = 255)
    private String password;

    @Column(length = 100)
    private String name;

    @Column(length = 50)
    private String username;

    @Column(length = 100)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column(length = 10)
    private String zipcode;

    @Column(length = 200)
    private String address;

    @Column(length = 20)
    private String language;

    @Column(length = 100)
    private String location;

    @Lob
    private String bio;

    @Column(length = 20)
    private String role;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // --------------------
    //   양방향 연관관계
    // --------------------
    @OneToMany(mappedBy = "userno", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ActivityLog> activityLogs = new ArrayList<>();

    @OneToMany(mappedBy = "userno", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LoginLog> loginLogs = new ArrayList<>();

    @OneToMany(mappedBy = "userno", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> notifications = new ArrayList<>();

    // Block은 blocker 와 blocked 두 방향이 있으므로 주의!
    @OneToMany(mappedBy = "blocker", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Block> blocksCreated = new ArrayList<>();

    @OneToMany(mappedBy = "blocked", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Block> blocksReceived = new ArrayList<>();

    // Report는 reporter 와 reported 두 방향이 있음
    @OneToMany(mappedBy = "reporter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Report> reportsCreated = new ArrayList<>();

    @OneToMany(mappedBy = "reported", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Report> reportsReceived = new ArrayList<>();
    
    // --------------------
    //    생성자 ㅋㅋ
    // -------------------- 
    public User(String userId, String password, String name, School schoolno) {
      this.userId = userId;
      this.password = password;
      this.name = name;
      this.schoolno = schoolno;
  }
    




}
