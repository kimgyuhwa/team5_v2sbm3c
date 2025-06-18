package dev.mvc.team5.entity.user;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import dev.mvc.team5.entity.chat.ChatRoomMember;
import dev.mvc.team5.entity.chat.Message;
import dev.mvc.team5.entity.review.Review;
import dev.mvc.team5.entity.school.School;
import dev.mvc.team5.entity.talents.Match;

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
    @JoinColumn(name = "school") // FK 이름 매칭
    private School school;

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
    // 활동 로그
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ActivityLog> activityLogs = new ArrayList<>();
    // 로그인 내역
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LoginLog> loginLogs = new ArrayList<>();
    // 알림
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> notifications = new ArrayList<>();

    // 차단 시스템 연관
    @OneToMany(mappedBy = "blocker", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Block> blocksCreated = new ArrayList<>();

    @OneToMany(mappedBy = "blocked", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Block> blocksReceived = new ArrayList<>();

    // 신고 시스템 연관
    @OneToMany(mappedBy = "reporter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Report> reportsCreated = new ArrayList<>();

    @OneToMany(mappedBy = "reported", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Report> reportsReceived = new ArrayList<>();
    
    // 매칭 시스템 연관
    @OneToMany(mappedBy = "giver", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Match> givenMatches = new ArrayList<>();

    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Match> receivedMatches = new ArrayList<>();
    
    // 리뷰 연관
    @OneToMany(mappedBy = "giver", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> givenReviews = new ArrayList<>();

    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> receivedReviews = new ArrayList<>();
    
    // 채팅방 연관
    @OneToMany(mappedBy = "user")
    private List<ChatRoomMember> chatRoomMembers = new ArrayList<>();

    @OneToMany(mappedBy = "sender")
    private List<Message> messages = new ArrayList<>();
    // --------------------
    //    생성자 ㅋㅋ
    // -------------------- 
    public User(String userId, String password, String name, School school) {
      this.userId = userId;
      this.password = password;
      this.name = name;
      this.school = school;
  }
    




}
