package dev.mvc.team5.entity.talents;

import lombok.*;
import jakarta.persistence.*;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import dev.mvc.team5.entity.user.User;

@Getter @Setter
// @NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "matches")
public class Match {

    /**
     * 매칭 고유 번호 (기본키)
     * 시퀀스(match_seq)를 통해 자동 생성됨
     */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "match_seq")
    @SequenceGenerator(name = "match_seq", sequenceName = "match_seq", allocationSize = 1)
    @Column(name = "matchno")
    private Long matchno;

    /**
     * 요청한 회원
     * User 엔티티와 다대일 관계
     */
    @ManyToOne
    @JoinColumn(name = "giverno")
    private User giverno;

    /**
     * 요청 받은 회원
     * User 엔티티와 다대일 관계
     */
    @ManyToOne
    @JoinColumn(name = "receiverno")
    private User receiverno;

    /**
     * 요청 게시물
     * Talent 엔티티와 다대일 관계
     */
    @ManyToOne
    @JoinColumn(name = "talentno")
    private Talent talentno;

    /**
     * 요청 시간
     * 엔티티 생성시 자동으로 현재 시간 저장
     */
    @CreationTimestamp
    @Column(name = "started_at")
    private LocalDateTime startedAt;
    
    /**
     * 완료 시간
     * 컨트롤러에서 수동으로 받기(LocalDate,now()등)
     */
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
    
 // Match.java 내부에 생성자 추가

    public Match(User giverno, User receiverno, Talent talentno, LocalDateTime completedAt) {
        this.giverno = giverno;
        this.receiverno = receiverno;
        this.talentno = talentno;

        this.completedAt = completedAt;
    }

    

    
}
