package dev.mvc.team5.entity.talents;

import lombok.*;
import jakarta.persistence.*;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import dev.mvc.team5.entity.user.User;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "requests")
public class Request {

    /**
     * 요청 게시물 고유 번호 (기본키)
     * 시퀀스(request_seq)를 통해 자동 생성됨
     */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "request_seq")
    @SequenceGenerator(name = "request_seq", sequenceName = "request_seq", allocationSize = 1)
    @Column(name = "requestno")
    private Long requestno;

    /**
     * 요청과 연관된 talent 정보
     * Talent 엔티티와 다대일 관계
     */
    @ManyToOne
    @JoinColumn(name = "talent")
    private Talent talent;

    /**
     * 요청과 관련된 회원 정보
     * User 엔티티와 일대일 관계
     */
    @ManyToOne
    @JoinColumn(name = "user")
    private User user;

    /**

     * 요청 상태
     */
    private String status;

    /**
     * 요청 메세지
     */
    private String message;

    /**
     * 게시물 등록 일시
     * 엔티티 생성 시 자동으로 현재 시간 저장
     */
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    /**
     * 생성자
     * 시퀀스, 요청 시간은 자동 처리되므로 포함하지 않음
     * @param talent 요청 게시물 Talent 객체
     * @param user 요청 회원 User 객체
     * @param status 요청 상태
     * @param message 요청 메세지
     */
    public Request(Talent talent, User user,
        String status, String message) {
      this.talent = talent;
      this.user = user;
      this.status = status;
      this.message = message;
  }
    
}
