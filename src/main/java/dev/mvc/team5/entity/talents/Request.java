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
    @JoinColumn(name = "talentno")
    private Talent talentno;

    /**
     * 요청과 관련된 회원 정보
     * User 엔티티와 일대일 관계
     */
    @ManyToOne
    @JoinColumn(name = "userno")
    private User userno;

    /**
     * 요청 상태를 나타내는 필드입니다.
     * 이 필드는 RequestStatus enum 타입으로 관리되며,
     * 데이터베이스에는 문자열(String) 형태로 저장됩니다.
     * 가능한 상태 값은
     * 
     */
    @Enumerated(EnumType.STRING)
    private RequestStatus status;

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
    public Request(Talent talentno, User userno,
        RequestStatus status, String message) {
      this.talentno = talentno;
      this.userno = userno;
      this.status = status;
      this.message = message;
  }
    
}
